import { Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { PlayersComponent } from "./players/players.component";
import { SignInComponent } from './signin/signin.component';
import { CreateGuildComponent } from "./create-guild/create-guild.component";
import { CharacterFactionComponent } from "./character-faction/character-faction.component";
import { authGuard } from './shared/auth.guard';
import { CreateCharacterComponent } from './create-character/create-character.component';

export const routes: Routes = [
  // Default route → sign in
  { path: '', pathMatch: 'full', redirectTo: 'signin' },

  // Sign in page (no guard)
  { path: 'signin', component: SignInComponent },

  // Protected route (canActivate with authGuard)
  {
    path: 'create-character',
    component: CreateCharacterComponent,
    canActivate: [authGuard],
  },

  { path: 'home', component: HomeComponent },
  { path: 'players', component: PlayersComponent },

  // Fallback
  { path: '**', redirectTo: 'signin' },

  { path: "create-guild", component: CreateGuildComponent },
  { path: "character-faction", component: CharacterFactionComponent },
];
