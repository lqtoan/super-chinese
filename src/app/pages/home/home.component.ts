import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AudioService } from '@services/audio.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  constructor(public readonly audioService: AudioService) {}

  ngOnInit(): void {}

  cancel() {}
}
