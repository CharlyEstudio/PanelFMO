import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

// Servicios
import { PanelService, TimeLineService, OficinaService, HerramientasService } from './services.index';


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    PanelService,
    TimeLineService,
    OficinaService,
    HerramientasService
  ],
  declarations: []
})
export class ServicesModule { }
