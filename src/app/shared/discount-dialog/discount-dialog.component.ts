import { MatDialogRef } from '@angular/material/dialog';
import { Component } from '@angular/core';
import { ApiCallsService } from '../services/api-calls.service';
import { CartServiceService } from '../services/cart-service.service';
@Component({
  selector: 'app-discount-dialog',
  templateUrl: './discount-dialog.component.html',
  styleUrls: ['./discount-dialog.component.css'],
})
export class DiscountDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DiscountDialogComponent>,
    private apiCaller: ApiCallsService,
    public cartService: CartServiceService
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  discountCode: string = '';
  validation: boolean = false;

  validateDiscountCode() {
    this.apiCaller.checkDiscountCode(this.discountCode, (data: any) => {
      this.validation = data;
      this.cartService.Total =
        (this.cartService.Total * (100 - this.apiCaller.discountPercentage)) /
        100;
    });

    this.dialogRef.close();
  }
}
