import { Component, OnInit } from '@angular/core';
import { AdminApiCallerService } from 'src/app/shared/services/admin-api-caller.service';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-discount-code',
  templateUrl: './discount-code.component.html',
  styleUrls: ['./discount-code.component.css'],
})
export class DiscountCodeComponent implements OnInit {
  discountCodes: any = [];
  selectedDiscountCode: any = {
    DiscountCode: '',
    DiscountPercentage: 0,
    Valid: true,
    orderCount: 0,
    _id: '',
    Owner: '',
  };

  code: FormGroup = this.formBuilder.group({
    DiscountCode: ['', Validators.required],
    DiscountPercentage: [0, Validators.required],
    Owner: ['', Validators.required],
    Valid: true,
  });

  constructor(
    private adminApiCaller: AdminApiCallerService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.adminApiCaller.getDiscountCodes((data: any) => {
      this.discountCodes = data;
    });
  }

  deleteDiscountCode(id: string) {
    if (confirm('Are you sure you want to delete this discount code?')) {
      this.adminApiCaller.deleteDiscountCode(id, (data: any) => {
        let index = this.discountCodes.findIndex((x: any) => x.id == id);
        this.discountCodes.splice(index, 1);
      });
    }
  }

  addDiscountCode() {
    alert(this.code.valid);
    if (this.code.valid) {
      let code = this.code.value;
      this.adminApiCaller.addDiscountCode(code, (data: any) => {
        this.discountCodes.push(data);
        this.adminApiCaller.getDiscountCodes((data: any) => {
          this.discountCodes = data;
        });
        this.restForm();
      });
    }
  }

  // editDiscountCode(id: string) {
  //   this.adminApiCaller.updateDiscountCode(this.code, (data: any) => {
  //     this.discountCodes = this.discountCodes.filter(
  //       (item: any) => item.id !== id
  //     );
  //     this.discountCodes.push(data);
  //   });
  // }

  copyToForm(discountcode: any) {
    this.selectedDiscountCode = discountcode;
  }

  restForm() {
    this.selectedDiscountCode = {
      DiscountCode: '',
      DiscountPercentage: 0,
      Valid: true,
      orderCount: 0,
      _id: '',
    };
    this.code.reset();
  }
}
