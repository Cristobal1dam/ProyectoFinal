import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule, MatCardModule, MatButtonModule, MatListModule, MatProgressBarModule, MatMenuModule, MatTableModule, MatSortModule, MatPaginatorModule, MatInputModule, MatDialogModule, MatSelectModule } from '@angular/material';
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
    MatSelectModule
  ],
  entryComponents: [
    AddEmpresaDialogComponent,
    DeleteEmpresaDialogComponent,
    AddTutorDialogComponent
   
  ],
 
  declarations: [ DashboardComponent,ListEmpresasComponent,AddEmpresaDialogComponent, DeleteEmpresaDialogComponent, ListTutoresComponent, AddTutorDialogComponent ]
})

export class DashboardModule {}
