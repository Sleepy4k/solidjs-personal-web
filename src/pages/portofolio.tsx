import Meta from "@contexts/meta";
import toast from "solid-toast";
import Github from "@contexts/github";
import { OPENGRAPH_URL } from "@constants/github";
import { ITEMS_PER_PAGE } from "@constants/paginate";
import { IoChevronDownOutline, IoEyeOutline } from "solid-icons/io";
import Loader from "@components/loader";
import DisplayError from "@components/displayError";
import {
  createEffect,
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
  const { repos } = Github.useGithub();
  const [topics, setTopics] = createSignal<string[]>([]);
  const [repoList, setRepoList] = createSignal<TRepoList[]>([]);
  const [currentPage, setCurrentPage] = createSignal<number>(1);
  const [totalPages, setTotalPages] = createSignal<number>(1);
  const [loading, setLoading] = createSignal<boolean>(true);
  const [displayedRepoList, setDisplayedRepoList] = createSignal<TRepoList[]>(
    []
  );

  // All the references section
  const [selectList, setSelectList] = createSignal<HTMLButtonElement[]>([]);
  const [filterList, setFilterList] = createSignal<HTMLButtonElement[]>([]);
  const [selectValue, setSelectValue] = createSignal<HTMLDivElement | null>(
    null
  );
  const [selectElement, setSelectElement] =
    createSignal<HTMLButtonElement | null>(null);

  createEffect(() => {
    if (repos.loading || repos.error) return;

    const filteredTopics = repos()
      ?.map((repo) => repo.topics)
      .flat();
    setTopics([...new Set(filteredTopics)]);

    const filteredRepos = repos()?.map((repo) => ({
      name: repo.name,
      url: repo.html_url,
      topics: repo.topics,
      openGraphImageUrl: `${OPENGRAPH_URL}/${repo.name}`,
    }));

    setRepoList(filteredRepos || []);
  });

  createEffect(() => {
    const startIndex = (currentPage() - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    setDisplayedRepoList(repoList().slice(startIndex, endIndex));
    setTotalPages(Math.ceil(repoList().length / ITEMS_PER_PAGE));
  });

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const addSelectListRef = (el: HTMLButtonElement) => {
    if (el && !selectList().includes(el)) {
      setSelectList([...selectList(), el]);
    }
  };

  const addFilterListRef = (el: HTMLButtonElement) => {
    if (el && !filterList().includes(el)) {
      setFilterList([...filterList(), el]);
    }
  };

  const { updateTitle } = Meta.useMeta();

  const filterFunction = (
    selectedValue: string,
    items: NodeListOf<Element>
  ) => {
    items.forEach((item) => {
      handlePageChange(1);

      if (selectedValue === "All") {
        item.classList.add("active");
        setTotalPages(Math.ceil(repoList().length / ITEMS_PER_PAGE));
        setDisplayedRepoList(repoList().slice(0, ITEMS_PER_PAGE));
      } else {
        const category = item.getAttribute("data-category") || "";
        const categoryArray = category.split(", ");

        if (categoryArray.includes(selectedValue)) {
          item.classList.add("active");
        } else {
          item.classList.remove("active");
        }

        // set displayedRepoList based on the selected category
        const filteredRepoList = repoList().filter((repo) =>
          repo.topics.includes(selectedValue)
        );

        setTotalPages(Math.ceil(filteredRepoList.length / ITEMS_PER_PAGE));
        setDisplayedRepoList(filteredRepoList);
      }
    });
  };

  createEffect(() => {
    const selectBtnElement = selectElement();
    if (selectBtnElement === null) return;

    selectBtnElement.addEventListener("click", () => {
      selectBtnElement.classList.toggle("active");
    });

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        const targetContent = mutation.target.textContent;

        if (
          (mutation.type === "characterData" ||
            mutation.type === "childList") &&
          targetContent !== "Select category" &&
          selectBtnElement.innerText !== "Select category"
        ) {
          toast.success(`Filter changed to ${targetContent}`);
        }
      });
    });

    observer.observe(selectBtnElement, {
      childList: true,
      subtree: true,
      characterData: true,
    });
  });

  createEffect(() => {
    if (topics().length === 0) return;

    let lastClickedButton = filterList()[0];
    const items = document.querySelectorAll("[data-filter-item]");

    const selectDivValue = selectValue();
    if (selectDivValue === null) return;

    selectList().forEach((el) => {
      el.addEventListener("click", () => {
        selectDivValue.innerText = el.textContent || "Select category";
        selectElement()?.classList.remove("active");
        lastClickedButton.classList.remove("active");
        filterFunction(el.textContent || "All", items);
        filterList().forEach((filter) => {
          if (filter.textContent === el.textContent) {
            filter.classList.add("active");
            lastClickedButton = filter;
          }
        });
      });
    });

    filterList().forEach((el) => {
      el.addEventListener("click", () => {
        selectDivValue.innerText = el.textContent || "Select category";
        filterFunction(el.textContent || "All", items);
        lastClickedButton.classList.remove("active");
        el.classList.toggle("active");
        lastClickedButton = el;
      });
    });
  });

  onMount(() => {
    updateTitle("Portofolio");

    setTimeout(() => {
      setLoading(false);
    }, 200);
  });

  return (
    <article class="portofolio active">
      <header>
        <h2 class="h2 article-title">Portofolio</h2>
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

          <Match when={displayedRepoList().length === 0}>
            <DisplayError message="No data available" />
          </Match>

          <Match when={true}>
            <ul class="filter-list">
              <li class="filter-item">
                <button type="button" class="active" ref={addFilterListRef}>
                  All
                </button>
              </li>

              <For each={topics()}>
                {(topic) => (
                  <li class="filter-item">
                    <button type="button" ref={addFilterListRef}>
                      {topic}
                    </button>
                  </li>
                )}
              </For>
            </ul>

            <div class="filter-select-box">
              <button
                type="button"
                class="filter-select"
                ref={(el) => setSelectElement(el)}
              >
                <div class="select-value" ref={(el) => setSelectValue(el)}>
                  Select category
                </div>

                <div class="select-icon">
                  <IoChevronDownOutline />
                </div>
              </button>

              <ul class="select-list">
                <For each={topics()}>
                  {(topic) => (
                    <li class="select-item">
                      <button type="button" ref={addSelectListRef}>
                        {topic}
                      </button>
                    </li>
                  )}
                </For>
              </ul>
            </div>

            <ul class="project-list">
              <For each={displayedRepoList()}>
                {(repo) => (
                  <li
                    class="project-item active"
                    data-filter-item
                    data-category={repo.topics.join(", ")}
                  >
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

            <div class="pagination">
              <button
                type="button"
                onClick={() => handlePageChange(Math.max(1, currentPage() - 1))}
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
                onClick={() =>
                  handlePageChange(Math.min(totalPages(), currentPage() + 1))
                }
                disabled={currentPage() === totalPages()}
              >
                Next
              </button>
            </div>
          </Match>
        </Switch>
      </section>
    </article>
  );
}
