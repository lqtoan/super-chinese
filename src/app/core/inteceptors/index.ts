import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { BearerTokenInterceptor } from './bearer-interceptor';
import { NoCacheHeadersInterceptor } from './no-cache-interceptor';
import { PerformanceInterceptor } from './performance-interceptor';

export const interceptorProviders = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: BearerTokenInterceptor,
    multi: true,
  },
  // {
  //   provide: HTTP_INTERCEPTORS,
  //   useClass: NoCacheHeadersInterceptor,
  //   multi: true,
  // },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: PerformanceInterceptor,
    multi: true,
  },
];
