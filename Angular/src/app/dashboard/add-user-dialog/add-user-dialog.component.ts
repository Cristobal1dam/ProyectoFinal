import { Component, OnInit } from '@angular/core';
import { UserDto } from 'src/app/dto/UserDto.dto';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { CustomValidators } from 'ng2-validation';
import { UsuariosService } from '../services/usuarios.service';

const password = new FormControl('', Validators.required);
const confirmPassword = new FormControl('', CustomValidators.equalTo(password));

@Component({
  selector: 'app-add-user-dialog',
  templateUrl: './add-user-dialog.component.html',
  styleUrls: ['./add-user-dialog.component.scss']
})
export class AddUserDialogComponent implements OnInit {
  usuario: UserDto;
 
  public form: FormGroup;

  constructor(public dialogRef: MatDialogRef<AddUserDialogComponent>,
              private fb: FormBuilder,
              private usuarioService: UsuariosService) { }

  ngOnInit() {

    this.form = this.fb.group ( {
      name: ['' , Validators.compose ( [ Validators.required ] )],
      email: ['' , Validators.compose ( [ Validators.required ] )],
      password: password,
      confirmPassword : confirmPassword
    } );
  }

  closeDialog(){
    this.dialogRef.close();
  }

  onSubmit(){ 
    this.usuario = new UserDto(this.form.controls['name'].value,
                                  this.form.controls['email'].value,
                                  this.form.controls['password'].value)
    this.usuarioService.create(this.usuario).subscribe(usuarioResp => {
        this.dialogRef.close();
      });
  }

}
