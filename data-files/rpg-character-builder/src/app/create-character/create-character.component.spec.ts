// Hands-On 5.1 – TDD tests for Reactive Forms

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateCharacterReactiveComponent } from './create-character-reactive.component';

describe('CreateCharacterReactiveComponent', () => {
  let component: CreateCharacterReactiveComponent;
  let fixture: ComponentFixture<CreateCharacterReactiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateCharacterReactiveComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateCharacterReactiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the reactive character component', () => {
    expect(component).toBeTruthy();
  });

  it('should create a FormGroup with all expected controls', () => {
    const form = component.characterForm;

    expect(form.contains('name')).withContext('name control').toBeTrue();
    expect(form.contains('gender')).withContext('gender control').toBeTrue();
    expect(form.contains('class')).withContext('class control').toBeTrue();
    expect(form.contains('faction')).withContext('faction control').toBeTrue();
    expect(form.contains('startingLocation'))
      .withContext('startingLocation control')
      .toBeTrue();
    expect(form.contains('funFact')).withContext('funFact control').toBeTrue();
  });

  it('should be invalid when required fields are empty', () => {
    component.characterForm.reset();
    expect(component.characterForm.invalid).toBeTrue();

    const name = component.characterForm.get('name');
    const funFact = component.characterForm.get('funFact');

    expect(name?.hasError('required')).toBeTrue();
    expect(funFact?.hasError('required')).toBeTrue();
  });

  it('should require name to be at least 2 characters', () => {
    const name = component.characterForm.get('name');
    name?.setValue('A'); // too short

    expect(name?.invalid).toBeTrue();
    expect(name?.hasError('minlength')).toBeTrue();

    name?.setValue('Ar'); // valid
    expect(name?.valid).toBeTrue();
  });

  it('should be valid when all fields have correct values', () => {
    component.characterForm.setValue({
      name: 'Aria Nightwind',
      gender: 'Female',
      class: 'Wizard',
      faction: 'Moonlit Order',
      startingLocation: 'Silverkeep',
      funFact: 'Collects enchanted quills.',
    });

    expect(component.characterForm.valid).toBeTrue();
  });

  it('should push a new character into createdCharacters on valid submit', () => {
    component.characterForm.setValue({
      name: 'Thorne Grayfall',
      gender: 'Male',
      class: 'Rogue',
      faction: 'Shadow Syndicate',
      startingLocation: 'Blackstone Alley',
      funFact: 'Once stole a dragon’s scale and lived.',
    });

    component.onSubmit();

    expect(component.createdCharacters.length).toBe(1);
    expect(component.createdCharacters[0].name).toBe('Thorne Grayfall');
  });

  it('should not submit when form is invalid', () => {
    component.characterForm.reset({
      gender: 'Male',
      class: 'Fighter',
    });

    component.onSubmit();

    expect(component.createdCharacters.length).toBe(0);
  });
});