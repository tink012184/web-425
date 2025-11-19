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