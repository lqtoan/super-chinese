import { HSK1_EXERCISE_AUDIOS } from './mock-hsk1-exercise-audios';
import { HSK1_CURRICULUM_AUDIOS } from './mock-hsk1-curriculum-audios';
import { Audio } from '@models/audio';
import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AudioService {
  private hsk1CurriculumAudios: Audio[] = HSK1_CURRICULUM_AUDIOS;
  private hsk1ExerciseAudios: Audio[] = HSK1_EXERCISE_AUDIOS;

  constructor() {}

  getHsk1CurriculumAudioList(): Observable<Audio[]> {
    return of(this.hsk1CurriculumAudios).pipe(delay(50));
  }

  getHsk1ExerciseAudioList(): Observable<Audio[]> {
    return of(this.hsk1ExerciseAudios).pipe(delay(50));
  }
}
