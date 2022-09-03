import { AuthService } from '@auth0/auth0-angular';
import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  user$ = this.authService.user$;
  private accessTokenSubject$ = new Subject();
  accessToken$ = this.accessTokenSubject$.asObservable();

  constructor(private authService: AuthService, @Inject(DOCUMENT) private doc: Document) {}
  
  async loginWithRedirect() {
    this.authService.loginWithRedirect();
  }

  async logout() {
    this.authService.logout({ returnTo: this.doc.location.origin });
  }

  getAccessToken() {
    this.authService.getAccessTokenSilently().subscribe(accessToken => {
      this.accessTokenSubject$.next(accessToken);
      localStorage.setItem('accessToken', accessToken);
    });
  }
}