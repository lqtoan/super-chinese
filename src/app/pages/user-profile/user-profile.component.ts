import { UserProfileStore } from './user-profile.store';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [UserProfileStore],
})
export class UserProfileComponent implements OnInit {
  constructor(private readonly store: UserProfileStore) {}

  readonly vm$ = this.store.vm$;

  ngOnInit(): void {
    this.store.loadData();
  }
}
