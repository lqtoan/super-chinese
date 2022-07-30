import { MainPageRoutingModule } from './main-page-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPageComponent } from './main-page.component';
import { TranslateModule } from '@ngx-translate/core';
import { NzIconModule } from 'ng-zorro-antd/icon';

const nzModules = [NzIconModule];

@NgModule({
  declarations: [MainPageComponent],
  imports: [CommonModule, TranslateModule, MainPageRoutingModule, nzModules],
})
export class MainPageModule {}
