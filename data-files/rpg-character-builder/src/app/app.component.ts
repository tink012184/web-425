import { Component } from "@angular/core";
import {
  RouterOutlet,
  RouterLink,
  RouterLinkActive,
  Router,
} from "@angular/router";
import { CommonModule } from "@angular/common";
import { AuthService } from "./shared/auth.service";
import { CharacterService } from "./shared/character.service";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  styleUrls: ["./app.component.css"],
  template: `
    <header class="site-header">
      <div class="container header-inner">
        <div class="branding">
          <div class="logo-mark"></div>
          <div>
            <h1 class="title">🛡️RPG Character Builder</h1>
          </div>
        </div>

        <nav class="nav">
          <ul>
            <li><a routerLink="/home" routerLinkActive="active">Home</a></li>
            <li>
              <a routerLink="/create-character" routerLinkActive="active">
                Characters
              </a>
            </li>
            <li>
              <a routerLink="/create-guild" routerLinkActive="active">
                Guilds
              </a>
            </li>
            <li>
              <a routerLink="/players" routerLinkActive="active">Players</a>
            </li>
          </ul>
        </nav>

        <!-- 🔐 Sign in / Sign out buttons (back again!) -->
        <div class="auth-actions">
          <!-- Show Sign In when NOT logged in -->
          <button
            *ngIf="!auth.isLoggedIn()"
            class="btn-small"
            routerLink="/signin"
          >
            Sign In
          </button>

          <!-- Show Sign Out when logged in -->
          <button
            *ngIf="auth.isLoggedIn()"
            class="btn-small"
            (click)="logout()"
          >
            Sign Out
          </button>
        </div>
      </div>
    </header>

    <main class="page-main">
      <div class="container">
        <router-outlet></router-outlet>
      </div>
    </main>

    <footer class="site-footer">
      <div class="container footer-inner">
        <span>© {{ year }} RPG Character Builder</span>

        <nav class="nav nav-footer">
          <ul>
            <li><a routerLink="/home">Home</a></li>
            <li><a routerLink="/create-character">Characters</a></li>
            <li><a routerLink="/create-guild">Guilds</a></li>
            <li><a routerLink="/players">Players</a></li>
          </ul>
        </nav>
      </div>
    </footer>
  `,
})
export class AppComponent {
  title = "RPG Character Builder";
  year = new Date().getFullYear();
  constructor(
    public auth: AuthService,
    private router: Router,
    private characterService: CharacterService
  ) {}

  // Used in the template
  isLoggedIn(): boolean {
    return this.auth.isLoggedIn();
  }

  logout(): void {
    this.auth.logout();
    this.characterService.clearCharacters();
    this.router.navigate(["/signin"]);
  }
}
