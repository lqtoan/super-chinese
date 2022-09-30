import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormatPricePipe } from './pipes';

@NgModule({
  declarations: [FormatPricePipe],
  exports: [FormatPricePipe],
  imports: [CommonModule],
})
export class PipesModule {}
