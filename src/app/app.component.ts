import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`,
})
export class AppComponent {
  title = 'Super Chinese';

  constructor(private translateService: TranslateService) {
    this.translateService.addLangs(['en', 'vi']);
  }
}
