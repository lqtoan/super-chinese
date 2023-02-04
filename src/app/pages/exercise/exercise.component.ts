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
  readonly vm$ = this.store.vm$;
  readonly tabIndex$ = this.store.tabIndex$;

  constructor(private readonly store: ExerciseStore) {}

  ngOnInit(): void {
    this.tabIndex$.subscribe((res) => {
      this.store.loadData(res);
    });
  }

  onSelectTab(tabIndex: number) {
    this.store.setTabIndex(tabIndex);
  }
}
