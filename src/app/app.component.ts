import { DictionaryService } from '@services/dictionary.service';
import { AuthenticationService } from './core/authentication/authentication.service';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  template: `
    <ng-container *ngIf="authService.loading$ | async">
      <div class="loading-page">
        <span><nz-spin nzSize="large"></nz-spin></span>
        <h4 class="slogan">{{ 'SLOGAN' | translate }}</h4>
      </div>
    </ng-container>
    <router-outlet></router-outlet>
  `,
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  title = 'Super Chinese';

  constructor(
    public readonly authService: AuthenticationService,
    private readonly translateService: TranslateService,
    private readonly dictionaryService: DictionaryService
  ) {
    this.authService.getAccessToken();
    this.translateService.addLangs(['en', 'vi', 'zh']);
  }

  ngOnInit(): void {
    setInterval(() => {
      this.dictionaryService.getLatestWords();
    }, 600000);
  }
}
