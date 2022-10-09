import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-change-language',
  templateUrl: './change-language.component.html',
  styleUrls: ['./change-language.component.scss'],
})
export class ChangeLanguageComponent implements OnInit {
  currentLanguage = localStorage.getItem('language');

  constructor(private readonly translateService: TranslateService) {}

  ngOnInit(): void {}

  changeLanguage(event: any) {
    this.translateService.use(event.target.value);
    localStorage.setItem('language', event.target.value);
  }
}
