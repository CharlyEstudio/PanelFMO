import { RouterModule, Routes } from '@angular/router';

import { GeneralComponent } from './general/general.component';
import { AsesoresComponent } from './asesores/asesores.component';

const appRoutes: Routes = [
    {path: '', component: GeneralComponent},
    {path: 'asesores', component: AsesoresComponent},
    {path: '', redirectTo: '/', pathMatch: 'full'},
    {path: '**', component: GeneralComponent}
];

export const APP_ROUTES = RouterModule.forRoot( appRoutes, { useHash: true } );