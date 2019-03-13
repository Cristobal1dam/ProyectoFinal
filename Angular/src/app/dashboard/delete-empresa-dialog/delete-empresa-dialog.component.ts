import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { EmpresaService } from '../services/empresa.service';

@Component({
  selector: 'app-delete-empresa-dialog',
  templateUrl: './delete-empresa-dialog.component.html',
  styleUrls: ['./delete-empresa-dialog.component.scss']
})
export class DeleteEmpresaDialogComponent implements OnInit {
  intBorrar : string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<DeleteEmpresaDialogComponent>,
              private empresaService: EmpresaService) { }

  ngOnInit() {
  }
  comprobarBorrar(){
    return this.intBorrar === "BORRAR"? true : false;
  }


  closeDialog(){
    this.dialogRef.close();
  }

  deleteEmpresa() {
    this.empresaService.delete(this.data.id).subscribe( () => {
   
    });
    this.dialogRef.close();
  }
}
