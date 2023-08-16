import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/shared/guard/authentication.service';
import { AngularFireMessaging } from '@angular/fire/compat/messaging';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private afMessaging: AngularFireMessaging,
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthenticationService
  ) {}
  loginForm: FormGroup = this.formBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  ngOnInit(): void {
    let temp = localStorage.getItem('token');
    if (temp) {
      this.authService.isLoggedIn = true;
      this.router.navigate(['admin/dashboard']);
      return;
    }
    this.requestPermission();
  }
  onSubmit() {
    let credentials = {
      Email: this.loginForm.value.email,
      Password: this.loginForm.value.password,
    };
    this.authService.loginRequest(credentials, (data: any) => {
      if (data.Auth_Key && this.loginForm.valid) {
        this.authService.isLoggedIn = true;
        this.router.navigate(['admin/dashboard']);
        this.loginForm.reset();
      } else {
        alert('Invalid Credentials');
      }
    });
  }

  requestPermission() {
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        this.afMessaging.requestToken
          .subscribe(
            (token) => { console.log('FCM Token FROM LOGIN:', token); },
            (error) => { console.error(error); }
          );
      }
    });
  }

  passwordHide = true;
  togglePasswordVisibility() {
    this.passwordHide = !this.passwordHide;
  }
}
