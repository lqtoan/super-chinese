import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../core/authentication/authentication.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainPageComponent implements OnInit {
  year: Date = new Date();

  constructor(public readonly authService: AuthenticationService) {}

  ngOnInit(): void {}
}
