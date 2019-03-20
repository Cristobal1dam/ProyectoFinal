import { Routes } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { ListEmpresasComponent } from './list-empresas/list-empresas.component';
import { ListTutoresComponent } from './list-tutores/list-tutores.component';
import { ListUsusariosComponent } from './list-ususarios/list-ususarios.component';
import { ListAlumnosComponent } from './list-alumnos/list-alumnos.component';


export const DashboardRoutes: Routes = [
  {
  path: 'empresas',
  component: ListEmpresasComponent,

},
{
  path: 'tutores',
  component: ListTutoresComponent,

},
{
  path: 'usuarios',
  component: ListUsusariosComponent,

},
{
  path: 'alumnos',
  component: ListAlumnosComponent,

}
];
