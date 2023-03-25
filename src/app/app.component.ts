import { AuthenticationService } from './core/authentication/authentication.service';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  template: `
    <ng-container *ngIf="authService.loading$ | async; else homePage">
      <div class="loading-page">
        <span><nz-spin nzSize="large"></nz-spin></span>
        <h4 class="slogan">{{ 'SLOGAN' | translate }}</h4>
      </div>
    </ng-container>
    <ng-template #homePage>
      <router-outlet></router-outlet>
    </ng-template>
  `,
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  title = 'Super Chinese';

  constructor(private readonly translateService: TranslateService, public readonly authService: AuthenticationService) {
    this.authService.getAccessToken();
    this.translateService.addLangs(['en', 'vi', 'zh']);
  }
}
