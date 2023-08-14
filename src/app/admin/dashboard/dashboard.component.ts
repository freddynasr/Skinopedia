import { Component, OnInit } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/compat/messaging';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private afMessaging: AngularFireMessaging) { }

  ngOnInit() {
    this.requestPermission();
  }

  requestPermission() {
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        this.afMessaging.requestToken
          .subscribe(
            (token) => { console.log('FCM Token:', token); },
            (error) => { console.error(error); }
          );
      }
    });
  }
}
