import { HttpClient } from '@angular/common/http';
import { Audio } from '@models/audio.model';
import { HSK1_EXERCISE_AUDIOS } from '@data/mock-hsk1-exercise-audios';
import { HSK1_CURRICULUM_AUDIOS } from '@data/mock-hsk1-curriculum-audios';
import { HSK2_EXERCISE_AUDIOS } from '@data/mock-hsk2-exercise-audios';
import { HSK2_CURRICULUM_AUDIOS } from '@data/mock-hsk2-curriculum-audios';
import { HSK3_EXERCISE_AUDIOS } from '@data/mock-hsk3-exercise-audios';
import { HSK3_CURRICULUM_AUDIOS } from '@data/mock-hsk3-curriculum-audios';
import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AudioService {
  private hsk1CurriculumAudios: Audio[] = HSK1_CURRICULUM_AUDIOS;
  private hsk1ExerciseAudios: Audio[] = HSK1_EXERCISE_AUDIOS;
  private hsk2CurriculumAudios: Audio[] = HSK2_CURRICULUM_AUDIOS;
  private hsk2ExerciseAudios: Audio[] = HSK2_EXERCISE_AUDIOS;
  private hsk3CurriculumAudios: Audio[] = HSK3_CURRICULUM_AUDIOS;
  private hsk3ExerciseAudios: Audio[] = HSK3_EXERCISE_AUDIOS;

  constructor(private readonly httpClient: HttpClient) {}

  getHsk1CurriculumAudioList(): Observable<Audio[]> {
    return this.httpClient.get<Audio[]>('app/core/data/mock-hsk1-curriculum-audios.json');
  }

  getHsk1ExerciseAudioList(): Observable<Audio[]> {
    return of(this.hsk1ExerciseAudios).pipe(delay(500));
  }

  getHsk2CurriculumAudioList(): Observable<Audio[]> {
    return of(this.hsk2CurriculumAudios).pipe(delay(500));
  }

  getHsk2ExerciseAudioList(): Observable<Audio[]> {
    return of(this.hsk2ExerciseAudios).pipe(delay(500));
  }

  getHsk3CurriculumAudioList(): Observable<Audio[]> {
    return of(this.hsk3CurriculumAudios).pipe(delay(500));
  }

  getHsk3ExerciseAudioList(): Observable<Audio[]> {
    return of(this.hsk3ExerciseAudios).pipe(delay(500));
  }
}
