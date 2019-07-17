import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Servicio
import { ServicesModule } from './services/services.module';

// Graficas ng2-charts
import { ChartsModule } from 'ng2-charts';

import { AppComponent } from './app.component';
import { APP_ROUTES } from './app.routes';
import { BajarComponent } from './components/bajar/bajar.component';
import { SurtirComponent } from './components/surtir/surtir.component';
import { FacturadoComponent } from './components/facturado/facturado.component';
import { CanceladoComponent } from './components/cancelado/cancelado.component';
import { TimeLineComponent } from './components/time-line/time-line.component';
import { TotalPedidosComponent } from './components/total-pedidos/total-pedidos.component';
import { OutTimeComponent } from './components/out-time/out-time.component';
import { GraficaComponent } from './components/grafica/grafica.component';
import { FacturasComponent } from './components/facturas/facturas.component';
import { TotalClientesComponent } from './components/total-clientes/total-clientes.component';

@NgModule({
  declarations: [
    AppComponent,
    BajarComponent,
    SurtirComponent,
    FacturadoComponent,
    CanceladoComponent,
    TimeLineComponent,
    TotalPedidosComponent,
    OutTimeComponent,
    GraficaComponent,
    FacturasComponent,
    TotalClientesComponent
  ],
  imports: [
    BrowserModule,
    APP_ROUTES,
    ServicesModule,
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
