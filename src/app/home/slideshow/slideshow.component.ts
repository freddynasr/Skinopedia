import { Component, OnInit, OnDestroy } from '@angular/core';
import SwiperCore, {
  Autoplay,
  Pagination,
  Scrollbar,
  A11y,
  Navigation,
} from 'swiper';
import { ApiCallsService } from 'src/app/shared/services/api-calls.service';
import { Image } from 'src/app/shared/services/product-module';
// install Swiper modules
SwiperCore.use([Autoplay, Pagination, A11y, Scrollbar, Navigation]);

@Component({
  selector: 'app-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.css'],
})
export class SlideshowComponent implements OnInit, OnDestroy {
  constructor(private apiCaller: ApiCallsService) {}

  images: Image[] = [];

  sessionData: any;

  ngOnInit(): void {
    this.apiCaller.getSlideImages((data: any) => {
      this.images = data;
    });
  }
  ngOnDestroy(): void {
    this.apiCaller.unsubscribe();
  }
}
