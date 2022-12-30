import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private _currentLanguage$ = new BehaviorSubject<string>('vi');
  currentLanguage$ = this._currentLanguage$.asObservable();

  changeLanguage(language: string) {
    this._currentLanguage$.next(language);
  }
}
