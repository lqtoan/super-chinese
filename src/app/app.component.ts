import { Component } from '@angular/core';
import { NzI18nService } from 'ng-zorro-antd/i18n';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Super Chinese';

  constructor(private translateService: TranslateService, private readonly nzI18Service: NzI18nService) {
    this.translateService.addLangs(['en', 'vi']);
  }
}
