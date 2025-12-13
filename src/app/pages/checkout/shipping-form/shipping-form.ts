import { Component } from '@angular/core';
import { MatIcon } from "@angular/material/icon";
import { MatFormField } from "@angular/material/form-field";
import { ViewPanel } from '../../../directives/view-panel';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'app-shipping-form',
  imports: [MatIcon, MatFormField, ViewPanel, MatInput],
  template: `
    <div appViewPanel>
    <h2 class="text-2xl font-bold mb-6 flex items-center gap-2">
        <mat-icon>local_shipping</mat-icon>
        Informacije za dostavu
    </h2>
    <form class="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <mat-form-field>
            <input matInput type="text" placeholder="Ime">
        </mat-form-field>
        <mat-form-field>
            <input matInput type="text" placeholder="Prezime">
        </mat-form-field>
        <mat-form-field class="col-span-2">
            <textarea matInput type="text" placeholder="Adresa"></textarea>
        </mat-form-field>
        <mat-form-field>
            <input matInput type="text" placeholder="Grad">
        </mat-form-field>
        <mat-form-field>
            <input matInput type="text" placeholder="Poštanski kod">
        </mat-form-field>
    </form>
</div>
  `,
  styles: ``,
})
export class ShippingForm {

}
