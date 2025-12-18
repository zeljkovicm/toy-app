import { Component, inject, input, signal } from '@angular/core'
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'

import { MatFormField, MatLabel } from '@angular/material/form-field'
import { MatInput } from '@angular/material/input'
import { MatSelect, MatOption } from '@angular/material/select'
import { MatButton } from '@angular/material/button'

import { ViewPanel } from '../../../directives/view-panel'
import { OptionItemModel } from '../../../models/option-item-model'
import { ToyStore } from '../../../store'

@Component({
  selector: 'app-write-review',
  standalone: true,
  imports: [
    ViewPanel,
    ReactiveFormsModule,

    MatFormField,
    MatLabel,
    MatInput,
    MatSelect,
    MatOption,
    MatButton,
  ],
  template: `
    <!-- 👇 OBAVEZNO: stopPropagation NA ROOT -->
    <div appViewPanel (click)="$event.stopPropagation()">

      <h2 class="text-xl font-semibold mb-6">Napiši recenziju</h2>

      <form [formGroup]="reviewForm" (ngSubmit)="saveReview()">

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">

          <mat-form-field>
            <mat-label>Naslov</mat-label>
            <input matInput formControlName="title" />
          </mat-form-field>

          <mat-form-field>
            <mat-label>Ocena</mat-label>
            <mat-select
              formControlName="rating"
              (click)="$event.stopPropagation()"
            >
              @for (o of ratingOptions(); track o.value) {
                <mat-option [value]="o.value">{{ o.label }}</mat-option>
              }
            </mat-select>
          </mat-form-field>

          <mat-form-field class="col-span-2">
            <mat-label>Recenzija</mat-label>
            <textarea matInput rows="4" formControlName="comment"></textarea>
          </mat-form-field>

        </div>

        <div class="flex gap-4">

          <button
            matButton="filled"
            type="submit"
            [disabled]="store.loading()"
          >
            Oceni
          </button>

          <!-- 👇 OBAVEZNO: stopPropagation + stopReview -->
          <button
            matButton="outlined"
            type="button"
            (click)="$event.stopPropagation(); store.stopReview()"
          >
            Odustani
          </button>

        </div>
      </form>
    </div>
  `,
})
export class WriteReview {
  store = inject(ToyStore)
  fb = inject(NonNullableFormBuilder)

  toyId = input.required<number>()

  ratingOptions = signal<OptionItemModel[]>([
    { label: '5 – Odlično', value: 5 },
    { label: '4 – Jako dobro', value: 4 },
    { label: '3 – Dobro', value: 3 },
    { label: '2 – Loše', value: 2 },
    { label: '1 – Jako loše', value: 1 },
  ])

  reviewForm = this.fb.group({
    title: ['', Validators.required],
    rating: [null as number | null, Validators.required],
    comment: ['', Validators.required],
  })

  saveReview() {
    if (this.reviewForm.invalid) return

    this.store.createReview({
      toyId: this.toyId(),
      title: this.reviewForm.value.title!,
      rating: this.reviewForm.value.rating!,
      comment: this.reviewForm.value.comment!,
    })

    // 👇 KLJUČNO
    this.store.stopReview()
  }
}
