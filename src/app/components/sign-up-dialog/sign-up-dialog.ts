import { Component, inject, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { ToyStore } from '../../store';
import { AuthStore } from '../../auth-store';
import { MatDialog, MatDialogClose, MatDialogRef } from '@angular/material/dialog';
import { SignInDialog } from '../sign-in-dialog/sign-in-dialog';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-sign-up-dialog',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule, MatDialogClose],
  template: `
    <div class="p-8 min-w-[400px] flex flex-col">
    <div class="flex justify-between">
        <div>
            <h2 class="text-xl font-medium mb-1">Registruj se</h2>
            <p class="text-sm text-gray-500">Pridruži nam se i započni svoju kupovinu danas</p>
        </div>
        <button tabindex="-1" matIconButton class="-mt-2 -mr-2" mat-dialog-close>
            <mat-icon>close</mat-icon>
        </button>
    </div>
    <form [formGroup]="signUpForm" class="mt-6 flex flex-col" (ngSubmit)="signUp()">
        <mat-form-field class="mb-4">
            <input formControlName="name" matInput type="text" placeholder="Enter your name">
            <mat-icon matPrefix>person</mat-icon>
        </mat-form-field>
        <mat-form-field class="mb-4">
            <input formControlName="email" matInput type="email" placeholder="Enter your email">
            <mat-icon matPrefix>email</mat-icon>
        </mat-form-field>
        <mat-form-field class="mb-4">
            <mat-icon matPrefix>lock</mat-icon>
            <input formControlName="password" matInput [type]="passwordVisible() ? 'text' : 'password'"
                placeholder="Enter your password" />
            <button matSuffix matIconButton type="button" class="mr-2"
                (click)="passwordVisible.set(!passwordVisible())">
                <mat-icon>
                    {{ passwordVisible() ? 'visibility_off' : 'visibility' }}
                </mat-icon>
            </button>
        </mat-form-field>
        <mat-form-field class="mb-4">
            <mat-icon matPrefix>lock</mat-icon>
            <input formControlName="confirmPassword" matInput [type]="passwordVisible() ? 'text' : 'password'"
                placeholder="Confirm your password" />
            <button matSuffix matIconButton type="button" class="mr-2"
                (click)="passwordVisible.set(!passwordVisible())">
                <mat-icon>
                    {{ passwordVisible() ? 'visibility_off' : 'visibility' }}
                </mat-icon>
            </button>
        </mat-form-field>
        <button type="submit" matButton="filled" class="w-full">
            Registruj se
        </button>
    </form>
    <p class="text-sm text-gray-500 mt-2 text-center">
        Imaš nalog?
        <a class="text-blue-600 cursor-pointer" (click)="openSignInDialog()">Prijavi se ovde</a>
    </p>
</div>
  `,
  styles: ``,
})
export class SignUpDialog {

  store = inject(ToyStore)
  auth = inject(AuthStore)

  dialog = inject(MatDialog)
  dialogRef = inject(MatDialogRef<SignInDialog>)

  passwordVisible = signal(false)

  fb = inject(NonNullableFormBuilder)
  signUpForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
  })

  signUp() {
    if (this.signUpForm.invalid) {
      this.signUpForm.markAllAsTouched()
      return
    }

    const { email, password, name, confirmPassword } = this.signUpForm.value

    this.auth.signUp({
      email: email!,
      password: password!,
      name: name!,
      confirmPassword: confirmPassword!
    })

    setTimeout(() => {
      if (this.auth.isAuthenticated()) {
        this.dialogRef.close();
      }
    }, 1000);
  }

  openSignInDialog() {
    this.dialogRef.close();
    this.dialog.open(SignInDialog, { disableClose: true });
  }

}
