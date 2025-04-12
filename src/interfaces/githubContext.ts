import { Resource, ResourceActions } from "solid-js";
import { REPO_FILTER_LIST_VALUES } from "@constants/repoFilter";
import type { TGithubApiData, TGithubRepo } from "./githubApiData";

interface IGithubContext {
  userData: Resource<TGithubApiData | undefined>;
  repos: Resource<TGithubRepo[] | undefined>;
  repoInfo: ResourceActions<TGithubRepo[] | undefined>;
  setCurrentRepoPage: (page: number) => void;
  currentRepoPage: () => number;
  setCurrentRepoFilter: (filter: typeof REPO_FILTER_LIST_VALUES[number]) => void;
  currentRepoFilter: () => string;
  getDetailRepo: (repo: string) => Promise<TGithubRepo | null | undefined>;
  getRawContent: (
    repo: string,
    file: string,
    branch?: string
  ) => Promise<string | null | undefined>;
}

export default IGithubContext;
