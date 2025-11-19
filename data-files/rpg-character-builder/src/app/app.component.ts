import { Component } from "@angular/core";
import { RouterOutlet, RouterLink, RouterLinkActive } from "@angular/router";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  // Link the external CSS file:
  styleUrls: ["./app.component.css"],
  template: `
    <header class="site-header">
      <div class="container header-inner">
        <div class="brand">
          <a
            routerLink="/"
            class="brand-link"
            routerLinkActive="active"
            [routerLinkActiveOptions]="{ exact: true }"
          >
            <span class="logo">🛡️</span>
            <h1 class="title">{{ title }}</h1></a
          >
        </div>

        <nav aria-label="Primary" class="nav">
          <ul>
            <li>
              <a
                routerLink="/players"
                routerLinkActive="active"
                [routerLinkActiveOptions]="{ exact: true }"
                >Players</a
              >
            </li>
            <li>
              <a routerLink="/signin" routerLinkActive="active">Sign In</a>
            </li>
            <li>
              <a routerLink="/create-character" routerLinkActive="active"
                >Create Character</a
              >
            </li>
            <li>
              <a routerLink="/create-guild" routerLinkActive="active"
                >Create Guild</a
              >
            </li>
            <li>
              <a routerLink="/character-faction" routerLinkActive="active"
                >Character Faction</a
              >
            </li>
            <!-- Show Sign In if NOT logged in -->
       <li> <a
          routerLink="/signin"
          routerLinkActive="active"
          *ngIf="!isLoggedIn()"
        >
          Sign In
        </a>
</li>
        <!-- Show Sign Out if logged in -->
     <li>   <button
          type="button"
          class="signout-btn"
          *ngIf="isLoggedIn()"
          (click)="onLogout()"
        >
          Sign Out
        </button>
       </li>   </ul>
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
            <li>
              <a routerLink="/players" routerLinkActive="active">Players</a>
            </li>
            <li>
              <a routerLink="/signin" routerLinkActive="active">Sign In</a>
            </li>
            <li>
              <a routerLink="/create-character" routerLinkActive="active"
                >Create Character</a
              >
            </li>
            <li>
              <a routerLink="/create-guild" routerLinkActive="active"
                >Create Guild</a
              >
            </li>
            <li>
              <a routerLink="/character-faction" routerLinkActive="active"
                >Character Faction</a
              >
            </li>
          </ul>
        </nav>
        <p class="copyright">
          © {{ year }} RPG Character Builder · Forge your legend
        </p>
      </div>
    </footer>
  `,
})
export class AppComponent {
  title = "RPG Character Builder";
  year = new Date().getFullYear();
  constructor(private auth: AuthService, private router: Router) {}

  isLoggedIn(): boolean {
    return this.auth.isLoggedIn();
  }

  onLogout(): void {
    this.auth.logout();
    this.router.navigate(['/signin']);
}
}