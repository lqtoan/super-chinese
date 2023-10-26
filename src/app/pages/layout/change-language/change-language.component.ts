import { LanguageService } from './language.service';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-change-language',
  templateUrl: './change-language.component.html',
  styleUrls: ['./change-language.component.scss'],
})
export class ChangeLanguageComponent implements OnInit {
  currentLanguage: string = '';
  languages = this._translateService.getLangs();

  constructor(
    private readonly _translateService: TranslateService,
    private readonly _languageService: LanguageService
  ) {}

  ngOnInit(): void {
    this._languageService.currentLanguage$.subscribe((res) => (this.currentLanguage = res));
  }

  changeLanguage(language: string) {
    this._translateService.use(language);
    this.currentLanguage = language;
    this._languageService.changeLanguage(language);
  }
}
