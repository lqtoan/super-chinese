import { NzMessageService } from 'ng-zorro-antd/message';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CourseStore } from './course.store';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CourseStore, NzMessageService],
})
export class CourseComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
