import { Injectable } from '@angular/core';
import { Product } from './product-module';

@Injectable({
  providedIn: 'root'
})
export class AddToCartService {

  key = 'cart';

  constructor() { }

  addItemToCart(product:Product): void {
    let existingData = localStorage.getItem(this.key);
    if (existingData === null) {
      localStorage.setItem(this.key, JSON.stringify([product]));
    } else {
      let tempCart = JSON.parse(existingData);
      tempCart.push(product);
      localStorage.setItem(this.key, JSON.stringify(tempCart));
    }
  }
  removeItemFormCart(product:Product): void {
    let existingData = localStorage.getItem(this.key);

    if (existingData) {
      let tempCart = JSON.parse(existingData);
      let index = tempCart.findIndex((item: any) => item.id === product.id);
      tempCart.splice(index, 1)
      localStorage.setItem(this.key, JSON.stringify(tempCart));
    }
  }
  decrementQuantity(product: Product) {
    if (product.quantityOrdered > 1) {
      product.quantityOrdered--;
      this.removeItemFormCart(product);
      this.addItemToCart(product);
    }
  }
  incrementQuantity(product: Product) {
    product.quantityOrdered++;
    this.removeItemFormCart(product)
    this.addItemToCart(product)
  }
}
