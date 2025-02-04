import IGithubContext from "@interfaces/githubContext";
import { createContext } from "solid-js";

const GithubContext = createContext<IGithubContext>();

export default GithubContext;
