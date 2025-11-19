import { ComponentFixture, TestBed } from "@angular/core/testing";
import { CreateCharacterComponent } from "./create-character.component";

describe("CreateCharacterComponent", () => {
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

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should generate a random character ID between 1 and 1000 with no decimal places", () => {
    const id = component.generateCharacterId();

    expect(id).toBeGreaterThan(0);
    expect(id).toBeLessThanOrEqual(1000);
    expect(Number.isInteger(id)).toBeTrue();
  });

  it("should add a character with correct customization", () => {
    // Arrange
    component.newCharacter = {
      name: "Thorn",
      gender: "Male",
      class: "Fighter",
    };

    // Act
    component.addCharacter();

    // Assert (use service instead of component.characters)
    const characters = component["characterService"].characters;

    expect(characters.length).toBe(1);

    const added = characters[0];
    expect(added.name).toBe("Thorn");
    expect(added.gender).toBe("Male");
    expect(added.class).toBe("Fighter");
    expect(added.id).toBeDefined();
    expect(Number.isInteger(added.id)).toBeTrue();
  });

  it("should reset all form fields to default Fighter/Male/blank values", () => {
    component.newCharacter = {
      name: "Temp Name",
      gender: "Other",
      class: "Rogue",
    };

    component.resetForm();

    expect(component.newCharacter.name).toBe("");
    expect(component.newCharacter.gender).toBe("Male");
    expect(component.newCharacter.class).toBe("Fighter");
  });
});