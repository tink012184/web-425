import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, NgForm } from "@angular/forms";
import { Character, CharacterService } from "../character.service";

type NewCharacter = Pick<Character, "name" | "gender" | "class">;

@Component({
  selector: "app-create-character",
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section class="create-character">
      <h1>Create a New Character</h1>

      <!-- Template-driven form -->
      <form
        #characterForm="ngForm"
        (ngSubmit)="addCharacter(characterForm)"
        class="character-form"
      >
        <label for="name">Name</label>
        <input
          id="name"
          name="name"
          type="text"
          required
          [(ngModel)]="newCharacter.name"
        />

        <label for="gender">Gender</label>
        <select
          id="gender"
          name="gender"
          required
          [(ngModel)]="newCharacter.gender"
        >
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>

        <label for="class">Class</label>
        <select
          id="class"
          name="class"
          required
          [(ngModel)]="newCharacter.class"
        >
          <option value="Fighter">Fighter</option>
          <option value="Wizard">Wizard</option>
          <option value="Rogue">Rogue</option>
          <option value="Druid">Druid</option>
        </select>

        <button type="submit" [disabled]="characterForm.invalid">
          Create Character
        </button>
      </form>

      <!-- Show ONLY created (custom) characters -->
      <section class="character-list">
        <h2>Created Characters</h2>

        <table *ngIf="createdCharacters.length > 0; else noCharacters">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Gender</th>
              <th>Class</th>
              <th>Faction</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let c of createdCharacters">
              <td>{{ c.id }}</td>
              <td>{{ c.name }}</td>
              <td>{{ c.gender }}</td>
              <td>{{ c.class }}</td>
              <td>{{ c.faction || "Unaffiliated" }}</td>
            </tr>
          </tbody>
        </table>

        <ng-template #noCharacters>
          <p>No created characters yet.</p>
        </ng-template>
      </section>
    </section>
  `,
  styles: [
    `
      .create-character {
        max-width: 800px;
        margin: 0 auto;
        padding: 1rem;
      }

      .character-form {
        display: grid;
        gap: 0.75rem;
        margin-bottom: 2rem;
      }

      .character-form label {
        font-weight: 600;
      }

      .character-form input,
      .character-form select,
      .character-form button {
        padding: 0.4rem;
      }

      .character-list table {
        width: 100%;
        border-collapse: collapse;
      }

      .character-list th,
      .character-list td {
        border: 1px solid #ccc;
        padding: 0.4rem;
        text-align: left;
      }
    `,
  ],
})
export class CreateCharacterComponent {
  newCharacter: NewCharacter = {
    name: "",
    gender: "Male",
    class: "Fighter",
  };

  constructor(private characterService: CharacterService) {}

  // ✔ Only show created characters here
  get createdCharacters(): Character[] {
    return this.characterService.characters.filter((c) => c.isCustom);
  }

  generateCharacterId(): number {
    return Math.floor(Math.random() * 1000) + 1;
  }

  addCharacter(form?: NgForm): void {
    if (!this.newCharacter.name.trim()) {
      return;
    }

    const character: Character = {
      id: this.generateCharacterId(),
      ...this.newCharacter,
      faction: "Unaffiliated",
      startingLocation: "Unknown",
      funFact: "Newly created adventurer.",
      isCustom: true,
    };

    this.characterService.addCharacter(character);
    this.resetForm(form);
  }

  resetForm(form?: NgForm): void {
    this.newCharacter = {
      name: "",
      gender: "Male",
      class: "Fighter",
    };

    if (form) {
      form.resetForm(this.newCharacter);
    }
  }
}
