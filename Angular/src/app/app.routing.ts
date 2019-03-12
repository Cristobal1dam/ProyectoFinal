import { Routes } from '@angular/router';

import { AdminLayoutComponent, AuthLayoutComponent } from './core';

export const AppRoutes: Routes = [{
  path:'',
  redirectTo: 'session/signin',
  pathMatch: 'full'
},{
  path: '',
  component: AdminLayoutComponent,
  children: [{
    path: '',
    loadChildren: './dashboard/dashboard.module#DashboardModule'
  }]
}, {
  path: '',
  component: AuthLayoutComponent,
  children: [{
    path: 'session',
    loadChildren: './session/session.module#SessionModule'
  }]
}, {
  path: '**',
  redirectTo: 'session/404'
},
];
