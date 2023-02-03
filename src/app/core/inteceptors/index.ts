import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NoCacheHeadersInterceptor } from './no-cache-interceptor';
import { BearerTokenInterceptor } from './bearer-interceptor';

export const interceptorProviders = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: BearerTokenInterceptor,
    multi: true,
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: NoCacheHeadersInterceptor,
    multi: true,
  },
];
