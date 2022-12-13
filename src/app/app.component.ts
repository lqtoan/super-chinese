import { AuthenticationService } from './core/authentication/authentication.service';
import { ChangeDetectionStrategy, Component } from '@angular/core';
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
export class AppComponent {
  title = 'Super Chinese';

  constructor(public readonly authService: AuthenticationService, private readonly translateService: TranslateService) {
    this.authService.getAccessToken();
    this.translateService.addLangs(['en', 'vi', 'zh']);
  }
}
