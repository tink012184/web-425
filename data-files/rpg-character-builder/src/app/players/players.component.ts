import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  Character,
  CharacterService,
} from '../shared/character.service';

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
        <div class="card" *ngFor="let c of premadeCharacters">
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
          <p>No created characters yet. Visit the character creator to add one!</p>
        </ng-template>
      </section>
    </section>
  `,
  styleUrls: ['./players.component.css'],
})
export class PlayersComponent {
  premadeCharacters: Character[] = [];
  createdCharacters: Character[] = [];

  constructor(private characterService: CharacterService) {
    // pull data from the combined CharacterService
    this.premadeCharacters = this.characterService.premadeCharacters;
    this.createdCharacters = this.characterService.createdCharacters;
  }
}