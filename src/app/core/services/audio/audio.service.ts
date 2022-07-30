import { exerciseAudios } from './mock-exercise-audios';
import { curriculumAudios } from './mock-curriculum-audios';
import { Audio } from '../../models/audio';
import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AudioService {
  private curriculumAudios: Audio[] = curriculumAudios;
  private exerciseAudios: Audio[] = exerciseAudios;

  constructor() {}

  getCurriculumAudioList(): Observable<Audio[]> {
    return of(this.curriculumAudios).pipe(delay(50));
  }

  getExerciseAudioList(): Observable<Audio[]> {
    return of(this.exerciseAudios).pipe(delay(50));
  }
}
