import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import swal from 'sweetalert';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';
import { Router } from '@angular/router';

declare function init_plugins();

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})
export class RegisterComponent implements OnInit {

  forma: FormGroup ;
  constructor(
    public _usuario: UsuarioService,
    public route: Router
  ) { }

  ngOnInit() {
    init_plugins();

    this.forma = new FormGroup({
      nombre: new FormControl( null, Validators.required),
      correo: new FormControl( null, [Validators.required, Validators.email]),
      password: new FormControl( null, Validators.required),
      confirmPassword: new FormControl( null,  Validators.required),
      condiciones: new FormControl( false )
    }, this.sonIguales('password', 'confirmPassword') );
  }

  sonIguales(campo1, campo2) {

    return (group: FormGroup ) => {
      const password1 = group.controls[campo1].value;
      const password2 = group.controls[campo2].value;

      if ( password1 === password2) {
        return null;
      }

      return {
        sonIguales: true
      };
    };
  }

  registrarUsuario() {
   if (this.forma.invalid) {
     return;
   }
   if (!this.forma.controls.condiciones.value) {
     swal('Atención', 'Debe de aceptar las condiciones', 'warning');
     return;
   }

   const usuario: Usuario = new Usuario(
      this.forma.value.nombre,
      this.forma.value.correo,
      this.forma.value.password,
   );


  this._usuario.registrarUsuario(usuario).subscribe(
    resp => { this.route.navigate(['/login']); }
  );
    console.log(this.forma.value);
    console.log(this.forma.valid);
  }
}
