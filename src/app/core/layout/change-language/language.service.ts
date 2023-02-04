import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private _currentLanguage$ = new BehaviorSubject<string>(localStorage.getItem('language') || 'vi');
  currentLanguage$ = this._currentLanguage$.asObservable();

  changeLanguage(language: string) {
    localStorage.setItem('language', language);
    this._currentLanguage$.next(language);
  }
}
