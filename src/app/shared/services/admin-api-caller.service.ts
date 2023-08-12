import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  Message,
  Chat,
  Product,
  offer,
  extendedProduct,
} from '../services/product-module';
@Injectable({
  providedIn: 'root',
})
export class AdminApiCallerService {
  constructor(private http: HttpClient) {}

  authKey = '';
  chats: Chat[] = [];
  Messages: Message[] = [];

  Products: Product[] = [];
  offers: offer[] = [];
  searchResult: Product[] = [];

  slideImags: any[] = [];

  ProductOffset = 0;
  Offeroffset = 0;
  searchoffset = 0;

  baseUrl = 'https://api.skinopedia-lb.com/admin';
  baseUrl1 = 'https://api.skinopedia-lb.com';

  getAdminProducts(filldata: any) {
    this.http
      .get(`${this.baseUrl}/GetProducts?offset=${this.ProductOffset}`)
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
          p.active = product.Active;
          this.Products.push(p);
        });
        if (filldata != null) {
          filldata(this.Products);
        }
      });
  }

  addProduct(product: any, filldata: any) {
    this.http.post(this.baseUrl + '/AddProduct', product).subscribe((data) => {
      if (filldata != null) {
        filldata(data);
      }
    });
  }

  removeProduct(id: string, filldata: any) {
    this.http
      .delete(this.baseUrl + '/DeleteProduct?id=' + id)
      .subscribe((data: any) => {
        if (filldata != null) {
          filldata(data);
        }
      });
  }

  updateProduct(id: any, product: any, filldata: any) {
    this.http
      .put(this.baseUrl + '/UpdateProduct?id=' + id, product)
      .subscribe((data: any) => {
        if (filldata != null) {
          filldata(data);
        }
      });
  }

  addSlideImage(image: any, filldata: any) {
    this.http
      .post(this.baseUrl + '/AddSlideshowPicture', image)
      .subscribe((data: any) => {
        if (filldata != null) {
          filldata(data);
        }
      });
  }

  updateSlideImages(images: any, filldata: any) {
    console.log(images);
    this.http
      .put(this.baseUrl + '/UpdateSlideshow', images)
      .subscribe((data: any) => {
        if (filldata != null) {
          filldata(data);
        }
      });
  }

  deleteSlideImage(id: string, filldata: any) {
    this.http
      .delete(this.baseUrl + '/DeleteSlideshowPicture?id=' + id)
      .subscribe((data: any) => {
        if (filldata != null) {
          filldata(data);
        }
      });
  }

  getAdminOffers(filldata: any) {
    this.http
      .get(this.baseUrl + '/GetOffers?offset=' + this.Offeroffset)
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
          o.active = item.Active;
          this.offers.push(o);
        });
        if (filldata != null) {
          filldata(this.offers);
        }
      });
  }

  addOffer(offer: any, filldata: any) {
    this.http.post(this.baseUrl + '/AddOffer', offer).subscribe((data: any) => {
      if (filldata != null) {
        filldata(data);
      }
    });
  }

  deleteOffer(id: string, filldata: any) {
    this.http
      .delete(this.baseUrl + '/DeleteOffer?id=' + id)
      .subscribe((data: any) => {
        if (filldata != null) {
          filldata(data);
        }
      });
  }

  updateOffer(id: string, offer: any, filldata: any) {
    this.http
      .put(this.baseUrl + '/UpdateOffer?id=' + id, offer)
      .subscribe((data: any) => {
        if (filldata != null) {
          filldata(data);
        }
      });
  }

  confirmOrder(id: string, accepted: boolean, bulk: any, filldata: any) {
    this.http
      .post(
        this.baseUrl + '/ConfirmOrder?OrderID=' + id + '&Accepted=' + accepted,
        bulk
      )
      .subscribe((data: any) => {
        if (filldata != null) {
          filldata(data);
        }
      });
  }

  removeOrder(id: string, filldata: any) {
    this.http
      .delete(this.baseUrl + '/DeleteOrder?OrderID=' + id)
      .subscribe((data: any) => {
        if (filldata != null) {
          filldata(data);
        }
      });
  }

  getAllOrders(filldata: any) {
    this.http.get(this.baseUrl + '/GetAllOrders').subscribe((data: any) => {
      if (filldata != null) {
        filldata(data);
      }
    });
  }

  addDiscountCode(code: any, filldata: any) {
    this.http
      .post(this.baseUrl + '/AddDiscountCode', code)
      .subscribe((data: any) => {
        if (filldata != null) {
          filldata(data);
        }
      });
  }

  // updateDiscountCode(code: any, filldata: any) {
  //   this.http
  //     .put(this.baseUrl + '/UpdateDiscountCode', code)
  //     .subscribe((data: any) => {
  //       console.log(data);
  //     });
  // }

  deleteDiscountCode(id: string, filldata: any) {
    this.http
      .delete(this.baseUrl + '/DeleteDiscountCode?DiscountCode=' + id)
      .subscribe((data: any) => {
        if (filldata != null) {
          filldata(data);
        }
      });
  }

  getDiscountCodes(filldata: any) {
    this.http.get(this.baseUrl + '/GetDiscountCodes').subscribe((data: any) => {
      if (filldata != null) {
        filldata(data);
      }
    });
  }

  getChats(filldata: any) {
    this.chats = [];
    this.http.get(`${this.baseUrl}/GetChats`).subscribe((data: any) => {
      data.forEach((element: any) => {
        let c = new Chat();
        c._id = element._id;
        c.IdUser = element.IdUser;
        c.Messages = [];
        c.Name = element.FullName;
        c.lastMessage.message = element.LastMessage?.Text || '';
        c.lastMessage.date = element.LastMessage?.DateCreated || '';

        this.chats.push(c);
      });
      if (filldata != null) {
        filldata(this.chats);
      }
    });
  }

  getMessages(_id: string, filldata: any) {
    this.Messages = [];
    this.http
      .get(this.baseUrl1 + '/chats/Getchat?id=' + _id)
      .subscribe((data: any) => {
        data.Messages.forEach((element: any) => {
          let m = new Message();
          m.message = element.Text;
          m.date = element.DateCreated;
          m.type = element.IdUser === 1 ? 'sent' : 'received';
          this.Messages.push(m);
        });
        if (filldata != null) {
          filldata(this.Messages);
        }
      });
  }

  searchProducts(search: string, filldata: any) {
    this.http
      .get(
        `${this.baseUrl}/GetSearchResults?word=${search}&offset=${this.searchoffset}`
      )
      .subscribe((data: any) => {
        this.searchoffset += 24;
        data.forEach((product: any) => {
          let p = new Product();
          if (product) {
            p.name = product.Name;
            p.brand = product.Brand;
            p.price = product.Price;
            p.discountPrice = product.DiscountPrice;
            p.imageUrl = product.Image;
            p.id = product._id;
            p.quantity = product.Quantity;
            this.searchResult.push(p);
          }
        });
        if (filldata != null) {
          filldata(this.searchResult);
        }
      });
  }

  getTypes(filldata: any) {
    this.http
      .get(this.baseUrl1 + '/products/GetTypesSubtypes')
      .subscribe((data: any) => {
        if (filldata != null) {
          filldata(data);
        }
      });
  }

  addType(type: any, filldata: any) {
    this.http
      .post(this.baseUrl + '/InsertType', type)
      .subscribe((data: any) => {
        if (filldata != null) {
          filldata(data);
        }
      });
  }

  addSubType(subtype: any, filldata: any) {
    this.http
      .post(this.baseUrl + '/InsertSubType', subtype)
      .subscribe((data: any) => {
        if (filldata != null) {
          filldata(data);
        }
      });
  }

  removeType(id: string, filldata: any) {
    this.http
      .delete(this.baseUrl + '/DeleteType?id=' + id)
      .subscribe((data: any) => {
        if (filldata != null) {
          filldata(data);
        }
      });
  }

  removeSubType(id: string, Type: string, filldata: any) {
    this.http
      .delete(this.baseUrl + '/DeleteSubType?id=' + id + '&Type=' + Type)
      .subscribe((data: any) => {
        if (filldata != null) {
          filldata(data);
        }
      });
  }
}
