import { IMAGE_URL } from "@constants/github";
import { onCleanup, onMount } from "solid-js";
import Github from "@contexts/github";
import socialConfig from "@config/social";
import {
  IoChevronDownSharp,
  IoLocationOutline,
  IoLogoGithub,
  IoLogoInstagram,
  IoLogoLinkedin,
  IoLogoTwitter,
  IoMailOpenOutline,
} from "solid-icons/io";

export default function Sidebar() {
  let sidebarElement: HTMLElement | null = null;
  let sidebarBtnElement: HTMLElement | null = null;

  const { userData } = Github.useGithub();

  const toggleSidebar = () => {
    sidebarElement?.classList.toggle("active");
  };

  onMount(() => {
    sidebarBtnElement?.addEventListener("click", (e) => {
      e.preventDefault();

      toggleSidebar();
    });
  });

  onCleanup(() => {
    sidebarBtnElement?.removeEventListener("click", toggleSidebar);

    sidebarElement = null;
    sidebarBtnElement = null;
  });

  return (
    <aside class="sidebar" ref={(el) => (sidebarElement = el)} data-sidebar>
      <div class="sidebar-info">
        <figure class="avatar-box">
          <img src={IMAGE_URL} alt="Apri Pandu W" width="80" />
        </figure>

        <div class="info-content">
          <h1 class="name" title="Apri Pandu W">
            {userData()?.name || "Apri Pandu W"}
          </h1>

          <p class="title">
            {userData()?.bio.split(".")[0] || "Web Developer"}
          </p>
        </div>

        <button
          type="button"
          class="info_more-btn"
          ref={(el) => (sidebarBtnElement = el)}
          data-sidebar-btn
        >
          <span>Show Contacts</span>

          <IoChevronDownSharp />
        </button>
      </div>

      <div class="sidebar-info_more">
        <div class="separator"></div>

        <ul class="contacts-list">
          <li class="contact-item">
            <div class="icon-box">
              <IoMailOpenOutline />
            </div>

            <div class="contact-info">
              <p class="contact-title">Email</p>

              <a
                href={`mailto:${
                  userData()?.email || "sarahpalastrin@gmail.com"
                }`}
                class="contact-link"
              >
                {userData()?.email || "sarahpalastrin@gmail.com"}
              </a>
            </div>
          </li>

          <li class="contact-item">
            <div class="icon-box">
              <IoLocationOutline />
            </div>

            <div class="contact-info">
              <p class="contact-title">Location</p>

              <address>
                {userData()?.location ||
                  "Banyumas Regency, Jawa Tengah, Indonesia"}
              </address>
            </div>
          </li>
        </ul>

        <div class="separator"></div>

        <ul class="social-list">
          <li class="social-item">
            <a
              title="Linkedin Profile"
              href={socialConfig.linkedin}
              target="_blank"
              rel="noopener"
              class="social-link"
            >
              <IoLogoLinkedin />
            </a>
          </li>

          <li class="social-item">
            <a
              title="Github Profile"
              href={socialConfig.github}
              target="_blank"
              rel="noopener"
              class="social-link"
            >
              <IoLogoGithub />
            </a>
          </li>

          <li class="social-item">
            <a
              title="Twitter Account"
              href={socialConfig.twitter}
              target="_blank"
              rel="noopener"
              class="social-link"
            >
              <IoLogoTwitter />
            </a>
          </li>

          <li class="social-item">
            <a
              title="Instagram Account"
              href={socialConfig.instagram}
              target="_blank"
              rel="noopener"
              class="social-link"
            >
              <IoLogoInstagram />
            </a>
          </li>
        </ul>
      </div>
    </aside>
  );
}
