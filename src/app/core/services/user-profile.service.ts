import { UserProfile } from '@models/user-profile.model';
import { environment } from './../../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UserProfileService {
  constructor(private readonly _httpClient: HttpClient) {}

  private API = `${environment.authApi}`;

  getUserProfile(): Observable<UserProfile> {
    const url = `${this.API}/userinfo`;
    return this._httpClient.get<UserProfile>(url);
  }
}
