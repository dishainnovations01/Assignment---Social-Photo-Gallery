import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpResponse, HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
// import { ErrorDialogService } from './errordialog-service.service';
// import { CookiesService } from './cookie.service';
// import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class InterceptorService implements HttpInterceptor {

  baseUrl: string = environment.base_url;
  authKey: string = environment.authKey;

  constructor() { }

  intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // let cookie = this.cookiesService.getCookie('session');
    // console.log(cookie);
    // if (cookie == null && httpRequest.url != this.baseUrl + 'adminusers/login') {
    //   this.authService.logout();
    //   return null;
    // }
    if (httpRequest.url.startsWith('http')) {
      return next.handle(httpRequest);
    }

    let newReq = httpRequest.clone({ url: this.baseUrl + httpRequest.url, headers: httpRequest.headers.set('auth-key', this.authKey) });

    var minutesToAdd = 1;
    var currentDate = new Date();
    var futureDate = new Date(currentDate.getTime() + minutesToAdd * 60000);
    // this.cookiesService.setCookie('session', 'Working...', futureDate);

    return next.handle(newReq);
    // return next.handle(newReq).pipe(
    //   map((event: HttpEvent<any>) => {
    //     if (event instanceof HttpResponse) {
    //       console.log('event--->>>', event);
    //     }
    //     return event;
    //   }),
    //   catchError((error: HttpErrorResponse) => {
    //     let data = {};
    //     data = {
    //       'reason': error && error.error && error.error.reason ? error.error.reason : error.message,
    //       'status': error.status
    //     };
    //     // if (error.status != 420)
    //     //   this.errorDialogService.openDialog(data);
    //     return throwError(error);
    //   }));
  }
}
