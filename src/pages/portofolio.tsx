import Meta from "@contexts/meta";
import Github from "@contexts/github";
import Loader from "@components/loader";
import { OPENGRAPH_URL, REPO_PER_PAGE } from "@constants/github";
import DisplayError from "@components/displayError";
import { IoEyeOutline } from "solid-icons/io";
import {
  createEffect,
  createMemo,
  createSignal,
  For,
  Match,
  onMount,
  Switch,
} from "solid-js";

type TRepoList = {
  name: string;
  url: string;
  topics: string[];
  openGraphImageUrl: string;
};

export default function Home() {
  const { userData, repos, repoInfo, setCurrentRepoPage } = Github.useGithub();
  const { updateTitle } = Meta.useMeta();
  const [repoList, setRepoList] = createSignal<TRepoList[]>([]);
  const [currentPage, setCurrentPage] = createSignal<number>(1);
  const [totalPages, setTotalPages] = createSignal<number>(1);
  const [loading, setLoading] = createSignal<boolean>(true);

  createEffect(() => {
    if (repos.loading || repos.error) return;

    const filteredRepos = repos()?.map((repo) => ({
      name: repo.name,
      url: repo.html_url,
      topics: repo.topics,
      openGraphImageUrl: `${OPENGRAPH_URL}/${repo.name}`,
    }));

    setRepoList(filteredRepos || []);
    setTotalPages(Math.ceil((userData()?.public_repos || 0) / REPO_PER_PAGE));
  });

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages()) return;

    setCurrentPage(page);
    setCurrentRepoPage(page);
    repoInfo.refetch();
  };

  onMount(() => {
    updateTitle("Portofolio");

    setTimeout(() => {
      setLoading(false);
    }, 200);
  });

  const memoizedTitle = createMemo(() => {
    const totalRepo = userData()?.public_repos;
    if (!totalRepo || totalRepo === 0) return "Portofolio";

    return `Portofolio (${totalRepo} Data)`;
  });

  const PaginationSection = createMemo(() => {
    return (
      <div class="pagination">
        <button
          type="button"
          onClick={() => handlePageChange(currentPage() - 1)}
          disabled={currentPage() === 1}
        >
          Previous
        </button>
        <For each={Array.from({ length: totalPages() })}>
          {(_, index) => {
            const pageNumber = index() + 1;

            return (
              <button
                type="button"
                onClick={() => handlePageChange(pageNumber)}
                class={currentPage() === pageNumber ? "active" : ""}
              >
                {pageNumber}
              </button>
            );
          }}
        </For>
        <button
          type="button"
          onClick={() => handlePageChange(currentPage() + 1)}
          disabled={currentPage() === totalPages()}
        >
          Next
        </button>
      </div>
    );
  });

  return (
    <article class="portofolio active">
      <header>
        <h2 class="h2 article-title">{memoizedTitle()}</h2>
      </header>

      <section class="projects">
        <Switch>
          <Match when={repos.loading || loading()}>
            <Loader />
          </Match>

          <Match when={repos.error}>
            <DisplayError message="Failed to fetch data" />
          </Match>

          <Match when={repoList().length === 0}>
            <DisplayError message="No data available" />
          </Match>

          <Match when={true}>
            <ul class="project-list">
              <For each={repoList()}>
                {(repo) => (
                  <li class="project-item active">
                    <a
                      href={repo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <figure class="project-img">
                        <div class="project-item-icon-box">
                          <IoEyeOutline />
                        </div>

                        <img
                          src={repo.openGraphImageUrl}
                          alt={repo.name}
                          loading="lazy"
                          class="project-border-img"
                          onError={(e) => (e.currentTarget.src = "")}
                        />
                      </figure>

                      <h3 class="project-title">
                        {repo.name.split("-").join(" ")}
                      </h3>

                      <p class="project-category">{repo.topics.join(", ")}</p>
                    </a>
                  </li>
                )}
              </For>
            </ul>

            <PaginationSection />
          </Match>
        </Switch>
      </section>
    </article>
  );
}