import { Component, inject, signal } from '@angular/core';
import { ViewPanel } from "../../../directives/view-panel";
import { MatFormField, MatLabel } from "@angular/material/form-field";
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { OptionItemModel } from '../../../models/option-item-model';
import { MatSelect, MatOption } from '@angular/material/select'
import { MatAnchor } from "@angular/material/button";
import { ToyStore } from '../../../store';

@Component({
  selector: 'app-write-review',
  imports: [ViewPanel, MatFormField, ReactiveFormsModule, MatLabel, MatInput, MatSelect, MatOption, MatAnchor],
  template: `
    <div appViewPanel>
      <h2 class="text-xl font-semibold mb-6">Napiši recenziju</h2>
      <form [formGroup]="reviewForm" (ngSubmit)="saveReview()">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
          <mat-form-field>
            <mat-label>Naslov</mat-label>
            <input type="text" formControlName="title" placeholder="Kratak opis tvoje recenzije" matInput>
          </mat-form-field>
          <mat-form-field>
            <mat-select>
              @for(option of ratingOptions(); track option.value){
                <mat-option [value]="option.value">{{option.label}}</mat-option>
              }
            </mat-select>
          </mat-form-field>
          <mat-form-field class="col-span-2">
            <mat-label>Recenzija</mat-label>
            <textarea placeholder="Kaži drugima o svom iskustvu sa nama i ovim proizvodom" formControlName="comment" matInput type="text" rows="4"></textarea>
          </mat-form-field>
        </div>
        <div class="flex gap-4">
          <button matButton="filled" type="submit" [disabled]="store.loading()">
              {{store.loading() ? 'Ocenjujem' : 'Oceni'}}
          </button>
          <button matButton="outlined" type="button" (click)="store.hideWriteReview()">Odustani</button>
        </div>
      </form>
    </div>
  `,
  styles: `
    
  `,
})
export class WriteReview {
  store = inject(ToyStore)
  fb = inject(NonNullableFormBuilder)


  ratingOptions = signal<OptionItemModel[]>([
    { label: '5 zvezdica - Odlično', value: 5 },
    { label: '4 zvezdice - Jako dobro', value: 4 },
    { label: '3 zvezdice - Dobro', value: 3 },
    { label: '2 zvezdice - Loše', value: 2 },
    { label: '5 zvezdica - Jako loše', value: 1 },
  ])


  reviewForm = this.fb.group({
    title: ['', Validators.required],
    comment: ['', Validators.required],
    rating: [, Validators.required]
  })

  saveReview() { }
}
