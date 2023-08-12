import { Component, OnInit } from '@angular/core';
import { AdminApiCallerService } from 'src/app/shared/services/admin-api-caller.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})
export class OrderComponent implements OnInit {
  orders: any = [];
  selectedOrder: any;
  locationsAvailable: boolean = false;
  Locations: any = [];
  selectedLocation: any = {
    BulkArea: 'zgharta',
    BulkFloor: 1,
    BulkLatitude: 34.543,
    BulkLongitude: 35.543,
  };
  activeLocationIndex: number = -1;
  wakilni: boolean = false;
  reason: string = '';

  constructor(private adminApiCaller: AdminApiCallerService) {}

  ngOnInit(): void {
    let tempLocations = localStorage.getItem('location');
    if (tempLocations) {
      this.Locations = JSON.parse(tempLocations);
      this.locationsAvailable = true;
    }

    this.adminApiCaller.getAllOrders((data: any) => {
      this.orders = data;
      this.orders.reverse();
      console.log(this.orders);
      this.orders.forEach((e: any) => {
        e.Products.forEach((p: any) => {
          if (p.type === 'Offer') {
            p.remainingQuantity = p.products[0].remainingquantity;
            p.products.forEach((x: any) => {
              if (x.remainingquantity < p.remainingQuantity) {
                p.remainingQuantity = x.remainingquantity;
              }
            });
          }
        });
      });
    });
  }

  title: string = '';
  showModal: boolean = false;
  id = '';
  closeModal(): void {
    this.showModal = false;
  }
  ConfirmOrder(x: string, id: string, wakilni: boolean) {
    alert('Order Confirmed');
    switch (x) {
      case 'cancel':
        this.showModal = false;
        this.adminApiCaller.confirmOrder(id, false, null, (data: any) => {
          console.log(data);
          let index = this.orders.findIndex((x: any) => x._id === id);
          this.orders[index].Confirmed = true;
          this.orders[index].Accepted = false;
        });
        break;
      case 'confirm':
        let location = null;
        if (wakilni) {
          location = this.selectedLocation;
        }
        this.showModal = false;
        this.adminApiCaller.confirmOrder(id, true, location, (data: any) => {
          console.log(data);
          let index = this.orders.findIndex((x: any) => x._id === id);
          this.orders[index].Confirmed = true;
          this.orders[index].Accepted = true;
          console.log(this.orders[index]);
        });
        break;
    }
  }

  removeOrder(id: string) {
    if (confirm('Are you sure you want to delete this order?')) {
      this.adminApiCaller.removeOrder(id, (data: any) => {
        console.log(data);
        let index = this.orders.findIndex((x: any) => x._id === id);
        this.orders.splice(index, 1);
      });
    }
  }

  confirm: string = 'Confirm';

  openModal(id: string, x: string, wakilni: boolean = false): void {
    this.id = id;
    this.wakilni = wakilni;
    switch (x) {
      case 'cancel':
        this.title = 'Cancel the Order';
        this.confirm = 'cancel';
        break;
      case 'confirm':
        this.title = 'Confirm the Order';
        this.confirm = 'confirm';
        break;
    }
    this.showModal = true;
  }

  ChooseLocation(i: number) {
    this.activeLocationIndex = i;
    console.log(this.Locations[i]);
    this.selectedLocation.BulkArea = this.Locations[i].area;
    this.selectedLocation.BulkFloor = this.Locations[i].floor;
    this.selectedLocation.BulkLatitude = this.Locations[i].latitude;
    this.selectedLocation.BulkLongitude = this.Locations[i].longitude;
    console.log(this.selectedLocation);
  }

  assign(id: string) {
    this.id = id;
  }
}
