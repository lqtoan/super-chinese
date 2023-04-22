import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { defer } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Injectable()
export class CorsInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    let headers = req.headers.set('Access-Control-Allow-Origin', '*');
    const reqClone = req.clone({
      headers,
    });
    return next.handle(reqClone);
  }
}
