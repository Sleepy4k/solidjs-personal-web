import githubConfig from "@config/github";

const { username } = githubConfig;

const IMAGE_URL: string = `https://avatars.githubusercontent.com/${username}?v=4`;

const API_URL: string = `https://api.github.com/users/${username}`;

const REPO_URL: string = `https://api.github.com/repos/${username}`;

const RAW_URL: string = `https://raw.githubusercontent.com/${username}`;

const OPENGRAPH_URL: string = `https://opengraph.githubassets.com/36005f3e368256194ca27e7d61ff2c7d6824a97fc252d06cba692104213e7e05/${username}`;

const REPO_PER_PAGE: number = 6;

export {
  IMAGE_URL,
  API_URL,
  REPO_URL,
  RAW_URL,
  OPENGRAPH_URL,
  REPO_PER_PAGE,
};
