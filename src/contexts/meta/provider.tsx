import appConfig from "@config/app";
import MetaContext from "./context";
import { IMAGE_URL } from "@constants/github";
import { Title, Link, Meta } from "@solidjs/meta";
import { createSignal, Component, JSXElement, onCleanup } from "solid-js";

type MetaProviderProps = {
  children: JSXElement;
};

const MetaProvider: Component<MetaProviderProps> = (props) => {
  const [title, setTitle] = createSignal(appConfig.name);
  const [image, setImage] = createSignal(IMAGE_URL);
  const [description, setDescription] = createSignal(appConfig.description);

  const updateTitle = (newTitle: string) =>
    setTitle(`${newTitle !== "" ? newTitle + " |" : ""} ${appConfig.name}`);
  const updateDescription = (newDescription: string) =>
    setDescription(newDescription);
  const updateImage = (newImage: string) => setImage(newImage);

  onCleanup(() => {
    setTitle(appConfig.name);
    setDescription(appConfig.description);
    setImage(IMAGE_URL);
  });

  return (
    <MetaContext.Provider
      value={{
        updateTitle,
        updateDescription,
        updateImage,
      }}
    >
      <Title>{title()}</Title>
      <Link rel="canonical" href={appConfig.host} />
      <Link rel="icon" href="https://docs.solidjs.com/favicon.ico" />
      <Meta name="author" content="artkana30" />
      <Meta name="keywords" content={appConfig.keywords} />
      <Meta name="description" content={description()} />
      <Meta property="og:title" content={title()} />
      <Meta property="og:description" content={description()} />
      <Meta property="og:image" content={image()} />
      <Meta property="og:url" content={appConfig.host} />
      <Meta property="og:type" content="website" />
      <Meta name="twitter:card" content="summary_large_image" />
      <Meta name="twitter:title" content={title()} />
      <Meta name="twitter:description" content={description()} />
      <Meta name="twitter:image" content={image()} />
      {props.children}
    </MetaContext.Provider>
  );
};

export default MetaProvider;
