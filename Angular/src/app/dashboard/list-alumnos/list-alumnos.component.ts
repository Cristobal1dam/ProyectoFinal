import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { AlumnoResponse } from 'src/app/interfaces/AlumnoResponse.interface';
import { UsuariosService } from '../services/usuarios.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AlumnoListResponse } from 'src/app/interfaces/AlumnoListResponse.interface';
import * as moment from 'moment';
import { AddAlumnoDialogComponent } from '../add-alumno-dialog/add-alumno-dialog.component';
import { DeleteAlumnoDialogComponent } from '../delete-alumno-dialog/delete-alumno-dialog.component';

@Component({
  selector: 'app-list-alumnos',
  templateUrl: './list-alumnos.component.html',
  styleUrls: ['./list-alumnos.component.scss']
})
export class ListAlumnosComponent implements OnInit {
  

  displayedColumns: string[] = ['nombre','telefono', 'empresa','visita','acciones'];

  idUsuario: String;
  
  dataSource: MatTableDataSource<AlumnoResponse>;
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private usuarioService: UsuariosService,
              public dialog: MatDialog,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.getAlumnosList()
  }

  getAlumnosList() {
    moment.locale('es')
    this.route.queryParams.subscribe(params => {
      this.idUsuario = params["id"];
  });

    this.usuarioService.getAlumnoList(this.idUsuario).subscribe(alumnoList => {
      
    alumnoList.alumnos.forEach(alumno => {
      
      if (alumno.visita == null){
      alumno.visita = "No tiene visita"
      
      }else{
      alumno.visita = moment(alumno.visita).format('D MMM h:mm a')}
  
    })
      
    this.dataSource = new MatTableDataSource(alumnoList.alumnos);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
      }, error =>{
        console.log(error);
        }
      );
    }

    applyFilter(filterValue: string) {
      this.dataSource.filter = filterValue.trim().toLowerCase();
    
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }

    
  openDialogEditAlumno(alumno: AlumnoResponse) {
    const dialogoEditAlumno = this.dialog.open(AddAlumnoDialogComponent, {
      data: { id: this.idUsuario,
              idAlumno: alumno.alumnoid,
              add: false   }
    });

    dialogoEditAlumno.afterClosed().subscribe(result => {
      this.getAlumnosList();
    });
}

    openDialogNuevoAlumno() {
      const dialogAddAlumno = this.dialog.open(AddAlumnoDialogComponent, {
        data: { id: this.idUsuario,
                add: true}       
      });
      dialogAddAlumno.afterClosed().subscribe(result => {
        this.getAlumnosList();
      });
    }

    openDialogDeleteAlumno(alumno: AlumnoResponse) {
      const dialogDeleteAlumno = this.dialog.open(DeleteAlumnoDialogComponent, {
        data: { id: alumno.alumnoid,
                nombre: alumno.nombre}       
      });
      dialogDeleteAlumno.afterClosed().subscribe(result => {
        this.getAlumnosList();
      });
    }



}
