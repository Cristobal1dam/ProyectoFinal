import { Component, OnInit, ViewChild } from '@angular/core';
import { UsuarioResponse } from 'src/app/interfaces/UsuarioResponse.interface';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { UsuariosService } from '../services/usuarios.service';
import { AddUserDialogComponent } from '../add-user-dialog/add-user-dialog.component';
import { DeleteUserDialogComponent } from '../delete-user-dialog/delete-user-dialog.component';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-list-ususarios',
  templateUrl: './list-ususarios.component.html',
  styleUrls: ['./list-ususarios.component.scss']
})
export class ListUsusariosComponent implements OnInit {

  displayedColumns: string[] = ['name', 'email','acciones'];
  
  dataSource: MatTableDataSource<UsuarioResponse>;
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private usuarioService: UsuariosService,
              public dialog: MatDialog,
              private router: Router) { }

  ngOnInit() {
    this.getUsuariosList()
  }

  getUsuariosList() {
    this.usuarioService.getAll().subscribe(usuarioList => {
    this.dataSource = new MatTableDataSource(usuarioList.rows);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
      }, error =>{
        console.log(error);
        }
      );
    }

  openDialogNuevoUsuario() {
      const dialogoNuevoUsuario = this.dialog.open(AddUserDialogComponent);
  
      dialogoNuevoUsuario.afterClosed().subscribe(result => {
        this.getUsuariosList();
      });
  }

  openDialogDeleteUsuario(usuario: UsuarioResponse) {
    const dialogoDelteUsuario = this.dialog.open(DeleteUserDialogComponent, {
      data: { id: usuario.id,
              nombre: usuario.name
            }
    });
    dialogoDelteUsuario.afterClosed().subscribe(result => {
      this.getUsuariosList();
    });
  }


  verListaAlumnos(usuario: UsuarioResponse){

    let navigationExtras: NavigationExtras = {
      queryParams: {
          "id": usuario.id
      }
    };
    this.router.navigate(["alumnos"], navigationExtras);
  }
    
  

    applyFilter(filterValue: string) {
      this.dataSource.filter = filterValue.trim().toLowerCase();
    
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }

}
