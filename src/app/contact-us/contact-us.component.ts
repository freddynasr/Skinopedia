import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-contact',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css'],
})
export class ContactUsComponent {
  model = {
    Name: '',
    Email: '',
    Subject: '',
    Message: '',
  };

  loading = false;
  error = '';
  success = '';
  url = 'http://68.66.251.127:30001/contacts/AddContact';

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    // 'Authorization': 'Bearer YOUR_ACCESS_TOKEN',
  });

  constructor(private http: HttpClient) {}

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.loading = true;
      this.error = '';
      this.success = '';
      // Replace with your API endpoint
      const payload = this.model; // Assuming the API accepts the model as is
      this.http
        .post(this.url, payload, { headers: this.headers })
        .subscribe((data: any) => {
          this.loading = false;
          this.success = 'Your message has been sent. Thank you!';
          this.model = {
            Name: '',
            Email: '',
            Subject: '',
            Message: '',
          };
        });
    }
    else{
      this.error='Error while sending the message! Please fill out all Fields.'
    }
  }
}
