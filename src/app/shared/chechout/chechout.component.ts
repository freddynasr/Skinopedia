import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiCallsService, Areas } from '../services/api-calls.service';
import { GoogleMapsService } from '../services/google-maps.service';
import { MatDialog } from '@angular/material/dialog';
import { TermsDialogComponent } from '../terms-dialog/terms-dialog.component';
import { DiscountDialogComponent } from '../discount-dialog/discount-dialog.component';
import { CartServiceService } from '../services/cart-service.service';
@Component({
  selector: 'app-checkout-form',
  templateUrl: './chechout.component.html',
  styleUrls: ['./chechout.component.css'],
})
export class ChechoutComponent implements OnInit {
  error: string = '';
  success: string = '';
  areas: Areas[] = [];
  chosenArea = '';

  checkoutForm: FormGroup = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    phoneNumber: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    gender: ['', Validators.required],
    deliveryMethod: ['delivery', Validators.required],
    buildingName: '',
    buildingFloor: null,
    acceptTerms: [false, Validators.requiredTrue],
    Directions: [],
  });

  constructor(
    private formBuilder: FormBuilder,
    public apiCaller: ApiCallsService,
    private googleMap: GoogleMapsService,
    public dialog: MatDialog,
    private cartService: CartServiceService
  ) {}

  ngOnInit(): void {
    let tempAreas = localStorage.getItem('Areas');
    if (tempAreas) {
      this.areas = JSON.parse(tempAreas);
      console.log(this.areas);
    } else {
      this.apiCaller.getAreas((data: any) => {
        this.areas = data;
      });
    }
  }

  onSubmit(): void {
    if (!this.checkoutForm.value.acceptTerms) {
      alert('You must agree to the terms and conditions');
      return;
    }
    this.showModal = !this.showModal;
    // Process checkout data here
  }

  openDiscountDialog(): void {
    if (this.apiCaller.discountCodeValidation === false) {
      const dialogRef = this.dialog.open(DiscountDialogComponent, {
        data: { discountCode: '' },
      });
    } else alert('Discount Code is already applied');
  }

  showModal: boolean = false;

  openTermsModal(): void {
    this.dialog.open(TermsDialogComponent);
  }

  sendOrder() {
    this.showModal = !this.showModal;
    if (this.checkoutForm.value.deliveryMethod === 'pickup') {
      if (
        this.checkoutForm.value.firstName !== '' &&
        this.checkoutForm.value.lastName !== '' &&
        this.checkoutForm.value.gender !== '' &&
        this.checkoutForm.value.phoneNumber !== '' &&
        this.checkoutForm.value.email !== ''
      ) {
        let cart = localStorage.getItem('cart');
        if (cart) {
          let tempProducts = JSON.parse(cart);
          let Products: any[] = [];
          tempProducts.forEach((element: any) => {
            let p: any = {
              id: element.id,
              quantity: element.quantityOrdered,
              type: element.typeof,
            };
            Products.push(p);
          });
          let order = {
            PickupLocation: 'Zgharta',
            ReceiverFirstName: this.checkoutForm.value.firstName,
            ReceiverLastName: this.checkoutForm.value.lastName,
            ReceiverEmail: this.checkoutForm.value.email,
            ReceiverPhone: this.checkoutForm.value.phoneNumber,
            Products: Products,
            ReceiverGender: this.checkoutForm.value.gender,
            Wakilni: false,
            DiscountCode: this.apiCaller.discountCode,
          };
          this.apiCaller.sendOrder(order, (data: any) => {
            this.success = 'The order was placed successfully';
            this.checkoutForm.reset();
          });
        } else {
          alert('Your Cart is Empty');
        }
      } else {
        alert('An Error Occured, Please Try Again');
        return;
      }
    } else if (this.checkoutForm.value.deliveryMethod === 'delivery') {
      if (
        this.checkoutForm.value.firstName !== '' &&
        this.checkoutForm.value.lastName !== '' &&
        this.checkoutForm.value.gender !== '' &&
        this.checkoutForm.value.phoneNumber !== '' &&
        this.checkoutForm.value.email !== '' &&
        this.checkoutForm.value.buildingName !== '' &&
        this.checkoutForm.value.buildingFloor !== '' &&
        this.checkoutForm.value.Directions !== '' &&
        this.googleMap.latitude !== null &&
        this.googleMap.longitude !== null &&
        this.chosenArea !== ''
      ) {
        let cart = localStorage.getItem('cart');
        if (cart) {
          let tempProducts = JSON.parse(cart);
          let Products: any[] = [];
          tempProducts.forEach((element: any) => {
            console.log(element);
            let p: any = {
              id: element.id,
              quantity: element.quantityOrdered,
              type: element.typeof,
            };
            Products.push(p);
          });
          let order = {
            ReceiverFirstName: this.checkoutForm.value.firstName,
            ReceiverLastName: this.checkoutForm.value.lastName,
            ReceiverEmail: this.checkoutForm.value.email,
            ReceiverPhone: this.checkoutForm.value.phoneNumber,
            Products: Products,
            ReceiverGender: this.checkoutForm.value.gender,
            ReceiverDirections: this.checkoutForm.value.Directions,
            ReceiverBuilding: this.checkoutForm.value.buildingName,
            ReceiverFloor: this.checkoutForm.value.buildingFloor,
            Area: this.chosenArea,
            ReceiverLatitude: this.googleMap.latitude,
            ReceiverLongitude: this.googleMap.longitude,
            Wakilni: true,
            DiscountCode: this.apiCaller.discountCode,
          };
          console.log(order);
          this.apiCaller.sendOrder(order, (data: any) => {
            this.success = 'The order was placed successfully';
            this.checkoutForm.reset();
          });
        } else {
          alert('Your Cart is Empty');
        }
      } else {
        this.error = 'Please Fill All The Fields';
        return;
      }
    } else {
      this.error = 'An Error Occured, Please Try Again';
    }
  }

  cancelOrder() {
    this.showModal = !this.showModal;
  }

  onChangeArea(e: Event) {
    this.chosenArea = (e.target as HTMLSelectElement).value;
  }
}
