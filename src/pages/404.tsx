import Meta from "@contexts/meta";
import { createEffect } from "solid-js";

export default function NotFound() {
  const { updateTitle } = Meta.useMeta();

  createEffect(() => {
    updateTitle("Not Found");
  });

  return (
    <article class="not-found active" data-page="not-found">
      <header>
        <h2 class="h2 article-title">Not Found</h2>
      </header>

      <section class="about-text">
        <p>
          The page you are looking for does not exist. It may have been moved or
          deleted. Please check the URL and try again.
        </p>
      </section>
    </article>
  );
}
