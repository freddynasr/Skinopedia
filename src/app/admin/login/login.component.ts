import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/shared/guard/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
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

  passwordHide = true;
  togglePasswordVisibility() {
    this.passwordHide = !this.passwordHide;
  }
}
