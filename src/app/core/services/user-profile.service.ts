import { UserProfile } from '@models/user-profile.model';
import { environment } from './../../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UserProfileService {
  constructor(private readonly httpClient: HttpClient) {}

  API = `${environment.authApi}`;

  getUserProfile(): Observable<UserProfile> {
    const url = `${this.API}/userinfo`;
    return this.httpClient.get<UserProfile>(url);
  }

  sendToken(): any {
    const url = `${this.API}/tokeninfo`;
    return this.httpClient.post(url, { id_token: localStorage.getItem('accessToken') });
  }
}
