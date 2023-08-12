import { Component, OnInit } from '@angular/core';
import { ApiCallsService } from 'src/app/shared/services/api-calls.service';
import { AdminApiCallerService } from 'src/app/shared/services/admin-api-caller.service';
import { ImageUploadService } from 'src/app/shared/services/upload-image.service';
import { Image } from 'src/app/shared/services/product-module';
@Component({
  selector: 'app-slide-show',
  templateUrl: './slide-show.component.html',
  styleUrls: ['./slide-show.component.css'],
})
export class SlideShowComponent implements OnInit {
  file: any;
  newImage = new Image();

  constructor(
    private apiCaller: ApiCallsService,
    private adminApiCaller: AdminApiCallerService,
    private imageUploadService: ImageUploadService
  ) {}

  slideImages: any[] = [];

  ngOnInit(): void {
    this.apiCaller.getSlideImages((data: any) => {
      this.slideImages = data;
    });
  }
  onFileSelected(event: any) {
    this.file = event.target.files[0];
  }

  upload() {
    this.imageUploadService.uploadFile(
      this.file,
      (imageUrl: any) => {
        this.newImage.Image = imageUrl;
        this.adminApiCaller.addSlideImage(this.newImage, (data: any) => {
          this.slideImages.push(this.newImage);
          alert('Image Uploaded Successfully');
        });
      },
      false
    );
  }

  updateOrder() {
    let slide: any = {
      Slideshow: [],
    };
    this.slideImages.forEach((x, index) => {
      let temp: any = {
        _id: x.id,
        Order: x.Order,
      };
      slide.Slideshow.push(temp);
    });

    this.adminApiCaller.updateSlideImages(slide, (data: any) => {
      alert('Order Updated Successfully');
    });
  }

  removeImage(id: string) {
    if (!confirm('Are you sure you want to delete this image?')) return;
    this.adminApiCaller.deleteSlideImage(id, (data: any) => {
      let index = this.slideImages.findIndex((x) => x.id == id);
      this.slideImages.splice(index, 1);
    });
  }
}
