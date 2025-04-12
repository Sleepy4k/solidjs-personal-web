import axios from "@services/axios";
import GithubContext from "./context";
import type { TGithubApiData, TGithubRepo } from "@interfaces/githubApiData";
import { API_URL, RAW_URL, REPO_PER_PAGE, REPO_URL } from "@constants/github";
import { REPO_FILTER_LIST_DEFAULT, REPO_FILTER_LIST_VALUES } from "@constants/repoFilter";
import { Component, createMemo, createResource, createSignal, JSXElement } from "solid-js";

type GithubProviderProps = {
  children: JSXElement;
};

const GithubProvider: Component<GithubProviderProps> = (props) => {
  const [currentRepoPage, setCurrentRepoPage] = createSignal<number>(1);
  const [currentRepoFilter, setCurrentRepoFilter] = createSignal<typeof REPO_FILTER_LIST_VALUES[number]>(REPO_FILTER_LIST_DEFAULT);
  const [userData] = createResource<TGithubApiData>(
    async () =>
      await axios(API_URL)
        .get("")
        .then((response) => response.data)
        .catch(() => undefined),
  );

  const [repos, repoInfo] = createResource<TGithubRepo[]>(
    async () =>
      await axios(API_URL)
        .get(`/repos?per_page=${REPO_PER_PAGE}&page=${currentRepoPage()}&type=${currentRepoFilter()}&sort=updated`)
        .then((response) => response.data)
        .catch(() => []),
  );

  const getDetailRepo = async (repo: string) => {
    const response = await axios(REPO_URL)
      .get(`/${repo}`)
      .then((response) => response.data)
      .catch(() => undefined);

    return response;
  };

  const getRawContent = async (repo: string, file: string, branch?: string) => {
    const response = await axios(RAW_URL)
      .get(`/${repo}/${branch ?? "main"}/${file}`)
      .then((response) => response.data)
      .catch(() => undefined);

    return response;
  };

  const contextValue = createMemo(() => ({
    userData,
    repos,
    repoInfo,
    getDetailRepo,
    getRawContent,
    setCurrentRepoPage,
    currentRepoPage,
    setCurrentRepoFilter,
    currentRepoFilter,
  }));

  return (
    <GithubContext.Provider value={contextValue()}>
      {props.children}
    </GithubContext.Provider>
  );
};

export default GithubProvider;
