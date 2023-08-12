import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GoogleMapsService {
  latitude: number | undefined;
  longitude: number | undefined;
}
