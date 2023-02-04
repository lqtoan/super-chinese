import { CurriculumStore } from './curriculum.store';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-curriculum',
  templateUrl: './curriculum.component.html',
  styleUrls: ['./curriculum.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CurriculumStore],
})
export class CurriculumComponent implements OnInit {
  readonly vm$ = this.store.vm$;
  readonly tabIndex$ = this.store.tabIndex$;

  constructor(private readonly store: CurriculumStore) {}

  ngOnInit(): void {
    this.tabIndex$.subscribe((res) => {
      this.store.loadData(res);
    });
  }

  onSelectTab(tabIndex: number) {
    this.store.setTabIndex(tabIndex);
  }
}
