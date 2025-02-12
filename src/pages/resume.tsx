import Meta from "@contexts/meta";
import Github from "@contexts/github";
import Loader from "@components/loader";
import githubConfig from "@config/github";
import DisplayError from "@components/displayError";
import { IoBookOutline, IoTrophyOutline } from "solid-icons/io";
import {
  RESUME_EXPERIENCE_SEPARATOR,
  RESUME_TIMELINE_SEPARATOR,
} from "@constants/separator";
import { createResource, createSignal, Match, onMount, Switch } from "solid-js";

type TEducation = {
  school: string;
  description: string;
  time: {
    start: string;
    end: string;
  };
};

type TExperience = {
  title: string;
  company: string;
  description: string;
  time: {
    start: string;
    end: string;
  };
};

type TResume = {
  education: TEducation[];
  experience: TExperience[];
};

type TFetchParams = {
  file: string;
  repo: string;
  branch: string;
};

export default function Home() {
  const { updateTitle } = Meta.useMeta();
  const { getRawContent } = Github.useGithub();
  const [loading, setLoading] = createSignal<boolean>(true);

  const fetchResume = async (params: TFetchParams) => {
    const rawContent = await getRawContent(params.repo, params.file, params.branch);
    return rawContent;
  };

  const [resume] = createResource<TResume | undefined>(async () => {
    const response = await fetchResume(githubConfig.resume);

    if (!response) return undefined;

    try {
      return typeof response === "string" ? JSON.parse(response) : response;
    } catch (error) {
      console.error("Failed to parse resume data:", error);
      return undefined;
    }
  });

  onMount(() => {
    updateTitle("Resume");

    setTimeout(() => {
      setLoading(false);
    }, 200);
  });

  return (
    <article class="resume active">
      <header>
        <h2 class="h2 article-title">Resume</h2>
      </header>

      <Switch fallback={<Loader />}>
        <Match when={resume.loading || loading()}>
          <Loader />
        </Match>

        <Match when={resume.error}>
          <DisplayError message={resume.error} />
        </Match>

        <Match when={resume() === undefined}>
          <DisplayError message="No data found" />
        </Match>

        <Match when={resume() !== undefined}>
          <section class="timeline">
            <div class="title-wrapper">
              <div class="icon-box">
                <IoBookOutline />
              </div>

              <h3 class="h3">Education</h3>
            </div>

            <ol class="timeline-list">
              {resume()?.education.map((item: TEducation) => (
                <li class="timeline-item">
                  <h4 class="h4 timeline-item-title">{item.school}</h4>

                  <span>
                    {`${item.time.start} ${RESUME_TIMELINE_SEPARATOR} ${item.time.end}`}
                  </span>

                  <p class="timeline-text" innerHTML={item.description}></p>
                </li>
              ))}
            </ol>
          </section>

          <section class="timeline">
            <div class="title-wrapper">
              <div class="icon-box">
                <IoTrophyOutline />
              </div>

              <h3 class="h3">Experience</h3>
            </div>

            <ol class="timeline-list">
              {resume()?.experience.map((item: TExperience) => (
                <li class="timeline-item">
                  <h4
                    class="h4 timeline-item-title"
                    innerHTML={`${item.title} ${RESUME_EXPERIENCE_SEPARATOR} <b>${item.company}</b>`}
                  ></h4>

                  <span>
                    {`${item.time.start} ${RESUME_TIMELINE_SEPARATOR} ${item.time.end}`}
                  </span>

                  <p class="timeline-text" innerHTML={item.description}></p>
                </li>
              ))}
            </ol>
          </section>
        </Match>

        <Match when={true}>
          <DisplayError message="Something went wrong while displaying data" />
        </Match>
      </Switch>
    </article>
  );
}
