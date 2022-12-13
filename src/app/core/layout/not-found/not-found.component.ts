import { Component, OnInit } from '@angular/core';
import { UserProfileService } from '@services/user-profile.service';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
})
export class NotFoundComponent implements OnInit {
  constructor(private readonly service: UserProfileService) {}

  ngOnInit(): void {}

  onClick() {
    this.service.sendToken();
  }
}
