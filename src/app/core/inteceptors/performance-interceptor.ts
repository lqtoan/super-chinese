import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { defer } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Injectable()
export class PerformanceInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return defer(() => {
      // const key = req.urlWithParams;
      // console.time(key);
      return next.handle(req).pipe(
        finalize(() => {
          // console.timeEnd(key);
        })
      );
    });
  }
}
