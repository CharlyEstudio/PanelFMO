import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

// Servicios
import { PanelService } from './panel.service';
import { TimeLineService } from './time-line.service';



@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    PanelService,
    TimeLineService
  ],
  declarations: []
})
export class ServicesModule { }
