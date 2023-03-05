import { AuthenticationService } from './../authentication/authentication.service';
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, takeUntil } from 'rxjs';

@Injectable()
export class BearerTokenInterceptor implements HttpInterceptor {
  accessToken: unknown;
  constructor(private readonly _authService: AuthenticationService) {
    this._authService.accessToken$.subscribe(res => {
      this.accessToken = res;
    })
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!request.headers.has('Authorization')) {
        const headers = request.headers.set('Authorization', `Bearer ${this.accessToken}`);
        const reqClone = request.clone({
          headers,
        });
        return next.handle(reqClone);
    }
    return next.handle(request);
  }
}
