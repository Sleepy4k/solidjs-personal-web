import appConfig from "@config/app";
import Github from "@contexts/github";
import socialConfig from "@config/social";
import { IMAGE_URL } from "@constants/github";
import { createMemo, createSignal, onCleanup, onMount, Show } from "solid-js";
import {
  IoChevronCollapse,
  IoChevronExpand,
  IoLocationOutline,
  IoLogoGithub,
  IoLogoInstagram,
  IoLogoLinkedin,
  IoLogoTwitter,
  IoMailOpenOutline,
} from "solid-icons/io";

export default function Sidebar() {
  let sidebarElement: HTMLElement | null = null;
  let sidebarButton: HTMLButtonElement | null = null;

  const { userData } = Github.useGithub();
  const [isSidebarOpen, setIsSidebarOpen] = createSignal<boolean>(false);
  const dummyProfileImage =
    "https://free.clipartof.com/855-Free-Clipart-Of-A-Male-Avatar.png";

  const isEmailAvailable = createMemo(() => {
    return (
      (userData() !== undefined && userData()?.email) ||
      (socialConfig !== undefined && socialConfig?.email)
    );
  });

  const isLocationAvailable = createMemo(() => {
    return userData() !== undefined && userData()?.location;
  });

  const toggleSidebar = () => {
    if (sidebarElement) {
      sidebarElement.classList.toggle("active");
      setIsSidebarOpen((prev) => !prev);
    }
  };

  onMount(() => {
    if (sidebarButton) {
      sidebarButton.addEventListener("click", toggleSidebar);
    }
  });

  onCleanup(() => {
    if (sidebarButton) {
      sidebarButton.removeEventListener("click", toggleSidebar);
    }
  });

  return (
    <aside class="sidebar" ref={(el) => (sidebarElement = el)}>
      <div class="sidebar-info">
        <figure class="avatar-box">
          <img
            src={IMAGE_URL || dummyProfileImage}
            alt={appConfig.name}
            width="80"
            height="80"
            loading="lazy"
          />
        </figure>

        <div class="info-content">
          <h1 class="name" title={appConfig.name}>
            {userData()?.name || appConfig.name}
          </h1>

          <p class="title">
            {userData()?.bio.split(".")[0] || "Web Developer"}
          </p>
        </div>

        <button
          type="button"
          class="info_more-btn"
          ref={(el) => (sidebarButton = el)}
          data-sidebar-btn
        >
          <Show when={!isSidebarOpen()}>
            <span>
              Show Contacts
              <IoChevronExpand />
            </span>
          </Show>

          <Show when={isSidebarOpen()}>
            <span>
              Hide Contacts <IoChevronCollapse />
            </span>
          </Show>
        </button>
      </div>

      <div class="sidebar-info_more">
        <div class="separator"></div>

        <ul class="contacts-list">
          <Show when={isEmailAvailable()}>
            <li class="contact-item">
              <div class="icon-box">
                <IoMailOpenOutline />
              </div>

              <div class="contact-info">
                <p class="contact-title">Email</p>

                <a
                  href={`mailto:${userData()?.email || socialConfig?.email}`}
                  class="contact-link"
                >
                  {userData()?.email || socialConfig?.email}
                </a>
              </div>
            </li>
          </Show>

          <Show when={isLocationAvailable()}>
            <li class="contact-item">
              <div class="icon-box">
                <IoLocationOutline />
              </div>

              <div class="contact-info">
                <p class="contact-title">Location</p>

                <address>{userData()?.location || ""}</address>
              </div>
            </li>
          </Show>
        </ul>

        <div class="separator"></div>

        <ul class="social-list">
          <Show when={socialConfig !== undefined && socialConfig?.linkedin}>
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
          </Show>

          <Show when={socialConfig !== undefined && socialConfig?.github}>
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
          </Show>

          <Show when={socialConfig !== undefined && socialConfig?.twitter}>
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
          </Show>

          <Show when={socialConfig !== undefined && socialConfig?.instagram}>
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
          </Show>
        </ul>
      </div>
    </aside>
  );
}
