import { environment } from './../../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UserProfileService {
  constructor(private readonly httpClient: HttpClient) {}

  API = `${environment.api}`;

  getUserProfile(): Observable<any> {
    let url = `${this.API}/userinfo`;
    return this.httpClient.get<any>(url);
  }
}
