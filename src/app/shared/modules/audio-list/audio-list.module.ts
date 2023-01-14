import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AudioListComponent } from './audio-list.component';
import { TranslateModule } from '@ngx-translate/core';

const nzModules = [NzIconModule, NzButtonModule];

@NgModule({
  declarations: [AudioListComponent],
  imports: [CommonModule, NgxPaginationModule, nzModules, TranslateModule],
  exports: [AudioListComponent],
})
export class AudioListModule {}
