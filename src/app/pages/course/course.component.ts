import { NzMessageService } from 'ng-zorro-antd/message';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UserProfileService } from '@services/user-profile.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [NzMessageService],
})
export class CourseComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
