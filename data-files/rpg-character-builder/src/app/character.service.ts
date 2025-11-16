import { Injectable } from "@angular/core";

export interface Character {
  id: number;
  name: string;
  gender: "Male" | "Female" | "Other";
  class: "Fighter" | "Wizard" | "Rogue" | "Druid";
  faction?: string;
  startingLocation?: string;
  funFact?: string;
  isCustom?: boolean; // false/undefined = premade, true = created
}

@Injectable({
  providedIn: "root",
})
export class CharacterService {
  private _characters: Character[] = [
    {
      id: 1,
      name: "Thorn",
      gender: "Male",
      class: "Fighter",
      faction: "The Iron Brotherhood",
      startingLocation: "Ironhold",
      funFact: "Once single-handedly defeated a dragon.",
    },
    {
      id: 2,
      name: "Lyra",
      gender: "Female",
      class: "Wizard",
      faction: "The Arcane Order",
      startingLocation: "Moonspire",
      funFact: "Memorized 500 arcane runes.",
    },
    {
      id: 3,
      name: "Kestrel",
      gender: "Other",
      class: "Rogue",
      faction: "The Silent Knives",
      startingLocation: "Glimmerdeep",
      funFact: "Can pick any lock in seconds.",
    },
    {
      id: 4,
      name: "Bram",
      gender: "Male",
      class: "Fighter",
      faction: "The Iron Brotherhood",
      startingLocation: "Highwatch",
      funFact: "Afraid of chickens.",
    },
    {
      id: 5,
      name: "Seraphine",
      gender: "Female",
      class: "Wizard",
      faction: "The Arcane Order",
      startingLocation: "Verdance",
      funFact: "Brews legendary tea.",
    },
    {
      id: 6,
      name: "Nyx",
      gender: "Other",
      class: "Rogue",
      faction: "The Silent Knives",
      startingLocation: "Duskhaven",
      funFact: "Speaks twelve dialects.",
    },
    {
      id: 7,
      name: "Garruk",
      gender: "Male",
      class: "Fighter",
      faction: "The Iron Brotherhood",
      startingLocation: "Frostfall",
      funFact: "Won 30 arm-wrestling matches.",
    },
    {
      id: 8,
      name: "Iris",
      gender: "Female",
      class: "Wizard",
      faction: "The Arcane Order",
      startingLocation: "Skypier",
      funFact: "Paints with starlight.",
    },
    {
      id: 9,
      name: "Vale",
      gender: "Other",
      class: "Rogue",
      faction: "The Silent Knives",
      startingLocation: "Market Row",
      funFact: "Never leaves footprints.",
    },
    {
      id: 10,
      name: "Elowen",
      gender: "Female",
      class: "Druid",
      faction: "The Nature's Guardians",
      startingLocation: "Evershade Grove",
      funFact: "Communes daily with the ancient trees.",
    },
    {
      id: 11,
      name: "Thalor",
      gender: "Male",
      class: "Druid",
      faction: "The Nature's Guardians",
      startingLocation: "Whisperwind Glade",
      funFact: "Can summon roots to entangle his foes during combat.",
    },
    {
      id: 12,
      name: "Maris",
      gender: "Other",
      class: "Druid",
      faction: "The Nature's Guardians",
      startingLocation: "Silvermist Hollow",
      funFact: "Tends to wounded creatures and can heal plants with song.",
    },
  ];

  get characters(): Character[] {
    return this._characters;
  }

  get premadeCharacters(): Character[] {
    return this._characters.filter((c) => !c.isCustom);
  }

  get createdCharacters(): Character[] {
    return this._characters.filter((c) => c.isCustom);
  }

  addCharacter(character: Character): void {
    this._characters.push({ ...character, isCustom: true });
  }
}
