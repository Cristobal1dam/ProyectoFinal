import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule, MatCardModule, MatButtonModule, MatListModule, MatProgressBarModule, MatMenuModule, MatTableModule, MatSortModule, MatPaginatorModule, MatInputModule, MatDialogModule, MatSelectModule, MatSnackBarModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatFormFieldModule} from '@angular/material/form-field';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutes } from './dashboard.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListEmpresasComponent } from './list-empresas/list-empresas.component';
import { AddEmpresaDialogComponent } from './add-empresa-dialog/add-empresa-dialog.component';
import { DeleteEmpresaDialogComponent } from './delete-empresa-dialog/delete-empresa-dialog.component';
import { ListTutoresComponent } from './list-tutores/list-tutores.component';
import { AddTutorDialogComponent } from './add-tutor-dialog/add-tutor-dialog.component';
import { DeleteTutorDialogComponent } from './delete-tutor-dialog/delete-tutor-dialog.component';
import { ListUsusariosComponent } from './list-ususarios/list-ususarios.component';
import { AddUserDialogComponent } from './add-user-dialog/add-user-dialog.component';
import { DeleteUserDialogComponent } from './delete-user-dialog/delete-user-dialog.component';
import { ListAlumnosComponent } from './list-alumnos/list-alumnos.component';
import { AddAlumnoDialogComponent } from './add-alumno-dialog/add-alumno-dialog.component';
import { DeleteAlumnoDialogComponent } from './delete-alumno-dialog/delete-alumno-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(DashboardRoutes),
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatListModule,
    MatProgressBarModule,
    MatMenuModule,
    FlexLayoutModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatSelectModule,
    MatSnackBarModule
  ],
  entryComponents: [
    AddEmpresaDialogComponent,
    DeleteEmpresaDialogComponent,
    AddTutorDialogComponent,
    DeleteTutorDialogComponent,
    AddUserDialogComponent,
    DeleteUserDialogComponent,
    AddAlumnoDialogComponent,
    DeleteAlumnoDialogComponent
   
  ],
 
  declarations: [ DashboardComponent,
                  ListEmpresasComponent,
                  AddEmpresaDialogComponent,
                  DeleteEmpresaDialogComponent,
                  ListTutoresComponent,
                  AddTutorDialogComponent,
                  DeleteTutorDialogComponent,
                  ListUsusariosComponent,
                  AddUserDialogComponent,
                  DeleteUserDialogComponent,
                  ListAlumnosComponent,
                  AddAlumnoDialogComponent,
                  DeleteAlumnoDialogComponent ]
})

export class DashboardModule {}
