export class Product {
  id: string = '';
  name: string = '';
  price: number = 0;
  brand: string = '';
  discountPrice: number = 0;
  imageUrl: string = '';
  quantity: number = 0;
  quantityOrdered: number = 1;
  addedToCart: boolean = false;
  active?: boolean;
  new?: boolean;
  checked: boolean = false;
  typeof: string = '';
}

export class extendedProduct extends Product {
  description: string = '';
  type: string = '';
  typeId: string = '';
  subtype: string = '';
  subtypeId: string = '';
}

export class Message {
  message: string = '';
  date: any;
  user: string = '';
  type: string = '';
}

export class Chat {
  _id: string = '';
  IdUser: number = 0;
  Messages: Message[] = [];
  Name: string = '';
  lastMessage = new Message();
}

export class offer {
  id: string = '';
  name: string = '';
  price: number = 0;
  ProductNames: string[] = [];
  discountPrice: number = 0;
  imageUrl: string = '';
  quantity: number = 0;
  quantityOrdered: number = 1;
  addedToCart: boolean = false;
  description: string = '';
  Products: Product[] = [];
  active?: boolean;
  typeof: string = '';
}

export class Image {
  Image: string = '';
  Order: number = 0;
  id?: string;
}

export class Types {
  _id: string = '';
  Name: string = '';
  SubTypes: any[] = [];
}
