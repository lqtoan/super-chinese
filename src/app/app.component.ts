import { AuthenticationService } from './core/authentication/authentication.service';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <ng-container *ngIf="authService.loading$ | async">
      <div class="loading-page">
        <nz-spin nzSize="large" nzSimple></nz-spin>
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

  constructor(public readonly authService: AuthenticationService) {}
}
