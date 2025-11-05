import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Character {
  name: string;
  gender: 'Male' | 'Female' | 'Other';
  class: 'Warrior' | 'Mage' | 'Rogue';
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
      <h2 class="visually-hidden">Players</h2>

      <div class="grid">
        <details
          class="card"
          *ngFor="let c of characters; let i = index; trackBy: trackByName"
          [open]="openIndex === i"
          (toggle)="onToggle(i, $event)"
        >
          <summary
            class="card-summary"
            [ngClass]="getClassColor(c.class)"
            [attr.aria-label]="'Open details for ' + c.class"
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
      </div>
    </section>
  `,
  styleUrls: ['./players.component.css'] // ✅ linked external stylesheet
})
export class PlayersComponent {
  openIndex: number | null = null;

  characters: Character[] = [
    { name: 'Thorn', gender: 'Male', class: 'Warrior', faction: 'The Iron Brotherhood', startingLocation: 'Ironhold', funFact: 'Once single-handedly defeated a dragon.' },
    { name: 'Lyra', gender: 'Female', class: 'Mage', faction: 'The Silver Circle', startingLocation: 'Moonspire', funFact: 'Memorized 500 arcane runes.' },
    { name: 'Kestrel', gender: 'Other', class: 'Rogue', faction: 'Nightshade Syndicate', startingLocation: 'Glimmerdeep', funFact: 'Can pick any lock in seconds.' },
    { name: 'Bram', gender: 'Male', class: 'Warrior', faction: 'Stormguard', startingLocation: 'Highwatch', funFact: 'Afraid of chickens.' },
    { name: 'Seraphine', gender: 'Female', class: 'Mage', faction: 'Everbloom Order', startingLocation: 'Verdance', funFact: 'Brews legendary tea.' },
    { name: 'Nyx', gender: 'Other', class: 'Rogue', faction: 'Shadow Court', startingLocation: 'Duskhaven', funFact: 'Speaks twelve dialects.' },
    { name: 'Garruk', gender: 'Male', class: 'Warrior', faction: 'Wolfborn Clan', startingLocation: 'Frostfall', funFact: 'Won 30 arm-wrestling matches.' },
    { name: 'Iris', gender: 'Female', class: 'Mage', faction: 'Azure Collegium', startingLocation: 'Skypier', funFact: 'Paints with starlight.' },
    { name: 'Vale', gender: 'Other', class: 'Rogue', faction: 'Gilded Daggers', startingLocation: 'Market Row', funFact: 'Never leaves footprints.' },
    { name: 'Rowan', gender: 'Male', class: 'Warrior', faction: 'Crimson Vanguard', startingLocation: 'Redgate', funFact: 'Collects enemy banners.' }
  ];

  trackByName = (_: number, c: Character) => c.name;

  onToggle(i: number, ev: Event) {
    const isOpen = (ev.target as HTMLDetailsElement).open;
    this.openIndex = isOpen ? i : null;
  }

  getClassColor(charClass: string) {
    switch (charClass) {
      case 'Warrior': return 'warrior';
      case 'Mage': return 'mage';
      case 'Rogue': return 'rogue';
      default: return '';
    }
  }
}
