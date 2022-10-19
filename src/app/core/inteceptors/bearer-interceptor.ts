import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class BearerTokenInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!request.headers.has('Authorization')) {
      const accessToken = localStorage.getItem('accessToken');
      if (accessToken) {
        const headers = request.headers.set('Authorization', `Bearer ${accessToken}`);
        const reqClone = request.clone({
          headers,
        });
        return next.handle(reqClone);
      }
    }
    return next.handle(request);
  }
}
