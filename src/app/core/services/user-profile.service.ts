import { UserProfile } from '@models/user-profile.model';
import { environment } from './../../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UserProfileService {
  constructor(private readonly httpClient: HttpClient) {}

  API = `${environment.api}`;

  getUserProfile(): Observable<UserProfile> {
    let url = `${this.API}/userinfo`;
    return this.httpClient.get<UserProfile>(url);
  }
}
