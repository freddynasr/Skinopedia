import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminApiCallerService } from 'src/app/shared/services/admin-api-caller.service';
import { ApiCallsService } from 'src/app/shared/services/api-calls.service';
import { GoogleMapsService } from 'src/app/shared/services/google-maps.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
})
export class SettingsComponent implements OnInit {
  passwordHide: boolean = false;
  passwordHide2: boolean = false;
  passwordHide3: boolean = false;
  areas: any = [];
  Locations: any[] = [];
  constructor(
    private formBuilder: FormBuilder,
    private adminApiCallerService: AdminApiCallerService,
    private apiCallerService: ApiCallsService,
    private googleMapsService: GoogleMapsService
  ) {}

  ngOnInit(): void {
    let tempAreas = localStorage.getItem('Areas');
    if (tempAreas) {
      this.areas = JSON.parse(tempAreas);
    } else {
      this.apiCallerService.getAreas((data: any) => {
        this.areas = data;
      });
    }
  }

  togglePasswordVisibility(id: number) {
    switch (id) {
      case 1:
        this.passwordHide = !this.passwordHide;
        break;

      case 2:
        this.passwordHide2 = !this.passwordHide2;
        break;

      case 3:
        this.passwordHide3 = !this.passwordHide3;
        break;
    }
  }

  changePasswordForm: FormGroup = this.formBuilder.group({
    oldPassword: ['', [Validators.required]],
    newPassword: ['', [Validators.required]],
    confirmPassword: ['', [Validators.required]],
  });

  addLocationForm: FormGroup = this.formBuilder.group({
    locationName: ['', [Validators.required]],
    area: ['', [Validators.required]],
    floor: ['', [Validators.required]],
  });

  changePassword() {
    if (
      this.changePasswordForm.valid &&
      this.changePasswordForm.controls['newPassword'].value !==
        this.changePasswordForm.controls['ConfirmPassword'].value
    ) {
    }
  }

  onAreaChange(event: Event) {
    this.addLocationForm.controls['area'].setValue(
      (event.target as HTMLSelectElement).value
    );
  }

  AddLocation() {
    alert(this.addLocationForm.valid);
    if (this.addLocationForm.valid) {
      alert('Add Location 2');
      let location = {
        locationName: this.addLocationForm.controls['locationName'].value,
        longitude: this.googleMapsService.longitude,
        latitude: this.googleMapsService.latitude,
        area: this.addLocationForm.controls['area'].value,
        floor: this.addLocationForm.controls['floor'].value,
      };
      let temp = localStorage.getItem('location');
      if (temp) {
        this.Locations = JSON.parse(temp);
        this.Locations.push(location);
        localStorage.setItem('location', JSON.stringify(this.Locations));
      } else {
        this.Locations.push(location);
        localStorage.setItem('location', JSON.stringify(this.Locations));
      }
      this.addLocationForm.reset();
    }
  }
}
