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

      <ng-template #createdPlaceholder>
        <p class="placeholder">
          No created characters yet. Visit the Create Character page to add one.
        </p>
      </ng-template>
    </section>
  `,
})
export class PlayersComponent {
  factions = factions;
  columns = [0, 1, 2];

  constructor(private characterService: CharacterService) {}

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
