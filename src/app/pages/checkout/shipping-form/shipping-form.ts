import { Component, inject } from '@angular/core';
import { MatIcon } from "@angular/material/icon";
import { MatFormField, MatFormFieldModule } from "@angular/material/form-field";
import { ViewPanel } from '../../../directives/view-panel';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatTelInput } from 'mat-tel-input';
import { NonNullableFormBuilder, ɵInternalFormsSharedModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthStore } from '../../../auth-store';
import { ToyStore } from '../../../store';

@Component({
    selector: 'app-shipping-form',
    imports: [MatFormFieldModule, MatInputModule, MatIcon, MatFormField, ViewPanel, MatInput, MatTelInput, ɵInternalFormsSharedModule, ReactiveFormsModule],
    template: `
    <div appViewPanel>
    <h2 class="text-2xl font-bold mb-6 flex items-center gap-2">
        <mat-icon>local_shipping</mat-icon>
        Informacije za dostavu
    </h2>
    <form [formGroup]="checkoutForm" class="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <mat-form-field>
            <input matInput type="text" placeholder="Ime i prezime" formControlName="name">
        </mat-form-field>
        <mat-form-field>
            <mat-tel-input formControlName="phone" [preferredCountries]="['rs']" placeholder="Kontakt telefon"></mat-tel-input>
        </mat-form-field>
        <mat-form-field class="col-span-2">
            <textarea matInput type="text" placeholder="Adresa" formControlName="address"></textarea>
        </mat-form-field>
        <mat-form-field>
            <input matInput type="text" placeholder="Grad" formControlName="city">
        </mat-form-field>
        <mat-form-field>
            <input matInput type="text" placeholder="Poštanski kod" formControlName="zip">
        </mat-form-field>
    </form>
</div>
  `,
    styles: ``,
})
export class ShippingForm {
    fb = inject(NonNullableFormBuilder)
    auth = inject(AuthStore)
    store = inject(ToyStore)
    checkoutForm = this.fb.group({
        name: [this.auth.user()?.name ?? '', [Validators.required]],
        phone: ['', Validators.required],
        address: ['', Validators.required],
        city: ['', Validators.required],
        zip: ['', Validators.required]
    })

    constructor() {
        this.checkoutForm.valueChanges.subscribe(() => {
            if (this.checkoutForm.valid) {
                this.store.setCheckoutForm(this.checkoutForm.getRawValue())
            } else {
                this.store.clearCheckoutForm()
            }
        })
    }

}
