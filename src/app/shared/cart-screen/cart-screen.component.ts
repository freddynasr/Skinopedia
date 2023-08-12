import { Component, OnInit } from '@angular/core';
import { Product } from '../services/product-module';
import { Router } from '@angular/router';
import { CartServiceService } from '../services/cart-service.service';
import { ApiCallsService } from '../services/api-calls.service';
@Component({
  selector: 'app-cart-screen',
  templateUrl: './cart-screen.component.html',
  styleUrls: ['./cart-screen.component.css'],
})
export class CartScreenComponent implements OnInit {
  cartItems: Product[] = [];
  key: string = 'cart';
  cart: boolean = true;
  constructor(private router: Router, public cartService: CartServiceService , public apiCaller : ApiCallsService) {}

  ngOnInit(): void {
    let data = localStorage.getItem(this.key);
    if (data) {
      this.cartService.subtotal = 0;
      this.cartItems = JSON.parse(data);
      this.cartItems.forEach((Product) => {
        this.cartService.subtotal +=
          (Product.discountPrice !== 0 ? Product.discountPrice : Product.price)*Product.quantityOrdered;
      });
      this.cartService.deliveryFee =
        this.cartService.subtotal >= 50 ? 0 : 3;
      this.cartService.Total =
        this.cartService.subtotal + this.cartService.deliveryFee;
    }
  }


}
