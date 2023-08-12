import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (this.shouldAddHeader(request)) {
      let temp = localStorage.getItem('token');
      if (temp != null) {
        request = request.clone({
          setHeaders: {
            "Content-type": 'application/json',
            "Authorization": temp,
          },
        });

      }
    }
    return next.handle(request);
  }

  private shouldAddHeader(request: HttpRequest<unknown>): boolean {
    return request.url.startsWith('https://api.skinopedia-lb.com/admin');
  }
}
