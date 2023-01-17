import { HttpClient } from '@angular/common/http';
import { Audio } from '@models/audio.model';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AudioService {
  constructor(private readonly httpClient: HttpClient) {}
  private _currentTab$ = new BehaviorSubject<number>(0);
  currentTab$ = this._currentTab$.asObservable();

  changeTabIndex(index: number) {
    this._currentTab$.next(index);
  }

  getHsk1CurriculumAudioList(): Observable<Audio[]> {
    return this.httpClient.get<Audio[]>('assets/mock/hsk1.curriculum.json');
  }

  getHsk1ExerciseAudioList(): Observable<Audio[]> {
    return this.httpClient.get<Audio[]>('assets/mock/hsk1.exercise.json');
  }

  getHsk2CurriculumAudioList(): Observable<Audio[]> {
    return this.httpClient.get<Audio[]>('assets/mock/hsk2.curriculum.json');
  }

  getHsk2ExerciseAudioList(): Observable<Audio[]> {
    return this.httpClient.get<Audio[]>('assets/mock/hsk2.exercise.json');
  }

  getHsk3CurriculumAudioList(): Observable<Audio[]> {
    return this.httpClient.get<Audio[]>('assets/mock/hsk3.curriculum.json');
  }

  getHsk3ExerciseAudioList(): Observable<Audio[]> {
    return this.httpClient.get<Audio[]>('assets/mock/hsk3.exercise.json');
  }
}
