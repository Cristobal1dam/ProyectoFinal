import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { LoginDto } from 'src/app/dto/LoginDto.dto';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  public form: FormGroup;
  constructor(private fb: FormBuilder,
     private router: Router,
     private loginService: AuthService,
     public snackBar: MatSnackBar) {}

  ngOnInit() {
    localStorage.clear();
    this.form = this.fb.group ( {
      email: [null , Validators.compose ( [ Validators.required ] )] , password: [null , Validators.compose ( [ Validators.required ] )]
    } );
  }



  onSubmit() {
    console.log('Valroes del form => ' + this.form.value);
    const login: LoginDto = <LoginDto>this.form.value;
    this.loginService.login(login).subscribe(loginResp => {

      this.loginService.setLoginData(loginResp);
      console.log('ROL: ' + localStorage.getItem('role'));
      console.log('TOKEN: ' + localStorage.getItem('token'));
      console.log('NAME: ' + localStorage.getItem('name'));
      this.router.navigate ( [ '/empresas' ] );

    }, error => {
      this.snackBar.open('Error en el login', 'close', {
        duration: 3000,
        verticalPosition: 'top'
      });
      console.log('Error en petición de login');
      this.router.navigate ( [ '/' ] );
    }
    );
  }

}
