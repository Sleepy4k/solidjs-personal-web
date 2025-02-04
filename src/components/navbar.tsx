import { A } from "@solidjs/router";

export default function Navbar() {
  return (
    <nav class="navbar">
      <ul class="navbar-list">
        <li class="navbar-item">
          <A href="/" class="navbar-link" end>
            About
          </A>
        </li>

        <li class="navbar-item">
          <A href="/resume" class="navbar-link">
            Resume
          </A>
        </li>

        <li class="navbar-item">
          <A href="/portofolio" class="navbar-link">
            Portofolio
          </A>
        </li>

        <li class="navbar-item">
          <A href="/contact" class="navbar-link">
            Contact
          </A>
        </li>
      </ul>
    </nav>
  );
}
