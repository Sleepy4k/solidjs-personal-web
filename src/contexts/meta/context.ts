import IMetaContext from "@interfaces/metaContext";
import { createContext } from "solid-js";

const MetaContext = createContext<IMetaContext>();

export default MetaContext;
