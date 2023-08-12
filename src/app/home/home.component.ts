import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ApiCallsService } from '../shared/services/api-calls.service';
import { Product, offer } from '../shared/services/product-module';

interface DropdownItem {
  text: string;
  route: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  newProducts: Product[] = [];
  discProducts: Product[] = [];
  products: Product[] = [];
  offers: offer[] = [];
  Types: any = [];
  constructor(public apiCaller: ApiCallsService) {}
  ngOnInit(): void {
    this.newProducts = [];
    this.discProducts = [];
    this.products = [];
    this.offers = [];
    this.apiCaller.getNewProduct((data: any) => {
      this.newProducts = data;
    });
    this.apiCaller.getProducts((data: any) => {
      this.products = data;
    });
    this.apiCaller.getOffersAndDiscProduct((data: any) => {
      this.discProducts = data;
    });
    this.apiCaller.getOffers((data: any) => {
      this.offers = data;
    });
    this.apiCaller.getTypesandSybtypes((data: any) => {
      this.Types = data;
      this.dropDown[2].sections = this.Types;
      console.log(this.dropDown);
    });
  }

  ngOnDestroy(): void {
    this.apiCaller.unsubscribe();
  }

  scrollToElement(elementId: string): void {
    const element = document.getElementById(elementId);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  }

  dropDown: any = [
    {
      dropName: 'New Arrivals',
      sections: [
        {
          secName: 'section 1',
          subSections: ['sub 1', 'sub 2', 'sub 3', 'sub 4', 'sub 5'],
        },
        {
          secName: 'section',
          subSections: ['sub 1', 'sub 2', 'sub 3', 'sub 4', 'sub 5'],
        },
        {
          secName: 'section',
          subSections: ['sub 1', 'sub 2', 'sub 3', 'sub 4', 'sub 5'],
        },
        {
          secName: 'section',
          subSections: ['sub 1', 'sub 2', 'sub 3', 'sub 4', 'sub 5'],
        },
      ],
    },
    {
      dropName: 'Offers',
      sections: [
        {
          secName: 'section 2',
          subSections: ['sub 1', 'sub 2', 'sub 3', 'sub 4', 'sub 5'],
        },
        {
          secName: 'section',
          subSections: ['sub 1', 'sub 2', 'sub 3', 'sub 4', 'sub 5'],
        },
        {
          secName: 'section',
          subSections: ['sub 1', 'sub 2', 'sub 3', 'sub 4', 'sub 5'],
        },
        {
          secName: 'section',
          subSections: ['sub 1', 'sub 2', 'sub 3', 'sub 4', 'sub 5'],
        },
      ],
    },
    {
      dropName: 'All Products',
      sections: [
        {
          secName: 'section 3',
          subSections: ['sub 1', 'sub 2', 'sub 3', 'sub 4', 'sub 5'],
        },
        {
          secName: 'section',
          subSections: ['sub 1', 'sub 2', 'sub 3', 'sub 4', 'sub 5'],
        },
        {
          secName: 'section',
          subSections: ['sub 1', 'sub 2', 'sub 3', 'sub 4', 'sub 5'],
        },
        {
          secName: 'section',
          subSections: ['sub 1', 'sub 2', 'sub 3', 'sub 4', 'sub 5'],
        },
      ],
    },
  ];

  loadMore(typeOfProduct: string): void {
    switch (typeOfProduct) {
      case 'new':
        this.apiCaller.getNewProduct((data: any) => {
          this.newProducts = data;
        });
        break;
      case 'discount':
        this.apiCaller.getOffersAndDiscProduct((data: any) => {
          this.discProducts = data;
        });
        break;
      case 'allproduct':
        this.apiCaller.getProducts((data: any) => {
          this.products = data;
        });
        break;
      case 'offers':
        this.apiCaller.getOffers((data: any) => {
          this.offers = data;
        });
        break;
    }
  }
}
