import { CourseStore } from '../course.store';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UserProfileService } from '@services/user-profile.service';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss'],
  // providers: [CourseStore],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseListComponent implements OnInit {
  constructor(private readonly store: CourseStore, private readonly userProfileService: UserProfileService) {}

  readonly vm$ = this.store.vm$;

  ngOnInit(): void {
    this.getUserProfile();

    this.store.loadData();
  }

  getUserProfile() {
    this.userProfileService.getUserProfile().subscribe();
  }

  onShowForm() {
    this.store.setShowForm(true);
  }

  onDelete(id: string) {
    this.store.deleteCourse(id);
  }

  cancel() {}
}
