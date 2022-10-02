import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { en_US, NzI18nService, vi_VN, zh_CN } from 'ng-zorro-antd/i18n';
import { AuthenticationService } from '../core/authentication/authentication.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {
  private readonly currentLanguage = localStorage.getItem('language');
  year: Date = new Date();

  constructor(public readonly authService: AuthenticationService, private readonly i18n: NzI18nService) {}

  ngOnInit(): void {
    if (this.currentLanguage == 'vi') {
      this.i18n.setLocale(vi_VN);
    }
    if (this.currentLanguage == 'en') {
      this.i18n.setLocale(en_US);
    }
    if (this.currentLanguage == 'zh') {
      this.i18n.setLocale(zh_CN);
    }
  }
}
