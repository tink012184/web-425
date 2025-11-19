// src/app/create-character/create-character.component.spec.ts

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateCharacterComponent } from './create-character.component';
import { NgForm } from '@angular/forms';

describe('CreateCharacterComponent', () => {
  let component: CreateCharacterComponent;
  let fixture: ComponentFixture<CreateCharacterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateCharacterComponent], // standalone component
    }).compileComponents();

    fixture = TestBed.createComponent(CreateCharacterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the character component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the model with default values', () => {
    expect(component.model).toEqual({
      name: '',
      gender: 'Male',
      class: 'Fighter',
      faction: '',
      startingLocation: '',
      funFact: '',
    });
  });

  it('should not add a character when the form is invalid', () => {
    const resetFormSpy = jasmine.createSpy('resetForm');

    const fakeForm = {
      invalid: true,
      resetForm: resetFormSpy,
    } as unknown as NgForm;

    component.model.name = 'Test Name';
    component.onSubmit(fakeForm);

    expect(component.createdCharacters.length).toBe(0);
    expect(resetFormSpy).not.toHaveBeenCalled();
  });

  it('should add a character and reset the form when valid', () => {
    const resetFormSpy = jasmine.createSpy('resetForm');

    const fakeForm = {
      invalid: false,
      resetForm: resetFormSpy,
    } as unknown as NgForm;

    component.model = {
      name: 'Aria Nightwind',
      gender: 'Female',
      class: 'Wizard',
      faction: 'Moonlit Order',
      startingLocation: 'Silverkeep',
      funFact: 'Collects enchanted quills.',
    };

    component.onSubmit(fakeForm);

    expect(component.createdCharacters.length).toBe(1);
    const created = component.createdCharacters[0];

    expect(created.name).toBe('Aria Nightwind');
    expect(created.gender).toBe('Female');
    expect(created.class).toBe('Wizard');
    expect(created.faction).toBe('Moonlit Order');
    expect(created.startingLocation).toBe('Silverkeep');
    expect(created.funFact).toBe('Collects enchanted quills.');

    // make sure reset was called with the reset model
    expect(resetFormSpy).toHaveBeenCalledWith(component.model);

    // after reset, model should be back to defaults
    expect(component.model).toEqual({
      name: '',
      gender: 'Male',
      class: 'Fighter',
      faction: '',
      startingLocation: '',
      funFact: '',
    });
  });
});