import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Enviroment
import { environment } from '../environments/environment';

// Sockets
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

const config: SocketIoConfig = { url: environment.wsUrl, options: {} };

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
import { SelectFechaComponent } from './components/select-fecha/select-fecha.component';
import { AsesoresComponent } from './asesores/asesores.component';
import { GeneralComponent } from './general/general.component';
import { NavegacionComponent } from './components/navegacion/navegacion.component';
import { DonaComponent } from './components/dona/dona.component';
import { CobranzaComponent } from './cobranza/cobranza.component';

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
    TotalClientesComponent,
    SelectFechaComponent,
    AsesoresComponent,
    GeneralComponent,
    NavegacionComponent,
    DonaComponent,
    CobranzaComponent
  ],
  imports: [
    BrowserModule,
    APP_ROUTES,
    ServicesModule,
    ChartsModule,
    SocketIoModule.forRoot(config)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
