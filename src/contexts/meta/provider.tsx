import appConfig from "@config/app";
import MetaContext from "./context";
import { Title, Meta } from "@solidjs/meta";
import {
  createSignal,
  Component,
  JSXElement,
  onCleanup,
  createMemo,
} from "solid-js";

type MetaProviderProps = {
  children: JSXElement;
};

const MetaProvider: Component<MetaProviderProps> = (props) => {
  const [title, setTitle] = createSignal(appConfig.name);

  const updateTitle = (newTitle: string) =>
    setTitle(`${newTitle !== "" ? newTitle + " |" : ""} ${appConfig.name}`);

  const memoizedTitle = createMemo(() => title());

  onCleanup(() => {
    setTitle(appConfig.name);
  });

  const contextValue = createMemo(() => ({
    updateTitle,
  }));

  return (
    <>
      <MetaContext.Provider value={contextValue()}>
        <Title>{memoizedTitle()}</Title>
        <Meta property="og:title" content={memoizedTitle()} />
        <Meta name="twitter:title" content={memoizedTitle()} />

        {props.children}
      </MetaContext.Provider>
    </>
  );
};

export default MetaProvider;
