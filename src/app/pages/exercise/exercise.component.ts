import { ExerciseStore } from './exercise.store';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ExerciseStore],
})
export class ExerciseComponent implements OnInit {
  readonly vm$ = this._store.vm$;
  readonly tabIndex$ = this._store.tabIndex$;

  constructor(private readonly _store: ExerciseStore) {}

  ngOnInit(): void {
    this.tabIndex$.subscribe((res) => {
      this._store.loadData(res);
    });
  }

  onSelectTab(tabIndex: number) {
    this._store.setTabIndex(tabIndex);
  }
}
