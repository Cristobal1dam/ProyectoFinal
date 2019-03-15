import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AlumnoService } from '../services/alumno.service';

@Component({
  selector: 'app-delete-alumno-dialog',
  templateUrl: './delete-alumno-dialog.component.html',
  styleUrls: ['./delete-alumno-dialog.component.scss']
})
export class DeleteAlumnoDialogComponent implements OnInit {
  intBorrar : string;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<DeleteAlumnoDialogComponent>,
              private alumnoService: AlumnoService) { }

  ngOnInit() {
  }

  comprobarBorrar(){
    return this.intBorrar === "BORRAR"? true : false;
  }

  closeDialog(){
    this.dialogRef.close();
  }

  deleteAlumno() {
    this.alumnoService.delete(this.data.id).subscribe( () => {
   
    });
    this.dialogRef.close();
  }
}
