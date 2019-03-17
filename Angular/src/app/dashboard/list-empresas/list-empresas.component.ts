import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { EmpresaResponse } from 'src/app/interfaces/EmpresaResponse.interface';
import { EmpresaService } from '../services/empresa.service';
import { AddEmpresaDialogComponent } from '../add-empresa-dialog/add-empresa-dialog.component';
import { DeleteEmpresaDialogComponent } from '../delete-empresa-dialog/delete-empresa-dialog.component';

@Component({
  selector: 'app-list-empresas',
  templateUrl: './list-empresas.component.html',
  styleUrls: ['./list-empresas.component.scss']
})
export class ListEmpresasComponent implements OnInit {

  displayedColumns: string[] = ['nombre', 'direccion','acciones'];
  
  dataSource: MatTableDataSource<EmpresaResponse>;
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private empresaService: EmpresaService,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.getEmpresasList()
   
  }
  getEmpresasList() {
    this.empresaService.getAll().subscribe(empresaList => {
    this.dataSource = new MatTableDataSource(empresaList.rows);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
      }, error =>{
        console.log(error);
        }
      );
    }
  
  openDialogNuevaEmpresa() {
      const dialogoNuevaEmpresa = this.dialog.open(AddEmpresaDialogComponent, {
        data: { add: true }
      });
      dialogoNuevaEmpresa.afterClosed().subscribe(result => {
        this.getEmpresasList();
      });
  }

  openDialogEditEmpresa(empresa:EmpresaResponse){
    const dialogEditEmpresa = this.dialog.open(AddEmpresaDialogComponent, {
      data: { add: false,
              id: empresa.id,
              nombre: empresa.nombre,
              direccion: empresa.direccion,
              loc: empresa.loc
            }

    });
    dialogEditEmpresa.afterClosed().subscribe(result => {
      this.getEmpresasList();
    });

  }
  openDialogDeleteEmpresa(empresa: EmpresaResponse) {
    const dialogDeleteEmpresa = this.dialog.open(DeleteEmpresaDialogComponent, {
      data: { id: empresa.id,
              nombre: empresa.nombre
            }

    });
    dialogDeleteEmpresa.afterClosed().subscribe(result => {
      this.getEmpresasList();
    });
  }
    applyFilter(filterValue: string) {
      this.dataSource.filter = filterValue.trim().toLowerCase();
    
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }
}
