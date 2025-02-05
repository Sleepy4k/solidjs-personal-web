import Meta from "@contexts/meta";
import Github from "@contexts/github";
import Loader from "@components/loader";
import DisplayError from "@components/displayError";
import {
  createResource,
  onMount,
  Switch,
  Match,
  createEffect,
  createSignal,
} from "solid-js";

export default function Home() {
  const { updateTitle } = Meta.useMeta();
  const { getRawContent } = Github.useGithub();
  const [hostElement, setHostElement] = createSignal<HTMLDivElement | null>(
    null
  );

  const fetchReadme = async (params: { username: string; repo: string }) => {
    const rawContent = await getRawContent(params.username, params.repo);
    return rawContent;
  };

  const [readme] = createResource(async () => {
    const response = await fetchReadme({
      username: "sleepy4k",
      repo: "README.md",
    });
    if (!response) return;

    return response
      .replaceAll(/<img/g, '<img loading="lazy"')
      .replaceAll(/<a/g, '<a style="text-decoration: none"');
  });

  createEffect(() => {
    const parent = hostElement();
    if (parent === null) return;

    const shadowRoot = parent.attachShadow({ mode: "open" });
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
        <Switch fallback={<Loader />}>
          <Match when={readme.loading}>
            <Loader />
          </Match>

          <Match when={readme.error}>
            <DisplayError message="Failed to fetch data" />
          </Match>

          <Match when={readme() === undefined}>
            <DisplayError message="No data available" />
          </Match>

          <Match when={readme() !== undefined}>
            <div class="injected-readme" ref={(el) => setHostElement(el)}></div>
          </Match>

          <Match when={true}>
            <DisplayError message="Something went wrong while displaying data" />
          </Match>
        </Switch>
      </section>
    </article>
  );
}
