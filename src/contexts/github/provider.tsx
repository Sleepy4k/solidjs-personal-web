import axios from "@services/axios";
import GithubContext from "./context";
import { API_URL, RAW_URL, REPO_URL } from "@constants/github";
import type { TGithubApiData, TGithubRepo } from "@interfaces/githubApiData";
import { Component, createMemo, createResource, JSXElement } from "solid-js";

type GithubProviderProps = {
  children: JSXElement;
};

const GithubProvider: Component<GithubProviderProps> = (props) => {
  const [userData] = createResource<TGithubApiData>(
    async () => await axios(API_URL)
      .get("")
      .then((response) => response.data),
    { initialValue: undefined, deferStream: true }
  );

  const [repos] = createResource<TGithubRepo[]>(
    async () => await axios(API_URL)
      .get("/repos")
      .then((response) => response.data),
    { initialValue: [], deferStream: true }
  );

  const getDetailRepo = async (repo: string) => {
    const response = await axios(REPO_URL)
      .get(`/${repo}`)
      .then((response) => response.data);

    return response;
  };

  const getRawContent = async (repo: string, file: string, branch?: string) => {
    const response = await axios(RAW_URL)
      .get(`/${repo}/${branch ?? "main"}/${file}`)
      .then((response) => response.data);

    return response;
  };

  const contextValue = createMemo(() => ({
    userData,
    repos,
    getDetailRepo,
    getRawContent,
  }));

  return (
    <GithubContext.Provider value={contextValue()}>
      {props.children}
    </GithubContext.Provider>
  );
};

export default GithubProvider;
