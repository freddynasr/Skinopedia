import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subscription } from 'rxjs';
import {
  Product,
  extendedProduct,
  Message,
  offer,
  Image,
  Types,
} from './product-module';

import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiCallsService {
  private subscription = new Subscription();
  constructor(private http: HttpClient) {}

  unsubscribe(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  Search: string = '';
  offset: number = 0;

  cardProducts: Product[] = [];
  slideImages: Image[] = [];
  newProducts: Product[] = [];
  Products: Product[] = [];
  discAndOffersProducts: Product[] = [];
  offers: offer[] = [];
  Types: Types[] = [];

  Ids: string[] = [];
  searchIds: string[] = [];
  newProdIds: string[] = [];
  discAndOffersIds: string[] = [];
  offersIds: string[] = [];

  searchResult: Product[] = [];
  areas: Areas[] = [];
  match: boolean = false;

  discountCodeValidation: boolean = false;
  discountCode: string = '';
  discountPercentage: number = 0;
  discountcheck: boolean = false;

  Messages: Message[] = [];

  baseUrl = 'https://api.skinopedia-lb.com';
  url: string = this.baseUrl;
  url2 = 'https://api.wakilni.com/api/v2/areas';

  headers = new HttpHeaders({
    'Content-Type': 'text/plain',
    // 'Authorization': 'Bearer YOUR_ACCESS_TOKEN',
  });
  headers2 = new HttpHeaders({
    'Content-type': 'application/json',
  });

  getProducts(filldata: any) {
    this.http
      .post(`${this.baseUrl}/products/GetUserProducts`, this.Ids, {
        headers: this.headers,
      })
      .subscribe((data: any) => {
        data.forEach((product: any) => {
          let p = new Product();
          p.name = product.Name;
          p.brand = product.Brand;
          p.price = product.Price;
          p.discountPrice = product.DiscountPrice;
          p.imageUrl = product.Image;
          p.id = product._id;
          p.quantity = product.Quantity;
          p.typeof = 'Product';
          this.Products.push(p);
          this.Ids.push(product._id.toString());
          p.addedToCart = this.checkIfInCart(p);
        });
        if (filldata != null) {
          filldata(this.Products);
        }
      });
  }

  getProduct(id: any, filldata: any) {
    this.http
      .get(`${this.baseUrl}/products/GetProductById?id=${id}`)
      .subscribe((product: any) => {
        let oneProduct = new extendedProduct();
        oneProduct.name = product.Name;
        oneProduct.brand = product.Brand;
        oneProduct.price = product.Price;
        oneProduct.discountPrice = product.DiscountPrice;
        oneProduct.imageUrl = product.Image;
        oneProduct.id = product._id;
        oneProduct.quantity = product.Quantity;
        oneProduct.description = product.Desc;
        oneProduct.type = product.TypeName;
        oneProduct.new = product.New;
        oneProduct.active = product.Active;
        oneProduct.typeId = product.TypeID;
        oneProduct.subtype = product.SubTypeName;
        oneProduct.subtypeId = product.SubType;
        oneProduct.typeof = 'Product';

        oneProduct.addedToCart = this.checkIfInCart(oneProduct);

        if (filldata != null) {
          filldata(oneProduct);
        }
      });
  }

  getByTypeAndBrand(brand: string, type: string, filldata: any) {
    if (brand !== 'All Brands' && type !== 'All Types') {
      this.url += `/products/GetProductsBy?param=BrandAndType&brand=${brand}&type=${type}`;
    } else if (brand === 'All Brands') {
      this.url += `/products/GetProductsBy?param=Type&&type=${type}`;
    } else if (type === 'All Types') {
      this.url += `/products/GetProductsBy?param=Brand&brand=${brand}`;
    } else {
      this.url += `/products/GetProducts`;
    }
    this.http
      .post(this.url, [], {
        headers: this.headers,
      })
      .subscribe((data: any) => {
        data.forEach((product: any) => {
          let p = new Product();
          p.name = product.Name;
          p.brand = product.Brand;
          p.price = product.Price;
          p.discountPrice = product.DiscountPrice;
          p.imageUrl = product.Image;
          p.id = product._id;
          p.quantity = product.Quantity;
          p.typeof = 'Product';

          this.cardProducts.push(p);
          p.addedToCart = this.checkIfInCart(p);
        });
        if (filldata != null) {
          filldata(this.cardProducts);
        }
      });
  }

  getNewProduct(filldata: any) {
    this.http
      .post(
        `${this.baseUrl}/products/GetProductsBy?param=New`,
        this.newProdIds,
        {
          headers: this.headers,
        }
      )
      .subscribe((data: any) => {
        data.forEach((product: any) => {
          let p = new Product();
          p.name = product.Name;
          p.brand = product.Brand;
          p.price = product.Price;
          p.discountPrice = product.DiscountPrice;
          p.imageUrl = product.Image;
          p.id = product._id;
          p.quantity = product.Quantity;
          p.typeof = 'Product';

          this.newProducts.push(p);
          this.newProdIds.push(p.id);
          p.addedToCart = this.checkIfInCart(p);
        });
        if (filldata != null) {
          filldata(this.newProducts);
        }
      });
  }

  getOffersAndDiscProduct(filldata: any) {
    this.http
      .post(
        `${this.baseUrl}/products/GetProductsBy?param=Discount`,
        this.discAndOffersIds,
        {
          headers: this.headers,
        }
      )
      .subscribe((data: any) => {
        data.forEach((product: any) => {
          let p = new Product();
          p.name = product.Name;
          p.brand = product.Brand;
          p.price = product.Price;
          p.discountPrice = product.DiscountPrice;
          p.imageUrl = product.Image;
          p.id = product._id;
          p.quantity = product.Quantity;
          p.typeof = 'Product';

          this.discAndOffersProducts.push(p);
          this.discAndOffersIds.push(p.id);
          p.addedToCart = this.checkIfInCart(p);
        });
        if (filldata != null) {
          filldata(this.discAndOffersProducts);
        }
      });
  }

  getSlideImages(filldata: any) {
    this.slideImages = [];
    this.http
      .get(`${this.baseUrl}/slideshow/GetSlideshow`)
      .subscribe((data: any) => {
        data.forEach((item: any) => {
          let I = new Image();
          I.Image = item.Image;
          I.Order = item.Order;
          I.id = item._id;
          this.slideImages.push(I);
        });
        if (filldata != null) {
          filldata(this.slideImages);
        }
      });
  }

  getSearch(search: string, filldata: any) {
    this.http
      .get(
        `${this.baseUrl}/search/getsearchresults?word=${search}&offset=${this.offset}`
      )
      .subscribe((data: any) => {
        this.offset += 24;
        this.match = false;
        data.forEach((product: any) => {
          let p = new Product();
          if (product) {
            this.match = true;
            p.name = product.Name;
            p.brand = product.Brand;
            p.price = product.Price;
            p.discountPrice = product.DiscountPrice;
            p.imageUrl = product.Image;
            p.id = product._id;
            p.quantity = product.Quantity;
            p.typeof = 'Product';

            this.searchIds.push(p.id);
            this.searchResult.push(p);
            p.addedToCart = this.checkIfInCart(p);
          }
        });
        if (filldata != null) {
          filldata(this.searchResult);
        }
      });
  }

  checkIfInCart(p: any): boolean {
    let data = localStorage.getItem('cart');
    if (data) {
      let tempcart = JSON.parse(data);
      let index = tempcart.findIndex((item: any) => item.id === p.id);

      // If index is not -1, then the product is in the cart
      if (index !== -1) {
        return true;
      }
    }
    // If we reach this point, then the product is not in the cart
    return false;
  }

  getAreas(filldata: any) {
    this.areas = [];
    this.http.get(this.url2).subscribe((data: any) => {
      data.data.forEach((area: any) => {
        let a = new Areas(); // Initialize 'a' to an empty object
        a.id = area.id; // Change from 'area.data.id' to 'area.id'
        a.name = area.name; // Change from 'area.data.name' to 'area.name'
        this.areas.push(a);
      });
      this.areas.sort((a, b) => a.name.localeCompare(b.name));
      if (filldata != null) {
        filldata(this.areas);
      }
      localStorage.setItem('Areas', JSON.stringify(this.areas));
    });
  }

  sendOrder(order: any, filldata: any) {
    console.log(order);
    this.http
      .post(`${this.baseUrl}/orders/AddOrder`, order, {
        headers: this.headers2,
      })
      .subscribe((Response) => {
        if (filldata != null) {
          filldata();
        }
      });
  }

  checkDiscountCode(code: string, filldata: any) {
    this.discountcheck = true;
    this.discountCodeValidation = false;
    this.http
      .get(
        `${this.baseUrl}/DiscountCodes/CheckDiscountCode?DiscountCode=${code}`
      )
      .pipe(
        catchError((err: any) => {
          console.error(err);
          alert('Invalid Discount Code');
          this.discountcheck = false;
          return throwError(err);
        })
      )
      .subscribe((data: any) => {
        console.log(data);
        if (data.DiscountPercentage && data.DiscountID) {
          this.discountCodeValidation = true;
          this.discountPercentage = data.DiscountPercentage;
          this.discountCode = code;
          this.discountcheck = false;
          if (filldata != null) {
            filldata(this.discountCodeValidation);
          }
        }
        alert(
          this.discountCodeValidation
            ? 'Discount code applied successfully!'
            : 'Invalid Discount Code'
        );
      });
  }

  startChat(name: string, filldata: any) {
    let body: any = {
      FullName: name,
    };
    this.http
      .post(`${this.baseUrl}/chats/StartChat`, body, { headers: this.headers2 })
      .subscribe((data: any) => {
        localStorage.setItem('name', JSON.stringify(data));

        if (filldata !== null) {
          filldata();
        }
      });
  }

  getMessages(_id: string, filldata: any) {
    this.Messages = [];
    this.http
      .get(this.baseUrl + '/chats/Getchat?id=' + _id)
      .subscribe((data: any) => {
        data.Messages.forEach((element: any) => {
          let m = new Message();

          m.message = element.Text;
          m.date = element.DateCreated;
          m.type = element.IdUser !== 1 ? 'sent' : 'received';
          this.Messages.push(m);
        });
        if (filldata != null) {
          filldata(this.Messages);
        }
      });
  }

  getOffers(filldata: any) {
    this.http
      .post(`${this.baseUrl}/offers/GetOffers`, this.offersIds, {
        headers: this.headers,
      })
      .subscribe((data: any) => {
        data.forEach((item: any) => {
          let o = new offer();
          o.id = item._id;
          o.name = item.Name;
          o.price = item.Price;
          o.discountPrice = item.DiscountPrice;
          o.imageUrl = item.Image;
          o.quantity = item.Quantity || 0;
          o.ProductNames = item.Brand;
          o.typeof = 'Offer';
          o.addedToCart = this.checkIfInCart(o);
          this.offersIds.push(o.id);
          this.offers.push(o);
        });
        if (filldata != null) {
          filldata(this.offers);
        }
      });
  }

  getOffer(id: string, filldata: any) {
    this.http
      .get(`${this.baseUrl}/offers/GetOffer?id=${id}`)
      .subscribe((data: any) => {
        let o = new offer();
        o.id = data._id;
        o.name = data.Name;
        o.price = data.Price;
        o.discountPrice = data.DiscountPrice;
        o.imageUrl = data.Image;
        o.quantity = data.Quantity;
        o.description = data.Desc;
        o.active = data.Active;
        o.typeof = 'Offer';
        o.addedToCart = this.checkIfInCart(o);
        data.Products.forEach((product: any) => {
          let p = new Product();
          p.name = product.Name;
          p.brand = product.Brand;
          p.price = product.Price;
          p.discountPrice = product.DiscountPrice;
          p.imageUrl = product.Image;
          p.id = product._id;
          p.quantity = product.Quantity;
          p.checked = true;
          o.Products.push(p);
          o.ProductNames.push(p.name);
        });
        if (filldata != null) {
          filldata(o);
        }
      });
  }

  getTypesandSybtypes(filldata: any) {
    this.http
      .get(`${this.baseUrl}/products/GetTypesSubTypes`)
      .subscribe((data: any) => {
        this.Types = data;
        if (filldata !== null) {
          filldata(this.Types);
        }
      });
  }
}

export class Areas {
  id: number = 0;
  name: string = '';
}
