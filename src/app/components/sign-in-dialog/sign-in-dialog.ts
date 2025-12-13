import { Component, inject, signal } from '@angular/core';
import { NonNullableFormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatDialog, MatDialogClose, MatDialogRef } from '@angular/material/dialog'
import { MatFormField, MatPrefix, MatSuffix } from '@angular/material/form-field'
import { MatInput } from '@angular/material/input'
import { AuthStore } from '../../auth-store';
import { SignUpDialog } from '../sign-up-dialog/sign-up-dialog';

@Component({
  selector: 'app-sign-in-dialog',
  imports: [MatIconButton, MatIcon, MatDialogClose, MatFormField, MatInput, MatSuffix, MatPrefix, MatButton, ReactiveFormsModule],
  template: `
    <div class="p-8 max-w-[400px] flex flex-col">
    <div class="flex justify-between">
        <div>
            <h2 class="text-xl font-medium mb-1">Prijava</h2>
            <p class="text-sm text-gray-500">Uloguj se u svoj nalog da nastaviš sa kupovinom</p>
        </div>
        <button tabindex="-1" matIconButton class="-mt-2 -mr-2" mat-dialog-close>
            <mat-icon>close</mat-icon>
        </button>
    </div>
    <form class="mt-6" [formGroup]="signInForm" (ngSubmit)="signIn()">
        <mat-form-field class="mb-4">
            <input matInput formControlName="email" type="email" placeholder="Enter your email" />
            <mat-icon matPrefix>email</mat-icon>
        </mat-form-field>
        <mat-form-field class="mb-6">
            <input matInput formControlName="password" [type]="passwordVisible() ? 'text': 'password'"
                placeholder="Enter your password" />
            <mat-icon matPrefix>lock</mat-icon>
            <button matSuffix matIconButton type="button" class="mr-2"
                (click)="passwordVisible.set(!passwordVisible())">
                <mat-icon [fontIcon]="passwordVisible() ? 'visibility_off': 'visibility'"></mat-icon>
            </button>
        </mat-form-field>
        <button type="submit" matButton="filled" class="w-full">Prijavi se</button>
    </form>

    <p class="text-sm text-gray-500 mt-2 text-center">
        Nemaš nalog?
        <a class="text-blue-600 cursor-pointer" (click)="openSignUpDialog()">Registruj se</a>
    </p>
</div>
  `,
  styles: ``,
})
export class SignInDialog {

  authStore = inject(AuthStore)
  dialog = inject(MatDialog)
  dialogRef = inject(MatDialogRef<SignInDialog>)

  passwordVisible = signal<boolean>(false)

  fb = inject(NonNullableFormBuilder)
  signInForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]]
  })

  signIn() {
    if (this.signInForm.invalid) {
      this.signInForm.markAllAsTouched()
      return
    }

    const { email, password } = this.signInForm.value

    this.authStore.signIn({
      email: email!,
      password: password!
    })

    setTimeout(() => {
      if (this.authStore.isAuthenticated()) {
        this.dialogRef.close();
      }
    }, 1000);
  }

  openSignUpDialog() {
    this.dialogRef.close();
    this.dialog.open(SignUpDialog, { disableClose: true });
  }
}