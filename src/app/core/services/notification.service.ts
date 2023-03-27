import { Notification } from '@models/notification.model';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Guid } from 'guid-typescript';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  constructor(private readonly _httpClient: HttpClient) {}

  private API = `${environment.api}notifications`;

  getAllNotifications(): Observable<Notification[]> {
    return this._httpClient.get<Notification[]>(`${this.API}`);
  }

  getNotificationsByUserId(userId: string): Observable<Notification[]> {
    return this._httpClient.get<Notification[]>(`${this.API}/${userId}`);
  }

  createNotification(notification: Notification) {
    notification.notificationId = Guid.create().toString();
    return this._httpClient.post<Notification>(this.API, notification);
  }

  markAsRead(notificationId: string) {
    return this._httpClient.patch<Notification>(`${this.API}/${notificationId ? notificationId : null}`, null);
  }
}
