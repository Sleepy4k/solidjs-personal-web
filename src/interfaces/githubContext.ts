import { Resource } from "solid-js";
import type { TGithubApiData, TGithubRepo } from "./githubApiData";

interface IGithubContext {
  userData: Resource<TGithubApiData | undefined>;
  repos: Resource<TGithubRepo[] | undefined>;
  getDetailRepo: (repo: string) => Promise<TGithubRepo | null | undefined>;
  getRawContent: (
    repo: string,
    file: string,
    branch?: string
  ) => Promise<string | null | undefined>;
}

export default IGithubContext;
