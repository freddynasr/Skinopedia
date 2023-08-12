import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product, offer } from 'src/app/shared/services/product-module';
import { ApiCallsService } from 'src/app/shared/services/api-calls.service';
import { AdminApiCallerService } from 'src/app/shared/services/admin-api-caller.service';
@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css'],
})
export class OffersComponent implements OnInit {
  constructor(
    private router: Router,
    private apiCaller: ApiCallsService,
    private adminApiCaller: AdminApiCallerService
  ) {}

  showModal: boolean = false;
  _id: string = '';
  AllOffers: offer[] = [];

  ngOnInit(): void {
    this.adminApiCaller.Offeroffset = 0;
    this.adminApiCaller.offers = [];
    this.adminApiCaller.getAdminOffers((data: any) => {
      this.AllOffers = data;
    });
  }

  navigateToRoute() {
    window.scrollTo(0, 0);
    this.router.navigate(['admin/dashboard/offer']);
  }

  editOffer(id: string) {
    this.router.navigate(['admin/dashboard/offer'], {
      queryParams: { id: id },
    });
  }

  openModal(_id: string) {
    this._id = _id;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  removeOffer(id: string) {
    this.adminApiCaller.deleteOffer(id, (data: any) => {
      this.AllOffers = this.AllOffers.filter(
        (item: offer) => item.id !== this._id
      );
    });
  }

  loadMore() {
    this.adminApiCaller.Offeroffset += 12;
    this.adminApiCaller.getAdminOffers((data: any) => {
      this.AllOffers = data;
    });
  }
}
