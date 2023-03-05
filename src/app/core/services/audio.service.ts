import { HttpClient } from '@angular/common/http';
import { Audio } from '@models/audio.model';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Grade } from '@enums/grade.enum';
import { AudioType } from '@enums/audio-type.enum';

@Injectable({
  providedIn: 'root',
})
export class AudioService {
  constructor(private readonly _httpClient: HttpClient) {}
  private _currentTab$ = new BehaviorSubject<number>(0);
  currentTab$ = this._currentTab$.asObservable();
  private _currentType$ = new BehaviorSubject<AudioType>('CURRICULUM');
  currentType$ = this._currentType$.asObservable();

  changeTabIndex(index: number) {
    this._currentTab$.next(index);
  }

  changeAudioType(type: AudioType) {
    this._currentType$.next(type);
  }

  getAllAudios(index: number, audioType: AudioType): Observable<Audio[]> {
    let type: string = audioType === 'CURRICULUM' ? 'curriculum' : 'exercise'
    return this._httpClient.get<Audio[]>(`assets/mock/hsk${index + 1}.${type}.json`);
  }

  getAudioEvent(audio: Audio): Observable<any> {
    return this._httpClient.get(`${audio.url}`, {
      reportProgress: true,
      observe: 'events',
      // responseType: 'blob',
    });
  }
}
