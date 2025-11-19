import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Character, CharacterService } from "../character.service";
import { factions } from "../shared/character-factions";

@Component({
  selector: "app-players",
  standalone: true,
  imports: [CommonModule],
  styleUrls: ["./players.component.css"],
  template: `
    <section class="players">
      <h2 class="visually-hidden">Players</h2>

      <!-- Premade characters -->
      <h3>Premade Characters</h3>

      <ng-container
        *ngIf="premadeCharacters.length > 0; else premadePlaceholder"
      >
        <div class="grid">
          <div class="col" *ngFor="let col of columns; let colIdx = index">
            <ng-container *ngFor="let c of premadeCharacters; let i = index">
              <details
                *ngIf="i % 3 === colIdx"
                class="card"
                [ngClass]="classCss(c.class)"
              >
                <summary class="card-summary">
                  <span class="badge" [ngClass]="classCss(c.class)">
                    {{ c.class }}
                  </span>
                </summary>
                <div class="card-body">
                  <h4 class="name">{{ c.name }}</h4>
                  <ul class="meta">
                    <li><strong>Gender:</strong> {{ c.gender }}</li>
                    <li>
                      <strong>Faction:</strong>
                      {{ c.faction || "Unaffiliated" }}
                    </li>
                    <li>
                      <strong>Starting Location:</strong>
                      {{ c.startingLocation || "Unknown" }}
                    </li>
                    <li>
                      <strong>Fun Fact:</strong>
                      {{ c.funFact || "To be discovered..." }}
                    </li>
                  </ul>
                </div>
              </details>
            </ng-container>
          </div>
        </div>
      </ng-container>

      <ng-template #premadePlaceholder>
        <p class="placeholder">
          No premade characters found. Add some seed characters to the
          CharacterService.
        </p>
      </ng-template>

      <!-- Created characters -->
      <h3 style="margin-top: 2rem;">Created Characters</h3>

      <ng-container
        *ngIf="createdCharacters.length > 0; else createdPlaceholder"
      >
        <div class="grid">
          <div class="col" *ngFor="let col of columns; let colIdx = index">
            <ng-container *ngFor="let c of createdCharacters; let i = index">
              <details
                *ngIf="i % 3 === colIdx"
                class="card"
                [ngClass]="classCss(c.class)"
              >
                <summary class="card-summary">
                  <span class="badge" [ngClass]="classCss(c.class)">
                    {{ c.class }}
                  </span>
                </summary>
                <div class="card-body">
                  <h4 class="name">{{ c.name }}</h4>
                  <ul class="meta">
                    <li><strong>Gender:</strong> {{ c.gender }}</li>
                    <li>
                      <strong>Faction:</strong>
                      {{ c.faction || "Unaffiliated" }}
                    </li>
                    <li>
                      <strong>Starting Location:</strong>
                      {{ c.startingLocation || "Unknown" }}
                    </li>
                    <li>
                      <strong>Fun Fact:</strong>
                      {{ c.funFact || "To be discovered..." }}
                    </li>
                  </ul>
                </div>
              </details>
            </ng-container>
          </div>
        </div>
      </ng-container>

      <!-- Created Characters section on Players page -->
<section class="created-characters">
  <h2>Created Characters</h2>

  <!-- If there are created characters, show them -->
  <div class="grid" *ngIf="createdCharacters.length > 0; else noCreated">
    <div class="card" *ngFor="let c of createdCharacters">
      <h3>{{ c.name }} ({{ c.class }} - {{ c.gender }})</h3>
      <p><strong>Faction:</strong> {{ c.faction }}</p>
      <p><strong>Starting Location:</strong> {{ c.startingLocation }}</p>
      <p><strong>Fun Fact:</strong> {{ c.funFact }}</p>
    </div>
  </div>

  <!-- Fallback when there are none -->
  <ng-template #noCreated>
    <p>No created characters yet. Visit the Character Creator to add one!</p>
  </ng-template>
</section>
  `,
})
export class PlayersComponent {
  factions = factions;
  columns = [0, 1, 2];


  createdCharacters: Character[] = [];

  constructor(private characterService: CharacterService) {
      this.createdCharacters = this.characterService.createdCharacters
  }

  get premadeCharacters(): Character[] {
    // characters without isCustom (or false) are treated as premade
    return this.characterService.characters.filter((c) => !c.isCustom);
  }

  get createdCharacters(): Character[] {
    // characters with isCustom === true are created in the app
    return this.characterService.characters.filter((c) => c.isCustom);
  }

  // Map the character's class to your CSS class names
  classCss(cls: string): string {
    switch (cls) {
      case "Fighter":
        return "fighter";
      case "Wizard":
        return "wizard";
      case "Rogue":
        return "rogue";
      case "Druid":
        return "druid";
      default:
        return "";
    }
  }
}


----------------

// src/app/players/players.component.ts

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Character, CharacterService } from '../shared/character.service';
import { factions } from '../shared/character-factions';

interface PreMadeCharacter {
  name: string;
  gender: string;
  class: string;
  faction: string;
  startingLocation: string;
  funFact: string;
}

@Component({
  selector: 'app-players',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="players">
      <h1 class="visually-hidden">Players</h1>

      <!-- PREMADE CHARACTERS -->
      <h2>Premade Characters</h2>
      <div class="grid">
        <div class="card" *ngFor="let c of preMadeCharacters">
          <h3>{{ c.name }} ({{ c.class }} - {{ c.gender }})</h3>
          <p><strong>Faction:</strong> {{ c.faction }}</p>
          <p><strong>Starting Location:</strong> {{ c.startingLocation }}</p>
          <p><strong>Fun Fact:</strong> {{ c.funFact }}</p>
        </div>
      </div>

      <!-- CREATED CHARACTERS -->
      <section class="created-characters">
        <h2>Created Characters</h2>

        <div class="grid" *ngIf="createdCharacters.length > 0; else noCreated">
          <div class="card" *ngFor="let c of createdCharacters">
            <h3>{{ c.name }} ({{ c.class }} - {{ c.gender }})</h3>
            <p><strong>Faction:</strong> {{ c.faction }}</p>
            <p><strong>Starting Location:</strong> {{ c.startingLocation }}</p>
            <p><strong>Fun Fact:</strong> {{ c.funFact }}</p>
          </div>
        </div>

        <ng-template #noCreated>
          <p>No created characters yet. Visit the Character Creator to add one!</p>
        </ng-template>
      </section>
    </section>
  `,
  styleUrls: ['./players.component.css'],
})
export class PlayersComponent {
  // === YOUR ORIGINAL PREMADE CHARACTERS HERE ===
  preMadeCharacters: PreMadeCharacter[] = [
    {
      name: 'Thorin Oakcrest',
      gender: 'Male',
      class: 'Fighter',
      faction: 'Stonekeep',
      startingLocation: 'Irondeep Hold',
      funFact: 'Once defeated a troll using only a cooking pan.',
    },
    {
      name: 'Lyra Moonshadow',
      gender: 'Female',
      class: 'Wizard',
      faction: 'Moonlit Order',
      startingLocation: 'Silverlight Spire',
      funFact: 'Carried a glowing butterfly as a familiar for years.',
    },
    {
      name: 'Jax Blackthorn',
      gender: 'Male',
      class: 'Rogue',
      faction: 'Shadow Syndicate',
      startingLocation: 'Nightfall Alley',
      funFact: 'Pickpocketed a dragonborn ambassador successfully.',
    },
  ];

  // Created characters from shared service
  createdCharacters: Character[] = [];

  factions = factions;

  constructor(private characterService: CharacterService) {
    this.createdCharacters = this.characterService.createdCharacters;
  }
}