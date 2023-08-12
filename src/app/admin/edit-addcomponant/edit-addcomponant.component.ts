import { Component, OnInit } from '@angular/core';
import { extendedProduct, Types } from 'src/app/shared/services/product-module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminApiCallerService } from 'src/app/shared/services/admin-api-caller.service';
import { Router } from '@angular/router';
import { ApiCallsService } from 'src/app/shared/services/api-calls.service';
import { ImageUploadService } from 'src/app/shared/services/upload-image.service';

@Component({
  selector: 'app-edit-addcomponant',
  templateUrl: './edit-addcomponant.component.html',
  styleUrls: ['./edit-addcomponant.component.css'],
})
export class EditAddcomponantComponent implements OnInit {
  product: extendedProduct = new extendedProduct();
  file: any;
  new: boolean = true;
  active: boolean = true;
  types: Types[] = [];
  subTypes: any[] = [];
  subtype: any = {
    Name: 'Choose a Type First',
    id: '',
  };
  type: Types = { Name: 'Choose Type', _id: '', SubTypes: [] };
  constructor(
    private formBuilder: FormBuilder,
    private apiCaller: AdminApiCallerService,
    private router: Router,
    private apiCaller2: ApiCallsService,
    public imageUploadService: ImageUploadService
  ) {}

  ngOnInit(): void {
    this.apiCaller2.getTypesandSybtypes((data: any) => {
      this.types = data;

      this.router.routerState.root.queryParams.subscribe((params) => {
        this.queryParams = params['id'];
      });
      if (this.queryParams != null) {
        this.apiCaller2.getProduct(this.queryParams, (data: any) => {
          this.product = data;
          this.productForm.controls['image'].setValue(this.product.imageUrl);
          this.productForm.controls['name'].setValue(this.product.name);
          this.productForm.controls['price'].setValue(this.product.price);
          this.productForm.controls['description'].setValue(
            this.product.description
          );
          this.productForm.controls['brand'].setValue(this.product.brand);
          this.productForm.controls['SubType'].setValue(this.product.subtypeId);
          this.productForm.controls['discountPrice'].setValue(
            this.product.discountPrice
          );
          this.productForm.controls['quantity'].setValue(this.product.quantity);
          this.productForm.controls['image'].setValue(this.product.imageUrl);
          if (
            this.product.active != undefined &&
            this.product.new != undefined
          ) {
            this.new = this.product.new;
            this.active = this.product.active;
          }
          let index = this.types.findIndex(
            (x) => x._id === this.product.typeId
          );
          this.type.Name = this.product.type;
          this.type._id = this.product.typeId;
          this.subTypes = this.types[index].SubTypes;
          this.subtype.Name = this.product.subtype;
          this.subtype.id = this.product.subtypeId;
        });
      }
    });
  }
  // 64adedb316c82705bb3417ff
  productForm: FormGroup = this.formBuilder.group({
    name: ['', Validators.required],
    price: [0, Validators.required],
    description: ['', Validators.required],
    image: ['', Validators.required],
    brand: ['', Validators.required],
    discountPrice: [0, Validators.required],
    quantity: [0, Validators.required],
    SubType: ['', Validators.required],
  });

  queryParams: any = {};

  saveProduct() {
    if (this.queryParams === undefined) {
      if (this.productForm.valid) {
        let p = {
          Name: this.productForm.controls['name'].value,
          Image: this.productForm.controls['image'].value,
          Desc: this.productForm.controls['description'].value,
          WakilniDetails: 'string',
          SubType: this.productForm.controls['SubType'].value,
          Brand: this.productForm.controls['brand'].value,
          Quantity: this.productForm.controls['quantity'].value,
          Price: this.productForm.controls['price'].value,
          DiscountPrice: this.productForm.controls['discountPrice'].value,
          Active: this.active,
          New: this.new,
        };
        this.apiCaller.addProduct(p, (data: any) => {
          this.productForm.reset();
          this.router.navigate(['admin/dashboard/ManageProducts']);
          alert('Product Added Successfully');
        });
      } else {
        alert('Please fill all the fields 1');
      }
    } else {
      if (this.productForm.valid) {
        let p = {
          Name: this.productForm.controls['name'].value,
          Image: this.productForm.controls['image'].value,
          Desc: this.productForm.controls['description'].value,
          WakilniDetails: 'string',
          SubType: this.productForm.controls['SubType'].value,
          Brand: this.productForm.controls['brand'].value,
          Quantity: this.productForm.controls['quantity'].value,
          Price: this.productForm.controls['price'].value,
          DiscountPrice: this.productForm.controls['discountPrice'].value,
          Active: this.active,
          New: this.new,
        };

        this.apiCaller.updateProduct(this.product.id, p, (data: any) => {
          this.productForm.reset();
          this.router.navigate(['admin/dashboard/ManageProducts']);
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
        this.productForm.controls['image'].setValue(imageUrl);
        this.product.imageUrl = imageUrl;
      },
      false
    );
  }

  handleChange(e: string) {
    switch (e) {
      case 'New':
        {
          this.new = !this.new;
        }
        break;
      case 'Active': {
        this.active = !this.active;
      }
    }
  }

  onTypeChange(e: Event) {
    if ((e.target as HTMLSelectElement).value !== '') {
      this.subtype = {
        Name: 'Choose SubType',
        id: '',
      };
      let index = this.types.findIndex(
        (x) => x._id === (e.target as HTMLSelectElement).value
      );
      this.subTypes = this.types[index].SubTypes;
    } else {
      this.subTypes = [];
      this.subtype = {
        Name: 'Choose a Type First',
        id: '',
      };
    }
  }

  onSubTypeChange(e: Event) {
    this.productForm.controls['SubType'].setValue(
      (e.target as HTMLSelectElement).value
    );
  }
}
