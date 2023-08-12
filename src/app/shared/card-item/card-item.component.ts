import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../services/product-module';
import { CartServiceService } from '../services/cart-service.service';
@Component({
  selector: 'app-card-item',
  templateUrl: './card-item.component.html',
  styleUrls: ['./card-item.component.css'],
})
export class CardItemComponent {
  constructor(
    private router: Router,
    private cartService: CartServiceService
  ) {}
  key = 'cart';

  quantityOrdered: number = 1;
  @Input() admin = false;
  @Input() product: any;
  @Input() offer: boolean = false;
  @Input() edit: boolean = false;
  addToCart() {
    this.product.addedToCart = !this.product.addedToCart;
    if (this.product.addedToCart == true) {
      this.addItemToCart();
    } else {
      this.removeItemFormCart();
    }
  }

  navigateToRoute(param: string, _id: string) {
    if (this.admin) {
      if (this.offer) {
        window.scrollTo(0, 0);
        this.router.navigate(['admin/dashboard/offer'], {
          queryParams: { id: _id },
        });
      } else {
        window.scrollTo(0, 0);
        this.router.navigate(['admin/dashboard/Product'], {
          queryParams: { id: _id },
        });
      }
    } else {
      window.scrollTo(0, 0);
      this.router.navigate([param], {
        queryParams: { type: this.product.typeof, id: _id },
      });
    }
  }

  addItemToCart(): void {
    this.cartService.addItemToCart(this.product);
  }
  removeItemFormCart(): void {
    this.cartService.removeItemFormCart(this.product);
  }

  decrementQuantity() {
    if (this.edit) {
      if (this.product.quantityOrdered <= this.product.quantity) {
        this.product.quantityOrdered--;
      }
    } else if (this.product.quantityOrdered > 1) {
      this.removeItemFormCart();
      this.product.quantityOrdered--;
      this.addItemToCart();
    }
  }
  incrementQuantity() {
    if (this.edit) {
      if (this.product.quantityOrdered <= this.product.quantity) {
        this.product.quantityOrdered++;
      }
    } else if (
      this.product.typeof === 'Offer' ||
      this.product.quantityOrdered <= this.product.quantity
    ) {
      this.removeItemFormCart();
      this.product.quantityOrdered++;
      this.addItemToCart();
    }
  }
}
