import { AuthenticationService } from './core/authentication/authentication.service';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  template: `
    <ng-container *ngIf="authService.loading$ | async">
      <div class="loading-page">
        <span><nz-spin nzSize="large" nzSimple></nz-spin></span>
        <h3 class="slogan">{{ 'SLOGAN' | translate }}</h3>
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
    this.translateService.addLangs(['en', 'vi', 'zh']);
  }
}
