import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';


@Injectable({
  providedIn: 'root'
})
export class LoginGuardGuard implements CanActivate {
  constructor( public _usuario: UsuarioService,
                public route: Router) {}

  canActivate() {
    if ( this._usuario.estaLoagueado()) {
      return true;
    } else {
      console.log('bloqueado por guard');
      this.route.navigate(['/login']);
      return false;
    }
  }
}
