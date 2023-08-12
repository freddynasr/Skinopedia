import { S3 } from 'aws-sdk';
import { Injectable } from '@angular/core';
// import * as AWS from 'aws-sdk';
import { AdminApiCallerService } from './admin-api-caller.service';
// AWS.config.update();

@Injectable({
  providedIn: 'root',
})
export class ImageUploadService {
  private s3;

  constructor(private adminApiCaller: AdminApiCallerService) {
    this.s3 = new S3({
      accessKeyId: 'AKIAZSENZ3WSGD5OGVUU',
      secretAccessKey: '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',
    });
  }
  uploading = false;
  response: string = '';
  uploadFile(file: any, filldata: any, slideShow: boolean) {
    this.uploading = true;
    const filename = file.name.substring(file.name.lastIndexOf('/') + 1);
    const extension = filename.substring(filename.lastIndexOf('.') + 1);
    const Key = new Date().getTime() + '.' + extension;
    const ContentType = `image/${extension}`;
    const params = {
      Bucket: 'diverconnect',
      Key,
      Body: file,
      ACL: 'public-read',
      ContentType,
    };

    console.log(params);

    this.s3.upload(params, (err: any, data: any) => {
      if (err) {
        console.log('Error', err);
        this.uploading = false;
        this.response = 'Upload failed, Please try again';
      }
      if (data) {
        console.log('Upload Success', data.Location);
        filldata(data.Location);
        this.uploading = false;
        this.response = 'Upload Succeded';
        if (slideShow == true) {
          this.adminApiCaller.addSlideImage(
            { Image: data.Location, Order: 2 },
            (data: any) => {}
          );
        }
      }
    });
  }
}
