import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { factions } from '../shared/character-factions';

interface Character {
  name: string;
  gender: 'Male' | 'Female' | 'Other';
  class: 'Warrior' | 'Mage' | 'Rogue' | 'Druid';
  faction: string;
  startingLocation: string;
  funFact: string;
}

@Component({
  selector: 'app-players',
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['./players.component.css'],
  template: `
    <section class="players">
      <h2 class="visually-hidden">Players</h2>

      <div class="grid">
        <div class="col" *ngFor="let col of columns; let colIdx = index">
          <ng-container *ngFor="let c of characters; let i = index">
            <details
              *ngIf="i % 3 === colIdx"
              class="card"
              [open]="openIndex === i"
            >
              <summary
                class="card-summary"
                [ngClass]="getClassColor(c.class)"
                (click)="open(i, $event)"
                [attr.aria-expanded]="openIndex === i"
              >
                <span class="badge">{{ c.class }}</span>
              </summary>

              <div class="card-body">
                <h3 class="name">{{ c.name }}</h3>
                <ul class="meta">
                  <li><strong>Gender:</strong> {{ c.gender }}</li>
                  <li><strong>Faction:</strong> {{ c.faction }}</li>
                  <li><strong>Start:</strong> {{ c.startingLocation }}</li>
                  <li><strong>Fun fact:</strong> {{ c.funFact }}</li>
                </ul>
              </div>
            </details>
          </ng-container>
        </div>
      </div>
    </section>
  `
})
export class PlayersComponent {
  openIndex: number | null = null;
  readonly columns = [0, 1, 2];
  readonly factions = factions;

  characters: Character[] = [
    { name: 'Thorn', gender: 'Male', class: 'Warrior', faction: 'The Iron Brotherhood', startingLocation: 'Ironhold', funFact: 'Once single-handedly defeated a dragon.' },
    { name: 'Lyra', gender: 'Female', class: 'Mage', faction: 'The Arcane Order', startingLocation: 'Moonspire', funFact: 'Memorized 500 arcane runes.' },
    { name: 'Kestrel', gender: 'Other', class: 'Rogue', faction: 'The Silent Knives', startingLocation: 'Glimmerdeep', funFact: 'Can pick any lock in seconds.' },
    { name: 'Bram', gender: 'Male', class: 'Warrior', faction: 'The Iron Brotherhood', startingLocation: 'Highwatch', funFact: 'Afraid of chickens.' },
    { name: 'Seraphine', gender: 'Female', class: 'Mage', faction: 'The Arcane Order', startingLocation: 'Verdance', funFact: 'Brews legendary tea.' },
    { name: 'Nyx', gender: 'Other', class: 'Rogue', faction: 'The Silent Knives', startingLocation: 'Duskhaven', funFact: 'Speaks twelve dialects.' },
    { name: 'Garruk', gender: 'Male', class: 'Warrior', faction: 'The Iron Brotherhood', startingLocation: 'Frostfall', funFact: 'Won 30 arm-wrestling matches.' },
    { name: 'Iris', gender: 'Female', class: 'Mage', faction: 'The Arcane Order', startingLocation: 'Skypier', funFact: 'Paints with starlight.' },
    { name: 'Vale', gender: 'Other', class: 'Rogue', faction: 'The Silent Knives', startingLocation: 'Market Row', funFact: 'Never leaves footprints.' },
    { name: 'Elowen', gender: 'Female', class: 'Druid', faction: "The Nature's Guardians", startingLocation: 'Evershade Grove', funFact: 'Communes daily with the ancient trees.' },
      { name: 'Thalor', gender: 'Male', class: 'Druid', faction: "The Nature's Guardians", startingLocation: 'Whisperwind Glade', funFact: 'Can summon roots to entangle his foes during combat.' },
  { name: 'Maris', gender: 'Other', class: 'Druid', faction: "The Nature's Guardians", startingLocation: 'Silvermist Hollow', funFact: 'Tends to wounded creatures and can heal plants with song.' }
  ];

  /** Keeps track of which card is open */
  open(i: number, ev: MouseEvent) {
    ev.preventDefault();
    this.openIndex = i;
  }

  /** Adds dynamic color themes */
  getClassColor(charClass: string) {
    switch (charClass) {
      case 'Warrior': return 'warrior';
      case 'Mage': return 'mage';
      case 'Rogue': return 'rogue';
      case 'Druid': return 'druid';
      default: return '';
    }
  }

  trackByName = (_: number, c: Character) => c.name;
}