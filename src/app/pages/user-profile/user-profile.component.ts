import { UserProfileService } from '@services/user-profile.service';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserProfileComponent implements OnInit {
  constructor(private readonly userProfileService: UserProfileService) {}

  user$ = this.userProfileService.user$;

  ngOnInit(): void {
    this.userProfileService.user$.pipe().subscribe();

    this.getUserProfile();
  }

  getUserProfile() {
    this.userProfileService.getUserProfile().subscribe();
  }
}
