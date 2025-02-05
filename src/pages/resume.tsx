import Loader from "@components/loader";
import Meta from "@contexts/meta";
import { IoBookOutline } from "solid-icons/io";
import { createSignal, onMount, Show } from "solid-js";

export default function Home() {
  const { updateTitle } = Meta.useMeta();
  const [loading, setLoading] = createSignal<boolean>(true);

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

      <Show when={loading()}>
        <Loader />
      </Show>

      <Show when={!loading()}>
        <section class="timeline">
          <div class="title-wrapper">
            <div class="icon-box">
              <IoBookOutline />
            </div>

            <h3 class="h3">Education</h3>
          </div>

          <ol class="timeline-list">
            <li class="timeline-item">
              <h4 class="h4 timeline-item-title">
                Telkom University Purwokerto
              </h4>

              <span>Sep 2023 — Present</span>

              <p class="timeline-text">
                Telkom University Purwokerto is a tertiary University managed by
                the Telkom Education Foundation
              </p>
            </li>

            <li class="timeline-item">
              <h4 class="h4 timeline-item-title">SMK Telkom Purwokerto</h4>

              <span>Jun 2020 — Jun 2023</span>

              <p class="timeline-text">
                SMK Telkom Purwokerto is a private vocational school founded,
                empowered and operated under the auspices of the Telkom
                Education Foundation.
              </p>
            </li>
          </ol>
        </section>

        <section class="timeline">
          <div class="title-wrapper">
            <div class="icon-box">
              <IoBookOutline />
            </div>

            <h3 class="h3">Experience</h3>
          </div>

          <ol class="timeline-list">
            <li class="timeline-item">
              <h4 class="h4 timeline-item-title">
                Systems Operations - AWS Cloud Club Indonesia
              </h4>

              <span>Aug 2024 — Dec 2024</span>

              <p class="timeline-text">
                - Gained hands-on experience in request balancing using nginx
                <br />
                - Gained hands-on experience in deployment web using Cloudflare
                worker
                <br />- Gained hands-on experience in mapping Ip address on
                Proxmox server and Shellngn
              </p>
            </li>

            <li class="timeline-item">
              <h4 class="h4 timeline-item-title">DevOps Engineer - Kodegiri</h4>

              <span>Aug 2024 - Nov 2024</span>

              <p class="timeline-text">
                - Gained hands-on experience in server configuration with Linux
                kernel based on Digital Ocean Server
                <br />
                - Gained hands-on experience in deployment some API service such
                as Back-end and AI service
                <br />- Collaborated with senior developers and college to
                discuss about deployment issues
              </p>
            </li>

            <li class="timeline-item">
              <h4 class="h4 timeline-item-title">
                Backend Web Developer - Kodegiri
              </h4>

              <span>Jul 2024 - Nov 2024</span>

              <p class="timeline-text">
                - Assisted in the development of API service for classification
                AI
                <br />
                - Gained hands-on experience in modular Laravel program
                <br />- Gained hands-on experience in implementation API service
                on Front-end from AI service and Back-end service
              </p>
            </li>

            <li class="timeline-item">
              <h4 class="h4 timeline-item-title">
                Backend Web Developer - Braincode Solution
              </h4>

              <span>Mar 2023 - Jun 2023</span>

              <p class="timeline-text">
                - Assisted in the development of web applications using rust and
                solidJS
                <br />
                - Gained hands-on experience in database design on PostgreSQL
                server
                <br />- Gained hands-on experience in server configuration with
                Linux kernel based, including test and deploy project
              </p>
            </li>

            <li class="timeline-item">
              <h4 class="h4 timeline-item-title">
                Fullstack Web Developer - PuskoMedia Indonesia Kreatif
              </h4>

              <span>Feb 2022 — Sep 2022</span>

              <p class="timeline-text">
                - Assisted in the development of web applications using Laravel
                and gained hands-on experience in database design and
                optimization techniques
                <br />
                - Gained hands-on experience in database design and optimization
                techniques using ORM and Builder
                <br />- Gained hands-on experience in server configuration with
                Linux kernel based, including firewall and project deployment
              </p>
            </li>
          </ol>
        </section>
      </Show>
    </article>
  );
}
