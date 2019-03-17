import { Routes } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { ListEmpresasComponent } from './list-empresas/list-empresas.component';
import { ListTutoresComponent } from './list-tutores/list-tutores.component';
import { ListUsusariosComponent } from './list-ususarios/list-ususarios.component';
import { ListAlumnosComponent } from './list-alumnos/list-alumnos.component';
import { 
  AuthGuardService as AuthGuard 
} from '../session/services/auth-guard.service';

export const DashboardRoutes: Routes = [
  {
  path: 'empresas',
  component: ListEmpresasComponent,
  //canActivate: [AuthGuard]
},
{
  path: 'tutores',
  component: ListTutoresComponent,
  //canActivate: [AuthGuard]
},
{
  path: 'usuarios',
  component: ListUsusariosComponent,
  //canActivate: [AuthGuard]
},
{
  path: 'alumnos',
  component: ListAlumnosComponent,
  //canActivate: [AuthGuard]
}
];
