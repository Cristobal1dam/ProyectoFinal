import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { AlumnoResponse } from 'src/app/interfaces/AlumnoResponse.interface';
import { UsuariosService } from '../services/usuarios.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AlumnoListResponse } from 'src/app/interfaces/AlumnoListResponse.interface';
import * as moment from 'moment';

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
      alumno.visita = moment(alumno.visita).format('D MMM h:mm a')
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

}
