import { Routes } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { ListEmpresasComponent } from './list-empresas/list-empresas.component';
import { ListTutoresComponent } from './list-tutores/list-tutores.component';

export const DashboardRoutes: Routes = [
  {
  path: 'empresas',
  component: ListEmpresasComponent
},
{
  path: 'tutores',
  component: ListTutoresComponent
}
];
