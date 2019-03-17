import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmpresaService } from '../services/empresa.service';
import { EmpresaDto } from 'src/app/dto/EmpresaDto.dto';
import { GeoService } from '../services/geo.service';

@Component({
  selector: 'app-add-empresa-dialog',
  templateUrl: './add-empresa-dialog.component.html',
  styleUrls: ['./add-empresa-dialog.component.scss']
})
export class AddEmpresaDialogComponent implements OnInit {
  empresa: EmpresaDto;
  public form: FormGroup;
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<AddEmpresaDialogComponent>,
              private fb: FormBuilder,
              private empresaService: EmpresaService,
              private geoService: GeoService) { }

  ngOnInit() {
    if(this.data.add){
    this.form = this.fb.group ( {
      nombre: ['' , Validators.compose ( [ Validators.required ] )],
      direccion: ['' , Validators.compose ( [ Validators.required ] )]
    } );
  }else{
    this.form = this.fb.group ( {
      nombre: [this.data.nombre , Validators.compose ( [ Validators.required ] )],
      direccion: [this.data.direccion , Validators.compose ( [ Validators.required ] )]
    } );

  }
    
  }

  closeDialog(){
    this.dialogRef.close();
  }
  onSubmit(){

    this.geoService.getLocation(this.form.controls['direccion'].value).subscribe(r => {
      let loc
      loc = r.Response.View[0].Result[0].Location.DisplayPosition.Latitude;
      loc = loc+','+r.Response.View[0].Result[0].Location.DisplayPosition.Longitude;

      this.empresa = new EmpresaDto(this.form.controls['nombre'].value,
                                  this.form.controls['direccion'].value,
                                  loc)
    if(this.data.add){
    this.empresaService.create(this.empresa).subscribe(EmpresaResponse => {

        this.dialogRef.close();
        
      });
    }else {
    this.empresaService.edit(this.data.id,this.empresa).subscribe(EmpresaResponse => {

      this.dialogRef.close();
      
    });
  }

    })
    
    
}

}
