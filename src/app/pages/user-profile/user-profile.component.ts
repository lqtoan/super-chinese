import { UserProfile } from '@models/user-profile.model';
import { UserProfileService } from '@services/user-profile.service';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserProfileComponent implements OnInit {
  constructor(private readonly userProfileService: UserProfileService) {}

  user: UserProfile = {
    email: '',
    email_verified: false,
    name: '',
    nickname: '',
    picture: '',
    sub: '',
    updated_at: new Date(),
  };

  ngOnInit(): void {
    this.userProfileService.getUserProfile().subscribe((res) => {
      this.user = res;
    });
  }
}
