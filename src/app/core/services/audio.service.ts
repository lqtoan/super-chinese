import { HttpClient } from '@angular/common/http';
import { Audio } from '@models/audio.model';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AudioService {
  constructor(private readonly _httpClient: HttpClient) {}
  private _currentTab$ = new BehaviorSubject<number>(0);
  currentTab$ = this._currentTab$.asObservable();

  changeTabIndex(index: number) {
    this._currentTab$.next(index);
  }

  getAllCurriculums(index: number): Observable<Audio[]> {
    return this._httpClient.get<Audio[]>(`assets/mock/hsk${index + 1}.curriculum.json`);
  }

  getAllExercises(index: number): Observable<Audio[]> {
    return this._httpClient.get<Audio[]>(`assets/mock/hsk${index + 1}.exercise.json`);
  }

  getAudioEvent(audio: Audio): Observable<any> {
    return this._httpClient.get(`${audio.url}`, {
      reportProgress: true,
      observe: 'events',
      // responseType: 'blob',
    });
  }
}
