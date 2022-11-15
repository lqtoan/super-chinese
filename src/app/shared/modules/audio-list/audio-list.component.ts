import { ListDetailsContext, ListDetailsDirective } from './directives/list-details.directives';
import { ChangeDetectorRef, Component, ContentChildren, Input, QueryList, TemplateRef } from '@angular/core';
import { Audio, AudioConfiguration } from '@models/audio.model';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-audio-list',
  templateUrl: './audio-list.component.html',
  styleUrls: ['./audio-list.component.scss'],
})
export class AudioListComponent {
  @Input() audio: AudioConfiguration = {
    list: [],
    height: '6rem',
    isLoading: true,
  };
  currentPage: number = 1;
  selectedAudio?: Audio;

  onSelect(audio: Audio): void {
    this.selectedAudio = audio;
  }

  private readonly destroy$ = new Subject<void>();

  constructor(private readonly cdr: ChangeDetectorRef) {}

  @ContentChildren(ListDetailsDirective) readonly customDetails!: QueryList<ListDetailsDirective<AudioConfiguration>>;
  private detailsTemplates: Record<string, TemplateRef<ListDetailsContext<Audio>>> = {};

  ngAfterContentInit() {
    this.customDetails.changes.pipe(takeUntil(this.destroy$)).subscribe(() => this.mapCustomDetails());
    this.mapCustomDetails();
  }

  private mapCustomDetails() {
    this.detailsTemplates = this.customDetails.reduce(
      (acc, item) => ({ ...acc, [item.type || '']: item.template }),
      {}
    );
    this.cdr.markForCheck();
  }
}
