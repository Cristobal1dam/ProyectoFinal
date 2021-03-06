import { Component, OnInit, Inject } from '@angular/core';
import { TutorDto } from 'src/app/dto/TutorDto.dto';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EmpresaService } from '../services/empresa.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { TutorService } from '../services/tutor.service';
import { EmpresaResponse } from 'src/app/interfaces/EmpresaResponse.interface';

@Component({
  selector: 'app-add-tutor-dialog',
  templateUrl: './add-tutor-dialog.component.html',
  styleUrls: ['./add-tutor-dialog.component.scss']
})
export class AddTutorDialogComponent implements OnInit {
  crearEditarString: string;
  tutor: TutorDto;
  empresas: EmpresaResponse[];
  public form: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<AddTutorDialogComponent>,
              private fb: FormBuilder,
              private empresaService: EmpresaService,
              private tutorService: TutorService,
              public snackBar: MatSnackBar) { }

  ngOnInit() {
    if(this.data.add){
      this.crearEditarString = "Crear"
    this.form = this.fb.group ( {
      nombre: ['' , Validators.compose ( [ Validators.required ] )],
      email: ['' , Validators.compose ( [ Validators.required ] )],
      telefono: ['' , Validators.compose ( [ Validators.required ] )],
      empresa: ['' , Validators.compose ( [ Validators.required ] )]

    } );
  }else{
    this.crearEditarString = "Editar"
    this.form = this.fb.group ( {
      nombre: [this.data.nombre , Validators.compose ( [ Validators.required ] )],
      email: [this.data.email , Validators.compose ( [ Validators.required ] )],
      telefono: [this.data.telefono , Validators.compose ( [ Validators.required ] )],
      empresa: ['' , Validators.compose ( [ Validators.required ] )]
    } );

  }
    this.getAllEmpresas();

  }
  closeDialog(){
    this.dialogRef.close();
  }

  onSubmit(){
    
    this.tutor = new TutorDto(this.form.controls['nombre'].value,
                                  this.form.controls['email'].value,
                                  this.form.controls['telefono'].value,
                                  this.form.controls['empresa'].value)

    if(this.data.add){
    this.tutorService.create(this.tutor).subscribe(tutorResp => {
        this.dialogRef.close();
      }, error => {
        this.snackBar.open('Error al crear tutor', 'Close', {
          duration: 3000,
          verticalPosition: 'top'
        });
      });
    }else{
    this.tutorService.edit(this.data.id, this.tutor).subscribe(tutorResp => {
      this.dialogRef.close();
    }, error => {
      this.snackBar.open('Error al editar tutor', 'Close', {
        duration: 3000,
        verticalPosition: 'top'
      });
    });
    }
  }

  getAllEmpresas(){
   
    

    this.empresaService.getAll().subscribe(empresaList => {
       this.empresas = empresaList.rows;
    
      }, error =>{
        console.log(error);
      });
  }

}
