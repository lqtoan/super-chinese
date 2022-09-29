import { CourseStore } from '../course.store';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss'],
  providers: [CourseStore],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseListComponent implements OnInit {
  constructor(private readonly store: CourseStore) {}

  readonly vm$ = this.store.vm$;

  ngOnInit(): void {
    this.store.loadData();
  }

  onCreate() {
    this.store.setShowForm(true);
  }
}
