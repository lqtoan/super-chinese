import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { BearerTokenInterceptor } from './bearer-interceptor';

export const interceptorProviders = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: BearerTokenInterceptor,
    multi: true,
  },
];
