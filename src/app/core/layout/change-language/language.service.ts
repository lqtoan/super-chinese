import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private _currentLanguage$ = new Subject<string>();
  currentLanguage$ = this._currentLanguage$.asObservable();

  changeLanguage(language: string) {
    this._currentLanguage$.next(language);
  }
}
