import { Component } from '@angular/core';
import {
  RouterOutlet,
  RouterLink,
  RouterLinkActive,
  Router
} from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from './shared/auth.service';
import { CharacterService } from './shared/character.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  styleUrls: ['./app.component.css'],
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
  <li><a routerLink="/home" routerLinkActive="active">Home</a></li>
  <li><a routerLink="/players" routerLinkActive="active">Players</a></li>
    <li *ngIf="!isLoggedIn()">
    <a routerLink="/signin" routerLinkActive="active">Sign In</a>
  </li>

  <li *ngIf="isLoggedIn()">
   <a class="nav-link" (click)="logout()">Sign Out</a>
  </li>
  <li><a routerLink="/create-character" routerLinkActive="active">Create Character</a></li>
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
</ul> </nav> </div>
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
  <li *ngIf="!isLoggedIn()">
    <a routerLink="/signin" routerLinkActive="active">Sign In</a>
  </li>

  <li *ngIf="isLoggedIn()">
    <a class="nav-link" (click)="logout()">Sign Out</a>
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
  constructor(private auth: AuthService, private router: Router, private characterService: CharacterService) {}

  // Used in the template
  isLoggedIn(): boolean {
    return this.auth.isLoggedIn();
  }

  logout(): void {
    this.auth.logout();
    this.characterService.clearCharacters();
    this.router.navigate(['/signin']);
  }
}