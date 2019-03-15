import { Component, OnInit, Inject } from '@angular/core';
import { AlumnoService } from '../services/alumno.service';
import { TutorService } from '../services/tutor.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AlumnoDto } from 'src/app/dto/AlumnoDto.dto';
import { TutorResponse } from 'src/app/interfaces/TutorResponse.interface';
import { TutorDispResponse } from 'src/app/interfaces/TutorDispResponse.interface';

@Component({
  selector: 'app-add-alumno-dialog',
  templateUrl: './add-alumno-dialog.component.html',
  styleUrls: ['./add-alumno-dialog.component.scss']
})
export class AddAlumnoDialogComponent implements OnInit {
  alumno: AlumnoDto;
  tutores: TutorDispResponse[];
  public form: FormGroup;

  constructor(public dialogRef: MatDialogRef<AddAlumnoDialogComponent>,
              private fb: FormBuilder,
              private alumnoService: AlumnoService,
              private tutorService: TutorService,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {

    this.form = this.fb.group ( {
      nombre: ['' , Validators.compose ( [ Validators.required ] )],
      email: ['' , Validators.compose ( [ Validators.required ] )],
      telefono: ['' , Validators.compose ( [ Validators.required ] )],
      tutor: ['' , Validators.compose ( [ Validators.required ] )]
    } );

    this.getAllTutoresDisp()
  }

  closeDialog(){
    this.dialogRef.close();
  }

  onSubmit(){
    
    this.alumno = new AlumnoDto(this.form.controls['nombre'].value,
                                  this.form.controls['email'].value,
                                  this.form.controls['telefono'].value,
                                  this.form.controls['tutor'].value)

    this.alumnoService.create(this.data.id,this.alumno).subscribe(tutorResp => {
        this.dialogRef.close();
      });
  }

  getAllTutoresDisp(){
    this.tutorService.getAllDisp().subscribe(tutorList => {
       this.tutores = tutorList;
      console.log(this.tutores)
      }, error =>{
        console.log(error);
      });
  }

}
