import { LanguageService } from './language.service';
import { Subject } from 'rxjs';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-change-language',
  templateUrl: './change-language.component.html',
  styleUrls: ['./change-language.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChangeLanguageComponent implements OnInit {
  currentLanguage: string = '';
  languages = this.translateService.getLangs();

  constructor(private readonly translateService: TranslateService, private readonly languageService: LanguageService) {}

  ngOnInit(): void {
    this.languageService.currentLanguage$.subscribe((res) => (this.currentLanguage = res));
  }

  changeLanguage(language: string) {
    this.translateService.use(language);
    this.currentLanguage = language;
    this.languageService.changeLanguage(language);
  }
}
