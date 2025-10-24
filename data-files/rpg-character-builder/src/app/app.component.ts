import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <header class="site-header">
      <div class="container header-inner">
        <div class="brand">
          <span class="logo">🛡️</span>
          <h1 class="title">RPG Character Maker</h1>
        </div>

        <nav aria-label="Primary" class="nav">
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">Create</a></li>
            <li><a href="#">Classes</a></li>
            <li><a href="#">Races</a></li>
            <li><a href="#">Equipment</a></li>
          </ul>
        </nav>
      </div>
    </header>

    <main class="container main">
      <router-outlet></router-outlet>
    </main>

    <footer class="site-footer">
      <div class="container footer-inner">
        <nav aria-label="Footer" class="nav nav-footer">
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">Create</a></li>
            <li><a href="#">Classes</a></li>
            <li><a href="#">Races</a></li>
            <li><a href="#">Equipment</a></li>
          </ul>
        </nav>
        <p class="copyright">
          © {{ year }} RPG Character Maker · Forge your legend
        </p>
      </div>
    </footer>
  `,
  styles: [
    `
      /* ---------- Theme & fonts (3+ stacks) ---------- */
      :root {
        --bg: #0b0f1a;
        --panel: #111827;
        --ink: #f9fafb;
        --muted: #9aa4b2;
        --accent: #b623d7;
        --glow: rgba(182, 35, 215, 0.35);
        --edge: #1f2937;
      }

      html,
      body,
      :host {
        background: var(--bg);
        color: var(--ink);
        margin: 0;
        line-height: 1.65;
        font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto,
          Helvetica, Arial, sans-serif; /* stack #1 */
      }

      .title {
        font-family: "Garamond", Georgia, "Times New Roman", serif; /* stack #2 */
        letter-spacing: 0.4px;
        margin: 0;
        font-weight: 800;
        text-shadow: 0 0 18px rgba(186, 58, 214, 0.25);
        color: var(--ink);
      }

      .nav a {
        font-family: "Trebuchet MS", "Lucida Grande", "Lucida Sans Unicode",
          "Lucida Sans", Arial, sans-serif; /* stack #3 */
        letter-spacing: 0.2px;
        color: var(--ink);
        text-decoration: none;
        padding: 0.5rem 0.8rem;
        border-radius: 0.6rem;
        transition: 0.2s ease;
      }

      /* Ensure links never appear black or purple */
      .nav a:visited,
      .nav a:link,
      .nav a:active {
        color: var(--ink);
      }

      .nav a:hover,
      .nav a:focus {
        color: #fff; /* brighter on hover */
        box-shadow: 0 0 0 3px var(--glow);
        background: #121a2b;
        outline: 2px solid transparent;
      }

      .copyright {
        font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
          "Liberation Mono", "Courier New", monospace; /* optional #4 */
        color: var(--muted);
        font-size: 0.92rem;
      }

      /* ---------- Layout ---------- */
      .container {
        width: min(1120px, 92%);
        margin-inline: auto;
      }

      .site-header {
        position: sticky;
        top: 0;
        z-index: 50;
        border-bottom: 1px solid var(--edge);
        background: radial-gradient(
            900px 280px at -10% -60%,
            rgba(182, 35, 215, 0.18),
            transparent 60%
          ),
          linear-gradient(180deg, #091022 0%, #0b0f1a 100%);
        backdrop-filter: blur(8px);
      }

      .header-inner {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
        padding: 0.9rem 0;
      }

      .brand {
        display: flex;
        align-items: center;
        gap: 0.6rem;
      }

      .logo {
        font-size: 1.7rem;
        filter: drop-shadow(0 0 10px var(--glow));
      }

      .nav ul {
        display: flex;
        gap: 1rem;
        list-style: none;
        margin: 0;
        padding: 0;
      }

      .main {
        padding: 2rem 0 3rem;
      }

      .site-footer {
        border-top: 1px solid var(--edge);
        background: #0a0e19;
        padding: 1.2rem 0 2rem;
        margin-top: 2rem;
      }

      .footer-inner {
        display: flex;
        flex-direction: column;
        gap: 0.7rem;
        align-items: center;
      }

      .nav-footer ul {
        gap: 0.85rem;
      }

      @media (max-width: 640px) {
        .header-inner {
          flex-direction: column;
          align-items: flex-start;
        }
        .nav ul {
          flex-wrap: wrap;
        }
      }
    `,
  ],
})
export class AppComponent {
  year = new Date().getFullYear();
}
