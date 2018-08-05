import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../services/service.index';
import { FormGroup } from '@angular/forms';
import { Usuario } from '../models/usuario.model';

declare function init_plugins();
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  recuerdame = false;
  email: string;
  auth2: any;

  constructor( public route: Router,
               public _usuario: UsuarioService) { }

  ngOnInit() {
    init_plugins();
    this.googleInit();

    this.email = localStorage.getItem('email') || '';
    if (this.email.length > 1) {
      this.recuerdame = true;
    }
  }

  googleInit() {

    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '774751991007-nm71gfvnv8uf758pr0v9i13eh422msh5.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });
      this.attachSignIn( document.getElementById('googleButton'));

    });
  }

  attachSignIn ( element ) {
    this.auth2.attachClickHandler( element, {}, (googleUser) => {

      // const profile = googleUser.getBasicProfile();
      const token = googleUser.getAuthResponse().id_token;

      this._usuario.loginGoogle(token).subscribe(
        resp => this.route.navigate(['/dashboard'])
      );
      console.log(token);
    } );
  }
  ingresar(form: FormGroup) {

   const usuario = new Usuario(null, form.value.email, form.value.password);

    this._usuario.login(usuario, form.value.recuerdame).subscribe(
      resp => this.route.navigate(['/dashboard'])
    );
    console.log(form.value);
    console.log(form.valid);


    // this.route.navigate(['/dashboard']);
  }

}
