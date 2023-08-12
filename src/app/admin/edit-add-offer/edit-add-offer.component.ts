import { Component, OnInit } from '@angular/core';
import { offer, Product } from 'src/app/shared/services/product-module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminApiCallerService } from 'src/app/shared/services/admin-api-caller.service';
import { Router } from '@angular/router';
import { ApiCallsService } from 'src/app/shared/services/api-calls.service';
import { ImageUploadService } from 'src/app/shared/services/upload-image.service';

@Component({
  selector: 'app-edit-add-offer',
  templateUrl: './edit-add-offer.component.html',
  styleUrls: ['./edit-add-offer.component.css'],
})
export class EditAddOfferComponent implements OnInit {
  offer = new offer();
  active: boolean = true;
  file: any;
  search: string = '';
  Products: Product[] = [];
  chosenProducts: Product[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private apiCaller: AdminApiCallerService,
    private router: Router,
    private apiCaller2: ApiCallsService,
    public imageUploadService: ImageUploadService
  ) {}

  ngOnInit(): void {
    this.router.routerState.root.queryParams.subscribe((params) => {
      this.queryParams = params['id'];
    });
    if (this.queryParams != null) {
      this.apiCaller2.getOffer(this.queryParams, (data: any) => {
        this.offer = data;
        this.offerForm.controls['Image'].setValue(this.offer.imageUrl);
        this.offerForm.controls['Name'].setValue(this.offer.name);
        this.offerForm.controls['Price'].setValue(this.offer.price);
        this.offerForm.controls['Description'].setValue(this.offer.description);
        this.offerForm.controls['Products'].setValue(this.offer.Products);
        this.chosenProducts = this.offer.Products;
        if (this.offer.active != null) {
          this.active = this.offer.active;
        }
        console.log(this.offer);
      });
    }
  }
  // 64adedb316c82705bb3417ff
  offerForm: FormGroup = this.formBuilder.group({
    Name: ['', Validators.required],
    Price: [0, Validators.required],
    Description: ['', Validators.required],
    Image: ['', Validators.required],
    Products: [[], Validators.required],
  });

  queryParams: any = {};

  saveProduct() {
    if (this.queryParams === undefined) {
      if (this.offerForm.valid) {
        let p = {
          Name: this.offerForm.controls['Name'].value,
          Image: this.offerForm.controls['Image'].value,
          Desc: this.offerForm.controls['Description'].value,
          Products: this.offerForm.controls['Products'].value.map(
            (p: Product) => {
              return {
                id: p.id,
                quantity: p.quantityOrdered,
              };
            }
          ),
          DiscountPrice: this.offerForm.controls['Price'].value,
          Active: this.active,
        };
        this.apiCaller.addOffer(p, (data: any) => {
          this.offerForm.reset();
          this.router.navigate(['admin/dashboard/Offers']);
          alert('Product Added Successfully');
        });
      } else {
        alert('Please fill all the fields 1');
      }
    } else {
      if (this.offerForm.valid) {
        let p = {
          Name: this.offerForm.controls['Name'].value,
          Image: this.offerForm.controls['Image'].value,
          Desc: this.offerForm.controls['Description'].value,
          Products: this.offerForm.controls['Products'].value.map(
            (p: Product) => {
              return {
                id: p.id,
                quantity: p.quantityOrdered,
              };
            }
          ),
          DiscountPrice: this.offerForm.controls['Price'].value,
          Active: this.active,
        };

        this.apiCaller.updateOffer(this.offer.id, p, (data: any) => {
          this.offerForm.reset();
          this.router.navigate(['admin/dashboard/Offers']);
          alert('Product Edited Successfully');
        });
      } else {
        alert('Please fill all the fields 2');
      }
    }
  }

  onFileSelected(event: any) {
    this.file = event.target.files[0];
  }

  upload() {
    this.imageUploadService.uploadFile(
      this.file,
      (imageUrl: any) => {
        this.offerForm.controls['Image'].setValue(imageUrl);
        this.offer.imageUrl = imageUrl;
      },
      false
    );
  }

  handleChange(e: string) {
    this.active = !this.active;
  }

  searchProduct() {
    this.apiCaller.searchoffset = 0;
    this.apiCaller.searchProducts(this.search, (data: Product[]) => {
      data.forEach((p: Product) => {
        if (this.chosenProducts.findIndex((x: Product) => x.id == p.id) == -1) {
          this.Products.push(p);
        }
      });
    });
  }

  loadMore() {
    this.apiCaller.searchoffset += 24;
    this.apiCaller.searchProducts(this.search, (data: any) => {
      this.Products = data;
    });
  }

  handleProductChange(p: Product) {
    if (p.checked === false) {
      this.chosenProducts.push(p);
      p.checked = true;
      this.Products.splice(
        this.Products.findIndex((x: Product) => x.id == p.id),
        1
      );
      console.log(this.chosenProducts);
    } else {
      this.chosenProducts.splice(
        this.chosenProducts.findIndex((x: Product) => x.id == p.id),
        1
      );
      this.Products.push(p);
      p.checked = false;
      console.log(this.chosenProducts);
    }
    this.offerForm.controls['Products'].setValue(this.chosenProducts);
  }
}
