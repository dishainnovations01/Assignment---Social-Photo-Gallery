import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpResponse, HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

@Injectable()
export class InterceptorService implements HttpInterceptor {

  baseUrl: string = environment.base_url;

  constructor() { }

  intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (httpRequest.url.startsWith('http')) {
      return next.handle(httpRequest);
    }
    let newReq = httpRequest.clone({ url: this.baseUrl + httpRequest.url });
    return next.handle(newReq);
  }
}
