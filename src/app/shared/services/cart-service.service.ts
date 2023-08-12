import { Injectable } from '@angular/core';
import { Product } from './product-module';
import { ApiCallsService } from './api-calls.service';

@Injectable({
  providedIn: 'root',
})
export class CartServiceService {

  constructor(private apiCaller: ApiCallsService){}
  subtotal: number = 0;
  deliveryFee: number = 3;
  Total: number = 0;

  key = 'cart';



  addItemToCart(product: Product): void {

    let existingData = localStorage.getItem(this.key);
    if (existingData === null) {
      localStorage.setItem(this.key, JSON.stringify([product]));
    } else {
      let tempCart = JSON.parse(existingData);
      tempCart.push(product);
      localStorage.setItem(this.key, JSON.stringify(tempCart));
    }

    this.subtotal +=
      (product.discountPrice !== 0 ? product.discountPrice : product.price ) * product.quantityOrdered;
    this.deliveryFee = this.subtotal >= 50 ? 0 : 3;
    this.Total = (this.apiCaller.discountPercentage !== 0 ? (this.subtotal + this.deliveryFee)*(100-this.apiCaller.discountPercentage)/100: this.subtotal + this.deliveryFee);

  }
  removeItemFormCart(product: Product): void {
    let existingData = localStorage.getItem(this.key);

    if (existingData) {
      let tempCart = JSON.parse(existingData);
      let index = tempCart.findIndex((item: any) => item.id === product.id);
      tempCart.splice(index, 1);
      localStorage.setItem(this.key, JSON.stringify(tempCart));
    }
    this.subtotal -=
      (product.discountPrice !== 0 ? product.discountPrice : product.price)* product.quantityOrdered;
    this.deliveryFee = this.subtotal >= 50 ? 0 : 3;
    this.Total = (this.apiCaller.discountPercentage !== 0 ? (this.subtotal + this.deliveryFee)*(100-this.apiCaller.discountPercentage)/100: this.subtotal + this.deliveryFee);

  }
}
