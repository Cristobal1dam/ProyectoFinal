import { Component, OnInit, Inject } from '@angular/core';
import { TutorService } from '../services/tutor.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-delete-tutor-dialog',
  templateUrl: './delete-tutor-dialog.component.html',
  styleUrls: ['./delete-tutor-dialog.component.scss']
})
export class DeleteTutorDialogComponent implements OnInit {
  intBorrar : string;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<DeleteTutorDialogComponent>,
              private tutorService: TutorService) { }

  ngOnInit() {
  }
  comprobarBorrar(){
    return this.intBorrar === "BORRAR"? true : false;
  }

  closeDialog(){
    this.dialogRef.close();
  }

  deleteTutor() {
    this.tutorService.delete(this.data.id).subscribe( () => {
   
    });
    this.dialogRef.close();
  }


}
