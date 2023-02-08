import { BehaviorSubject } from 'rxjs';
import { AuthenticationService } from './core/authentication/authentication.service';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  template: `
    <ng-container *ngIf="isLogging$ | async; else homePage">
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
  isLogging$ = new BehaviorSubject<boolean>(true);

  constructor(public readonly authService: AuthenticationService, private readonly translateService: TranslateService) {
    // this.authService.getAccessToken();
    this.translateService.addLangs(['en', 'vi', 'zh']);
    setTimeout(() => {
      this.isLogging$.next(false);
    }, 2000);
  }
}
