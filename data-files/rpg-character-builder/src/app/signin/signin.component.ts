// src/app/signin/signin.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <section class="signin">
      <h1>Sign In</h1>
      <p class="intro">
        Please sign in to access the RPG Character Creator.
      </p>

      <form [formGroup]="signinForm" (ngSubmit)="onSubmit()" novalidate>
        <div class="form-group" [class.has-error]="username?.invalid && username?.touched">
          <label for="username">Username</label>
          <input id="username" type="text" formControlName="username" />
          <div class="error" *ngIf="username?.touched && username?.invalid">
            <span *ngIf="username?.errors?.['required']">
              Username is required.
            </span>
          </div>
        </div>

        <div class="form-group" [class.has-error]="password?.invalid && password?.touched">
          <label for="password">Password</label>
          <input id="password" type="password" formControlName="password" />
          <div class="error" *ngIf="password?.touched && password?.invalid">
            <span *ngIf="password?.errors?.['required']">
              Password is required.
            </span>
            <span *ngIf="password?.errors?.['minlength']">
              Password must be at least 4 characters.
            </span>
          </div>
        </div>

        <button type="submit" [disabled]="signinForm.invalid">
          Sign In
        </button>
      </form>
    </section>
  `,
  styles: [
    `
      .signin {
        max-width: 480px;
        margin: 0 auto;
        padding: 1.5rem;
      }

      .intro {
        margin-bottom: 1.5rem;
      }

      form {
        display: grid;
        gap: 1rem;
      }

      .form-group {
        display: flex;
        flex-direction: column;
      }

      .form-group.has-error input {
        border-color: #b91c1c;
        outline-color: #b91c1c;
      }

      label {
        font-weight: 600;
        margin-bottom: 0.25rem;
      }

      input {
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
    `,
  ],
})
export class SignInComponent {
  signinForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    this.signinForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  get username() {
    return this.signinForm.get('username');
  }

  get password() {
    return this.signinForm.get('password');
  }

  onSubmit(): void {
    if (this.signinForm.invalid) {
      this.signinForm.markAllAsTouched();
      return;
    }

    const { username } = this.signinForm.value;

    // Fake login for this assignment
    this.auth.login(username);

    // After successful sign-in → go to create-character page
    this.router.navigate(['/create-reactive']);
  }
}