import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminApiCallerService } from 'src/app/shared/services/admin-api-caller.service';
@Component({
  selector: 'app-type-subtype',
  templateUrl: './type-subtype.component.html',
  styleUrls: ['./type-subtype.component.css'],
})
export class TypeSubtypeComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private apiCaller: AdminApiCallerService
  ) {}

  ngOnInit(): void {
    this.apiCaller.getTypes((data: any) => {
      this.types = data;
    });
  }

  types: any[] = [];

  isDisabled: boolean = true;

  typeForm: FormGroup = this.formBuilder.group({
    type: ['', Validators.required],
  });

  subtypeForm: FormGroup = this.formBuilder.group({
    subtype: ['', Validators.required],
  });

  selectedOption!: string;

  handleOptionChange(value: Event) {
    this.selectedOption = (value.target as HTMLInputElement).value;
    if (this.selectedOption !== '') {
      this.isDisabled = false;
    }
  }

  addType() {
    if (this.typeForm.valid) {
      let Type = { Name: this.typeForm.controls['type'].value };
      this.apiCaller.addType(Type, (data: any) => {
        this.types = [];
        this.apiCaller.getTypes((data: any) => {
          this.types = data;
          this.typeForm.reset();
        });
      });
    }
  }
  addSubtype() {
    if (this.subtypeForm.valid) {
      let subtype = {
        Type: this.selectedOption,
        Name: this.subtypeForm.controls['subtype'].value,
      };
      this.apiCaller.addSubType(subtype, (data: any) => {
        this.types = [];
        this.apiCaller.getTypes((data: any) => {
          this.types = data;
          this.subtypeForm.reset();
        });
      });
    }
  }

  removeType(id: string) {
    if (confirm('Are you sure you want to delete this type?')) {
      this.apiCaller.removeType(id, (data: any) => {
        this.types = [];
        this.apiCaller.getTypes((data: any) => {
          this.types = data;
        });
      });
    }
  }

  removeSubType(id: string, type: string) {
    if (confirm('Are you sure you want to delete this subtype?')) {
      this.apiCaller.removeSubType(id, type, (data: any) => {
        this.types = [];
        this.apiCaller.getTypes((data: any) => {
          this.types = data;
        });
      });
    }
  }
}
