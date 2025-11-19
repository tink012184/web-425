// Created by Melissa Lutz - Hands-On 5.1: TDD and Reactive Forms

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { factions } from '../shared/character-factions';

interface Character {
  name: string;
  gender: 'Male' | 'Female' | 'Other';
  class: 'Fighter' | 'Wizard' | 'Rogue' | 'Druid';
  faction: string;
  startingLocation: string;
  funFact: string;
}

@Component({
  selector: 'app-create-character-reactive',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <section class="create-character">
      <h1>Reactive Character Creator</h1>
      <p class="intro">
        This version of the creator uses
        <strong>Reactive Forms</strong> with validation and is ready for unit
        testing with Jasmine and Karma.
      </p>

      <form [formGroup]="characterForm" (ngSubmit)="onSubmit()" novalidate>
        <!-- Name -->
        <div
          class="form-group"
          [class.has-error]="name?.invalid && name?.touched"
        >
          <label for="name">Name</label>
          <input id="name" type="text" formControlName="name" />
          <div class="error" *ngIf="name?.touched && name?.invalid">
            <span *ngIf="name?.errors?.['required']">Name is required.</span>
            <span *ngIf="name?.errors?.['minlength']">
              Name must be at least 2 characters.
            </span>
            <span *ngIf="name?.errors?.['maxlength']">
              Name cannot be more than 40 characters.
            </span>
          </div>
        </div>

        <!-- Gender -->
        <div
          class="form-group"
          [class.has-error]="gender?.invalid && gender?.touched"
        >
          <label for="gender">Gender</label>
          <select id="gender" formControlName="gender">
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          <div class="error" *ngIf="gender?.touched && gender?.invalid">
            <span *ngIf="gender?.errors?.['required']">
              Gender is required.
            </span>
          </div>
        </div>

        <!-- Class -->
        <div
          class="form-group"
          [class.has-error]="charClass?.invalid && charClass?.touched"
        >
          <label for="class">Class</label>
          <select id="class" formControlName="class">
            <option value="Fighter">Fighter</option>
            <option value="Wizard">Wizard</option>
            <option value="Rogue">Rogue</option>
            <option value="Druid">Druid</option>
          </select>
          <div class="error" *ngIf="charClass?.touched && charClass?.invalid">
            <span *ngIf="charClass?.errors?.['required']">
              Class is required.
            </span>
          </div>
        </div>

        <!-- Faction -->
        <div
          class="form-group"
          [class.has-error]="
            factionControl?.invalid && factionControl?.touched
          "
        >
          <label for="faction">Faction</label>
          <select id="faction" formControlName="faction">
            <option value="" disabled>Select a faction</option>
            <option *ngFor="let f of factions" [value]="f.name">
              {{ f.name }}
            </option>
          </select>
          <div
            class="error"
            *ngIf="factionControl?.touched && factionControl?.invalid"
          >
            <span *ngIf="factionControl?.errors?.['required']">
              Faction is required.
            </span>
          </div>
        </div>

        <!-- Starting Location -->
        <div
          class="form-group"
          [class.has-error]="
            startingLocation?.invalid && startingLocation?.touched
          "
        >
          <label for="startingLocation">Starting Location</label>
          <input
            id="startingLocation"
            type="text"
            formControlName="startingLocation"
          />
          <div
            class="error"
            *ngIf="
              startingLocation?.touched && startingLocation?.invalid
            "
          >
            <span *ngIf="startingLocation?.errors?.['required']">
              Starting location is required.
            </span>
            <span *ngIf="startingLocation?.errors?.['minlength']">
              Starting location must be at least 2 characters.
            </span>
          </div>
        </div>

        <!-- Fun Fact -->
        <div
          class="form-group"
          [class.has-error]="funFact?.invalid && funFact?.touched"
        >
          <label for="funFact">Fun Fact</label>
          <textarea
            id="funFact"
            rows="3"
            formControlName="funFact"
            placeholder="What makes this character unforgettable?"
          ></textarea>
          <div class="error" *ngIf="funFact?.touched && funFact?.invalid">
            <span *ngIf="funFact?.errors?.['required']">
              Fun fact is required.
            </span>
            <span *ngIf="funFact?.errors?.['maxlength']">
              Fun fact cannot be more than 200 characters.
            </span>
          </div>
        </div>

        <button type="submit" [disabled]="characterForm.invalid">
          Create Character
        </button>
      </form>

      <!-- Created characters preview -->
      <section class="created-list" *ngIf="createdCharacters.length > 0">
        <h2>Created Characters (Reactive)</h2>
        <ul>
          <li *ngFor="let c of createdCharacters">
            <h3>{{ c.name }} ({{ c.class }} - {{ c.gender }})</h3>
            <p>
              <strong>Faction:</strong> {{ c.faction }} |
              <strong>Starts in:</strong> {{ c.startingLocation }}
            </p>
            <p class="fun-fact">
              <strong>Fun Fact:</strong> {{ c.funFact }}
            </p>
          </li>
        </ul>
      </section>
    </section>
  `,
  styles: [
    `
      .create-character {
        max-width: 720px;
        margin: 0 auto;
        padding: 1.5rem;
      }

      .create-character h1 {
        margin-bottom: 0.5rem;
      }

      .intro {
        margin-bottom: 1.5rem;
      }

      form {
        display: grid;
        gap: 1rem;
        margin-bottom: 2rem;
      }

      .form-group {
        display: flex;
        flex-direction: column;
      }

      .form-group.has-error input,
      .form-group.has-error select,
      .form-group.has-error textarea {
        border-color: #b91c1c;
        outline-color: #b91c1c;
      }

      label {
        font-weight: 600;
        margin-bottom: 0.25rem;
      }

      input,
      select,
      textarea {
        padding: 0.5rem;
        border-radius: 0.375rem;
        border: 1px solid #4b5563;
        font: inherit;
      }

      .error {
        color: #b91c1c;
        font-size: 0.85rem;
        margin-top: 0.25rem;
      }

      button[type='submit'] {
        justify-self: flex-start;
        padding: 0.5rem 1.25rem;
        border-radius: 9999px;
        border: none;
        font-weight: 600;
        cursor: pointer;
      }

      button[disabled] {
        opacity: 0.6;
        cursor: not-allowed;
      }

      .created-list ul {
        list-style: none;
        padding: 0;
        margin: 0;
      }

      .created-list li {
        border: 1px solid #1f2937;
        border-radius: 0.75rem;
        padding: 0.75rem 1rem;
        margin-bottom: 0.75rem;
      }

      .created-list h3 {
        margin: 0 0 0.25rem;
      }

      .fun-fact {
        margin: 0.25rem 0 0;
        font-style: italic;
      }
    `,
  ],
})
export class CreateCharacterReactiveComponent {
  factions = factions;

  characterForm: FormGroup;

  createdCharacters: Character[] = [];

  constructor(private fb: FormBuilder) {
    this.characterForm = this.fb.group({
      name: [
        '',
        [Validators.required, Validators.minLength(2), Validators.maxLength(40)],
      ],
      gender: ['Male', Validators.required],
      class: ['Fighter', Validators.required],
      faction: ['', Validators.required],
      startingLocation: ['', [Validators.required, Validators.minLength(2)]],
      funFact: ['', [Validators.required, Validators.maxLength(200)]],
    });
  }

  get name() {
    return this.characterForm.get('name');
  }

  get gender() {
    return this.characterForm.get('gender');
  }

  get charClass() {
    return this.characterForm.get('class');
  }

  get factionControl() {
    return this.characterForm.get('faction');
  }

  get startingLocation() {
    return this.characterForm.get('startingLocation');
  }

  get funFact() {
    return this.characterForm.get('funFact');
  }

  onSubmit(): void {
    if (this.characterForm.invalid) {
      this.characterForm.markAllAsTouched();
      return;
    }

    const newCharacter = this.characterForm.value as Character;
    this.createdCharacters.push(newCharacter);

    this.characterForm.reset({
      gender: 'Male',
      class: 'Fighter',
    });
  }
}