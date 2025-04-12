import appConfig from "@config/app";
import MetaContext from "./context";
import { IMAGE_URL } from "@constants/github";
import { Title, Link, Meta } from "@solidjs/meta";
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

const StaticMeta = () => (
  <>
    <Link rel="canonical" href={appConfig.host} />
    <Link rel="icon" href="https://docs.solidjs.com/favicon.ico" />
    <Meta name="author" content="artkana30" />
    <Meta name="keywords" content={appConfig.keywords} />
    <Meta property="og:url" content={appConfig.host} />
    <Meta property="og:type" content="website" />
    <Meta name="twitter:card" content="summary_large_image" />
  </>
);

const MetaProvider: Component<MetaProviderProps> = (props) => {
  const [title, setTitle] = createSignal(appConfig.name);
  const [image, setImage] = createSignal(IMAGE_URL);
  const [description, setDescription] = createSignal(appConfig.description);

  const updateTitle = (newTitle: string) =>
    setTitle(`${newTitle !== "" ? newTitle + " |" : ""} ${appConfig.name}`);
  const updateDescription = (newDescription: string) =>
    setDescription(newDescription);
  const updateImage = (newImage: string) => setImage(newImage);

  const memoizedTitle = createMemo(() => title());
  const memoizedDescription = createMemo(() => description());
  const memoizedImage = createMemo(() => image());

  onCleanup(() => {
    setTitle(appConfig.name);
    setDescription(appConfig.description);
    setImage(IMAGE_URL);
  });

  const contextValue = createMemo(() => ({
    updateTitle,
    updateDescription,
    updateImage,
  }));

  return (
    <>
      <StaticMeta />
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
