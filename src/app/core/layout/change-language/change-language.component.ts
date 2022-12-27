import { LanguageService } from './language.service';
import { Subject } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-change-language',
  templateUrl: './change-language.component.html',
  styleUrls: ['./change-language.component.scss'],
})
export class ChangeLanguageComponent implements OnInit {
  currentLanguage: string = 'vi';
  languages = this.translateService.getLangs();

  constructor(private readonly translateService: TranslateService, private readonly languageService: LanguageService) {}

  ngOnInit(): void {}

  changeLanguage(language: string) {
    this.translateService.use(language);
    this.currentLanguage = language;
    this.languageService.changeLanguage(language);
  }
}
