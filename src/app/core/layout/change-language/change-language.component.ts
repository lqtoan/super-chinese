import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-change-language',
  templateUrl: './change-language.component.html',
  styleUrls: ['./change-language.component.scss'],
})
export class ChangeLanguageComponent implements OnInit {
  currentLanguage = localStorage.getItem('language');
  languages = this.translateService.getLangs();

  constructor(private readonly translateService: TranslateService) {}

  ngOnInit(): void {}

  // changeLanguage(event: any) {
  //   console.log(event);

  //   this.translateService.use(event.target.value);
  //   localStorage.setItem('language', event.target.value);
  // }

  changeLanguage(language: string) {
    this.translateService.use(language);
    localStorage.setItem('language', language);
  }
}
