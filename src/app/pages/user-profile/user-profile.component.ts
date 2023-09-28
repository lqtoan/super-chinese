import { UserProfileStore } from '../../core/state/user-profile.store';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [UserProfileStore],
})
export class UserProfileComponent implements OnInit {
  readonly vm$ = this._store.vm$;

  constructor(private readonly _store: UserProfileStore) {}

  ngOnInit(): void {
    this._store.loadData();
  }
}
