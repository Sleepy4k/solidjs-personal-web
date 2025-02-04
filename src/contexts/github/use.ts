import GithubContext from "./context";
import { useContext } from "solid-js";

const useGithub = () => {
  const context = useContext(GithubContext);

  if (!context) {
    throw new Error("useGithub must be used within GithubProvider");
  }

  return context;
};

export default useGithub;
