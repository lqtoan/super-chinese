import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UserProfileService } from '@services/user-profile.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseComponent implements OnInit {
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
