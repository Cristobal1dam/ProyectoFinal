import { Component, OnInit, ViewChild } from '@angular/core';
import { TutorResponse } from 'src/app/interfaces/TutorResponse.interface';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { TutorService } from '../services/tutor.service';
import { AddTutorDialogComponent } from '../add-tutor-dialog/add-tutor-dialog.component';

@Component({
  selector: 'app-list-tutores',
  templateUrl: './list-tutores.component.html',
  styleUrls: ['./list-tutores.component.scss']
})
export class ListTutoresComponent implements OnInit {
  displayedColumns: string[] = ['nombre', 'email','telefono','empresa','acciones'];
  
  dataSource: MatTableDataSource<TutorResponse>;
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private tutorService: TutorService,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.getTutorList();
  }

  getTutorList() {
    this.tutorService.getAll().subscribe(tutorList => {
    this.dataSource = new MatTableDataSource(tutorList.rows);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
      }, error =>{
        console.log(error);
        }
      );
    }
    openDialogNuevoTutor() {
      const dialogoNuevoTutor = this.dialog.open(AddTutorDialogComponent);
  
      dialogoNuevoTutor.afterClosed().subscribe(result => {
        this.getTutorList();
      });
  }
    /*openDialogDeleteEmpresa(empresa: EmpresaResponse) {
    const dialogDeleteEmpresa = this.dialog.open(DeleteEmpresaDialogComponent, {
      data: { id: empresa.id,
              nombre: empresa.nombre
            }

    });
    dialogDeleteEmpresa.afterClosed().subscribe(result => {
      this.getEmpresasList();
    });
  }*/
    applyFilter(filterValue: string) {
      this.dataSource.filter = filterValue.trim().toLowerCase();
    
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }
}



