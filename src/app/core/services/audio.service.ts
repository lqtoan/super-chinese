import { HttpClient } from '@angular/common/http';
import { Audio } from '@models/audio.model';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AudioService {
  constructor(private readonly httpClient: HttpClient) {}

  private _audios$ = new Subject();
  audios$ = this._audios$.asObservable();

  getHsk1CurriculumAudioList(): Observable<Audio[]> {
    return this.httpClient.get<Audio[]>('assets/mock/hsk1.curriculum.json').pipe(tap((res) => this._audios$.next(res)));
  }

  getHsk1ExerciseAudioList(): Observable<Audio[]> {
    return this.httpClient.get<Audio[]>('assets/mock/hsk1.exercise.json').pipe(tap((res) => this._audios$.next(res)));
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
