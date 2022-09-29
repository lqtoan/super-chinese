import { CourseStore } from './../course.store';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss'],
})
export class CourseFormComponent implements OnInit {
  constructor(private readonly store: CourseStore) {}

  readonly isVisibleForm$ = this.store.isVisibleForm$;

  ngOnInit(): void {}

  onClose() {
    this.store.setShowForm(false);
  }
}
