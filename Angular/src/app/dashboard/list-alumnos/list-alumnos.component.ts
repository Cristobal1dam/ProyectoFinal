import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { AlumnoResponse } from 'src/app/interfaces/AlumnoResponse.interface';
import { UsuariosService } from '../services/usuarios.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AlumnoListResponse } from 'src/app/interfaces/AlumnoListResponse.interface';

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
  

    this.route.queryParams.subscribe(params => {
      this.idUsuario = params["id"];
  });
  console.log("ID USUARIO " + this.idUsuario )
    this.usuarioService.getAlumnoList(this.idUsuario).subscribe(alumnoList => {
      console.log("Lista alumnos " + alumnoList.alumnos )
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
