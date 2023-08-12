import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from './product-module';  // import the Product model

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  // A method to get all products
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('https://yourserver.com/api/products');
  }

  // A method to get a specific product
  getProduct(id: string): Observable<Product> {
    return this.http.get<Product>(`https://yourserver.com/api/products/${id}`);
  }

  getRelatedProducts(){
    return this.http.get<Product[]>('https://yourserver.com/api/products');
  }  // More methods related to products can be added here

  getCartItems(){
    return this.http.get<Product[]>('https://yourserver.com/api/products');

  }
  removeFromCart(item: Product){
    return this.http.get<Product[]>('https://yourserver.com/api/products');

  }
}
