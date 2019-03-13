import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmpresaService } from '../services/empresa.service';
import { EmpresaDto } from 'src/app/dto/EmpresaDto.dto';

@Component({
  selector: 'app-add-empresa-dialog',
  templateUrl: './add-empresa-dialog.component.html',
  styleUrls: ['./add-empresa-dialog.component.scss']
})
export class AddEmpresaDialogComponent implements OnInit {
  empresa: EmpresaDto;
  public form: FormGroup;

  constructor(public dialogRef: MatDialogRef<AddEmpresaDialogComponent>,
    private fb: FormBuilder,
    private empresaService: EmpresaService) { }

  ngOnInit() {
    this.form = this.fb.group ( {
      nombre: ['' , Validators.compose ( [ Validators.required ] )],
      direccion: ['' , Validators.compose ( [ Validators.required ] )],
      loc: ['' , Validators.compose ( [ Validators.required ] )]
    } );
    
  }

  closeDialog(){
    this.dialogRef.close();
  }

  onSubmit(){
    
    this.empresa = new EmpresaDto(this.form.controls['nombre'].value,
                                  this.form.controls['direccion'].value,
                                  this.form.controls['loc'].value)

    this.empresaService.create(this.empresa).subscribe(EmpresaResponse => {

        this.dialogRef.close();
        
      });
  }

}
