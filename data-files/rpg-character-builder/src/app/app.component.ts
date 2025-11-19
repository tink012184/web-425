import { Component } from '@angular/core';
import {
  RouterOutlet,
  RouterLink,
  RouterLinkActive,
  Router
} from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from './shared/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <header class="site-header">
      <h1>RPG Character Maker</h1>

      <nav class="nav"><ul>
  <li><a routerLink="/home" routerLinkActive="active">Home</a></li>
  <li><a routerLink="/players" routerLinkActive="active">Players</a></li>
  <li><a routerLink="/create-character" routerLinkActive="active">Create Character</a></li>

  <li *ngIf="!isLoggedIn()">
    <a routerLink="/signin" routerLinkActive="active">Sign In</a>
  </li>

  <li *ngIf="isLoggedIn()">
    <button type="button" (click)="logout()">Sign Out</button>
  </li>
</ul> </nav>
    </header>

    <main class="content">
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [
    `
      .site-header {
        padding: 1rem 1.5rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid #374151;
      }

      .nav {
        display: flex;
        gap: 1rem;
        align-items: center;
      }

      a {
        text-decoration: none;
        font-weight: 500;
        color: #111827;
      }

      a.active {
        text-decoration: underline;
      }

      .signout-btn {
        padding: 0.45rem 0.9rem;
        border-radius: 9999px;
        border: 1px solid #4b5563;
        background-color: white;
        cursor: pointer;
        font-size: 0.9rem;
      }

      .content {
        padding: 1.5rem;
      }
    `,
  ],
})
export class AppComponent {
  constructor(private auth: AuthService, private router: Router) {}

  // Used in the template
  isLoggedIn(): boolean {
    return this.auth.isLoggedIn();
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/signin']);
  }
}