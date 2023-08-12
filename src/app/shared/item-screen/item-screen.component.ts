import { Component, OnDestroy, OnInit } from '@angular/core';
import { extendedProduct, Product, offer } from '../services/product-module';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { ApiCallsService } from '../services/api-calls.service';
import { Subscription } from 'rxjs';
import { CartServiceService } from '../services/cart-service.service';

@Component({
  selector: 'app-item-screen',
  templateUrl: './item-screen.component.html',
  styleUrls: ['./item-screen.component.css'],
})
export class ItemScreenComponent implements OnInit, OnDestroy {
  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private router: Router,
    private apiCaller: ApiCallsService,
    private cartService: CartServiceService
  ) {}
  private subscriptions = new Subscription();

  extendedProduct = new extendedProduct();
  product = new Product();
  offer = new offer();
  activeItem: any;
  relatedItems: any[] = [];
  _idParam: string = '';
  typeParam: string = '';

  relatedProducts: Product[] = [];

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: any) => {
      this._idParam = params['id'];
      this.typeParam = params['type'];
    });
    if (this.typeParam == 'Product') {
      this.apiCaller.getProduct(this._idParam, (data: any) => {
        this.extendedProduct = data;
        let _data = localStorage.getItem('cart');
        if (_data) {
          let tempcart = JSON.parse(_data);
          let index = tempcart.findIndex(
            (item: any) => item.id === this.extendedProduct.id
          );
          if (index !== -1) {
            this.product.addedToCart = true;
            this.product.quantityOrdered = tempcart[index].quantityOrdered;
          }
          this.activeItem = this.extendedProduct;
        } else {
          this.activeItem = this.extendedProduct;
        }
        console.log(this.activeItem);

        this.apiCaller.getByTypeAndBrand(
          'All Brands',
          this.extendedProduct.type,
          (_data: any) => {
            this.relatedItems = _data;
            console.log(this.relatedItems);
          }
        );
      });
    } else {
      this.apiCaller.getOffer(this._idParam, (data: any) => {
        console.log(data);
        this.offer = data;
        let _data = localStorage.getItem('cart');
        if (_data) {
          let tempcart = JSON.parse(_data);
          let index = tempcart.findIndex(
            (item: any) => item.id === this.extendedProduct.id
          );
          if (index !== -1) {
            this.product.addedToCart = true;
            this.product.quantityOrdered = tempcart[index].quantityOrdered;
          }
          this.activeItem = this.offer;
        } else {
          this.activeItem = this.offer;
        }
        console.log(this.activeItem);

        this.apiCaller.getOffers((_data: any) => {
          this.relatedItems = _data;
          console.log(this.relatedItems);
        });
      });
    }
  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
    this.apiCaller.unsubscribe();
  }
  addedToCart: boolean = false;

  addToCart() {
    this.activeItem.addedToCart = !this.activeItem.addedToCart;

    if (this.activeItem.addedToCart == true) {
      this.cartService.addItemToCart(this.activeItem);
    } else {
      this.cartService.removeItemFormCart(this.activeItem);
    }
  }

  goBack() {
    this.location.back();
  }

  decrementQuantity() {
    if (this.activeItem.quantityOrdered > 1) {
      this.cartService.removeItemFormCart(this.activeItem);
      this.activeItem.quantityOrdered--;
      this.cartService.addItemToCart(this.activeItem);
    }
  }

  incrementQuantity() {
    if (
      this.activeItem.quantityOrdered <= this.activeItem.quantity ||
      this.activeItem.typeof === 'Offer'
    ) {
      this.cartService.removeItemFormCart(this.activeItem);

      this.activeItem.quantityOrdered++;
      this.cartService.addItemToCart(this.activeItem);
    }
  }
  navigateToRoute(param: string) {
    window.scrollTo(0, 0);
    this.router.navigate([param]);
  }
}
