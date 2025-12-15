import { Component, effect, inject } from '@angular/core';
import { WriteReview } from "../../pages/view-product-detail/write-review/write-review";
import { MatDialogRef } from '@angular/material/dialog';
import { ToyStore } from '../../store';

@Component({
  selector: 'app-write-review-dialog',
  imports: [WriteReview],
  template: `
    <app-write-review/>
  `,
  styles: ``,
})
export class WriteReviewDialog {
  private dialogRef = inject(MatDialogRef<WriteReviewDialog>);
  private store = inject(ToyStore);

  private initialized = false;

  constructor() {
    effect(() => {
      const isOpen = this.store.writeReview(); // ✅ OVO JE BITNO

      // preskoči prvo izvršavanje
      if (!this.initialized) {
        this.initialized = true;
        return;
      }

      if (!isOpen) {
        this.dialogRef.close();
      }
    });
  }
}
