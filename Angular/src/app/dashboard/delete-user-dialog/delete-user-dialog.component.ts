import { Component, OnInit, Inject } from '@angular/core';
import { UsuariosService } from '../services/usuarios.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-delete-user-dialog',
  templateUrl: './delete-user-dialog.component.html',
  styleUrls: ['./delete-user-dialog.component.scss']
})
export class DeleteUserDialogComponent implements OnInit {
  intBorrar : string;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<DeleteUserDialogComponent>,
              private usuarioService: UsuariosService) { }

  ngOnInit() {
  }

  comprobarBorrar(){
    return this.intBorrar === "BORRAR"? true : false;
  }

  closeDialog(){
    this.dialogRef.close();
  }

  deleteUsuario() {
    this.usuarioService.delete(this.data.id).subscribe( () => {
   
    });
    this.dialogRef.close();
  }

}
