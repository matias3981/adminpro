import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICES } from '../../config/config';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  token: string;
  usuario: Usuario;

  constructor(public http: HttpClient,
              public route: Router,
              public _subirArchivoService: SubirArchivoService) {
    console.log('Servicio de Registro de Usuario');
    this.cargarStorage();
  }

  estaLoagueado() {
    return (this.token.length > 5) ? true : false;
  }


  cargarStorage() {
    if ( localStorage.getItem('token'))  {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse( localStorage.getItem('usuario'));
    } else {
      this.token = '';
      this.usuario = null;
    }
  }

  guardarStorage(id: string, token: string, usuario: Usuario) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
  }

  loginGoogle(token) {
    const url = URL_SERVICES + '/login/google';

    return this.http.post(url, { token }).pipe(
      map((resp: any) => {
        console.log(resp.token);
        this.guardarStorage(resp.id, resp.token, resp.usuario);
        this.token = resp.token;
        this.usuario = resp.usuario;

        return true;
      })
    );
  }

  login(usuario: Usuario, recordarme: boolean) {
    if (recordarme) {
      localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }

    const url = URL_SERVICES + '/login';

    return this.http.post(url, usuario).pipe(
      map((resp: any) => {
        console.log(resp);
        this.guardarStorage(resp.id, resp.token, resp.usuario);
        this.token = resp.token;
        this.usuario = resp.usuario;

        return true;
      })
    );
  }

  logout () {
    this.usuario = null;
    this.token = '';

    localStorage.removeItem('usuario');
    localStorage.removeItem('token');
    localStorage.removeItem('id');

    this.route.navigate(['/login']);
  }

  registrarUsuario(usuario: Usuario) {
    const url = URL_SERVICES + '/usuario';

    return this.http.post(url, usuario).pipe(
      map((resp: any) => {
        swal('Usuario Registrado!', usuario.email, 'success');
        return resp.usuario;
      })
    );
  }

  cargarUsuarios( desde: number ) {
    const url = URL_SERVICES + '/usuario?desde=' + desde;

    return this.http.get(url);
  }

  modificarUsuario( usuario: Usuario) {

    let url = URL_SERVICES + '/usuario/' + usuario._id;
    url += '?token=' + this.token;

    return this.http.put( url, usuario ).pipe(
      map( (resp: any) => {
        if ( usuario._id === this.usuario._id) {
          this.guardarStorage(resp.usuario.id, this.token, resp.usuario);
        }
        swal('Usuario Actualizado', resp.usuario.nombre, 'success');

        return true;
      })
    );
  }

  actualizarImagen( archivo: File, id: string) {
    this._subirArchivoService.subirArchivo(archivo, 'usuarios', id)
                  .then( (resp: any) => {
                    this.usuario.img = resp.usuario.img;
                    swal('Imagen Actualizada', '' , 'success');

                    this.guardarStorage(id, this.token, this.usuario);
                    console.log(resp);
                  })
                  .catch( resp => console.log(resp));
  }

  buscarUsuarios(termino: string) {
    const url = URL_SERVICES + '/busqueda/coleccion/usuarios/' + termino;
    return this.http.get(url).pipe(
      map((resp: any) => resp.usuarios)
    );
  }

  borrarUsuario(id: string) {
    const url = URL_SERVICES + '/usuario/' + id + '?token=' + this.token;

    return this.http.delete(url).pipe(
      map((resp: any) => {

        swal('Usuario eliminado', 'El usuario ' + resp.usuario.nombre + ' fue borrado', 'success');
        return true;
      })
    );
  }
}
