import { Component, OnInit } from '@angular/core';
import { TutorDto } from 'src/app/dto/TutorDto.dto';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EmpresaService } from '../services/empresa.service';
import { MatDialogRef } from '@angular/material';
import { TutorService } from '../services/tutor.service';
import { EmpresaResponse } from 'src/app/interfaces/EmpresaResponse.interface';

@Component({
  selector: 'app-add-tutor-dialog',
  templateUrl: './add-tutor-dialog.component.html',
  styleUrls: ['./add-tutor-dialog.component.scss']
})
export class AddTutorDialogComponent implements OnInit {
  tutor: TutorDto;
  empresas: EmpresaResponse[];
  public form: FormGroup;

  constructor(public dialogRef: MatDialogRef<AddTutorDialogComponent>,
              private fb: FormBuilder,
              private empresaService: EmpresaService,
              private tutorService: TutorService) { }

  ngOnInit() {

    this.form = this.fb.group ( {
      nombre: ['' , Validators.compose ( [ Validators.required ] )],
      email: ['' , Validators.compose ( [ Validators.required ] )],
      telefono: ['' , Validators.compose ( [ Validators.required ] )],
      empresa: ['' , Validators.compose ( [ Validators.required ] )]

    } );
    this.getAllEmpresasDisp();

  }
  closeDialog(){
    this.dialogRef.close();
  }

  onSubmit(){
    
    this.tutor = new TutorDto(this.form.controls['nombre'].value,
                                  this.form.controls['email'].value,
                                  this.form.controls['telefono'].value,
                                  this.form.controls['empresa'].value)

    this.tutorService.create(this.tutor).subscribe(tutorResp => {
        this.dialogRef.close();
      });
  }

  getAllEmpresasDisp(){
    this.empresaService.getAllDisp().subscribe(empresaList => {
       this.empresas = empresaList;
    
      }, error =>{
        console.log(error);
      });
  }

}
