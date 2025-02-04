import Meta from "@contexts/meta";
import Github from "@contexts/github";
import { createStore } from "solid-js/store";
import { createResource, createMemo, onMount } from "solid-js";

export default function Home() {
  let hostElement: HTMLDivElement | null = null;
  let errorElement: HTMLDivElement | null = null;

  const { updateTitle } = Meta.useMeta();
  const { getRawContent } = Github.useGithub();
  const [account, _] = createStore({
    username: "sleepy4k",
    repo: "README.md",
  });

  const fetchReadme = async (params: { username: string; repo: string }) => {
    const rawContent = await getRawContent(params.username, params.repo);
    return rawContent;
  };

  const [readme] = createResource(async () => {
    const response = await fetchReadme(account);
    if (!response) return;

    return response
      .replaceAll(/<img/g, '<img loading="lazy"')
      .replaceAll(/<a/g, '<a style="text-decoration: none"');
  });

  const MemorizedReadme = createMemo(() => {
    if (readme.loading) {
      return (
        <div class="flex items-center justify-center min-h-screen">
          <div class="animate-spin rounded-full h-32 w-32 border-t-8 border-yellow-500"></div>
        </div>
      );
    }

    if (!errorElement) return;

    if (readme.error) {
      return (errorElement.innerHTML = `
        <div class="flex items-center justify-center min-h-screen">
          <div class="text-center">
            <h2 class="h2">Failed to fetch data</h2>
          </div>
        </div>
      `);
    }

    if (readme() === undefined) {
      return (errorElement.innerHTML = `
        <div class="flex items-center justify-center min-h-screen">
          <div class="text-center">
            <h2 class="h2">No data available</h2>
          </div>
        </div>
      `);
    }

    // Check if element reference is available
    if (!hostElement) {
      return (errorElement.innerHTML = `
        <div class="flex items-center justify-center min-h-screen">
          <div class="text-center">
            <h2 class="h2">Something went wrong while displaying data</h2>
          </div>
        </div>
      `);
    }

    const shadowRoot = hostElement.attachShadow({ mode: "open" });
    shadowRoot.innerHTML = readme() || "";
  });

  onMount(() => {
    updateTitle("");
  });

  return (
    <article class="about active">
      <header>
        <h2 class="h2 article-title">About me</h2>
      </header>

      <section class="about-text">
        <div ref={(el) => (errorElement = el)}></div>
        <div class="injected-readme" ref={(el) => (hostElement = el)}>
          <MemorizedReadme />
        </div>
      </section>
    </article>
  );
}
