// src/app/shared/character.service.ts
import { Injectable } from '@angular/core';

export interface Character {
  name: string;
  gender: 'Male' | 'Female' | 'Other';
  class: 'Fighter' | 'Wizard' | 'Rogue' | 'Druid';
  faction: string;
  startingLocation: string;
  funFact: string;
}

@Injectable({
  providedIn: 'root',
})
export class CharacterService {
  private _createdCharacters: Character[] = [];

  get createdCharacters(): Character[] {
    return this._createdCharacters;
  }

  addCharacter(character: Character): void {
    this._createdCharacters.push(character);
  }

  clearCharacters(): void {
    this._createdCharacters.length = 0;
  }
}