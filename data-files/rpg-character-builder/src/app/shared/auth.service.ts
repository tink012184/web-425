import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { GuildService } from "./guild.service";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private loggedIn = false;

  constructor(private router: Router, private guildService: GuildService) {
    // Restore login state on refresh
    this.loggedIn = sessionStorage.getItem("loggedIn") === "true";
  }

  login(username: string): void {
    this.loggedIn = true;
    sessionStorage.setItem("loggedIn", "true");
    sessionStorage.setItem("username", username);
  }

  logout(): void {
    // Update internal state
    this.loggedIn = false;

    // Remove session values
    sessionStorage.removeItem("loggedIn");
    sessionStorage.removeItem("username");

    // Clear guilds for this session
    this.guildService.clearGuilds();

    // Navigate back to signin page
    this.router.navigate(["/signin"]);
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  getUsername(): string | null {
    return sessionStorage.getItem("username");
  }
}
