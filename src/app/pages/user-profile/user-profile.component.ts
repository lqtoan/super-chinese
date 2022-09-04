import { Observable, Subject, tap } from 'rxjs';
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
  constructor(public readonly userProfileService: UserProfileService) {}

  ngOnInit(): void {
    this.userProfileService.user$.pipe().subscribe((user) => {
      console.log(user);
    });

    this.getUserProfile();
  }

  getUserProfile() {
    this.userProfileService.getUserProfile().subscribe((user) => {
      console.log(user);
    });
  }
}
