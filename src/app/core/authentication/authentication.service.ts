import { AuthService } from '@auth0/auth0-angular';
import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  user$ = this.authService.user$;
  loading$ = this.authService.isLoading$;
  private _accessTokenSubject$ = new Subject<string>();
  accessToken$ = this._accessTokenSubject$.asObservable();

  constructor(private authService: AuthService, @Inject(DOCUMENT) private doc: Document) {}

  loginWithRedirect() {
    this.authService.loginWithRedirect();
  }

  logout() {
    this.authService.logout({ returnTo: this.doc.location.origin });
  }

  getAccessToken() {
    this.authService.getAccessTokenSilently().subscribe((accessToken) => {
      this._accessTokenSubject$.next(accessToken);
    });
  }
}
