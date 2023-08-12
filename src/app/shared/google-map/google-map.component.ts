import { Component, OnInit } from '@angular/core';
import { MapGeocoder } from '@angular/google-maps';
import { GoogleMapsService } from '../services/google-maps.service';
@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.css'],
})
export class GoogleMapComponent implements OnInit {
  constructor( public googleMap : GoogleMapsService) {}

  ngOnInit(): void {}

  display: any;
  center: google.maps.LatLngLiteral = { lat: 33.888630, lng: 35.495480 };
  zoom = 8;
  markerOptions: google.maps.MarkerOptions = { draggable: false };
  markerPositions: google.maps.LatLngLiteral[] = [];


  // moveMap(event: google.maps.MapMouseEvent) {
  //   if (event.latLng != null) this.center = event.latLng.toJSON();
  // }

  move(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) this.display = event.latLng.toJSON();
  }
  addMarker(event: google.maps.MapMouseEvent) {
    this.markerPositions = [];
    console.log(event);
    if (event.latLng != null) {
      let position = event.latLng.toJSON();
    this.markerPositions.push(position);

    // Store lat and lng in separate variables
    this.googleMap.latitude = position.lat;
    this.googleMap.longitude = position.lng;
    }
  }
}
