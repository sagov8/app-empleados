import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSliderModule } from '@angular/material/slider';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatSliderModule,
    MatToolbarModule,
    MatIconModule,
    MatTableModule
  ],
  exports: [
    MatSliderModule,
    MatToolbarModule,
    MatToolbarModule,
    MatIconModule,
    MatTableModule
  ]
})
export class AngularMaterialModule { }
