import { hsk1ExerciseAudios } from './mock-hsk1-exercise-audios';
import { hsk1CurriculumAudios } from './mock-hsk1-curriculum-audios';
import { Audio } from '../../models/audio';
import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AudioService {
  private hsk1CurriculumAudios: Audio[] = hsk1CurriculumAudios;
  private hsk1ExerciseAudios: Audio[] = hsk1ExerciseAudios;

  constructor() {}

  getCurriculumAudioList(): Observable<Audio[]> {
    return of(this.hsk1CurriculumAudios).pipe(delay(50));
  }

  getExerciseAudioList(): Observable<Audio[]> {
    return of(this.hsk1ExerciseAudios).pipe(delay(50));
  }
}
