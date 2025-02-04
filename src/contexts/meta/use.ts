import MetaContext from "./context";
import { useContext } from "solid-js";

const useMeta = () => {
  const context = useContext(MetaContext);

  if (!context) {
    throw new Error("useMeta must be used within MetaProvider");
  }

  return context;
};

export default useMeta;
