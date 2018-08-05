import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/service.index';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: []
})
export class PerfilComponent implements OnInit {

  usuario: Usuario;

  imagenASubir: File;
  imagenTemp: string;

  constructor(public _usuario: UsuarioService) {
    this.usuario = _usuario.usuario;
  }

  ngOnInit() {
  }

  actualizarUsuario( usuario: Usuario) {

    this.usuario.nombre = usuario.nombre;
    if (!this.usuario.google) {
      this.usuario.email = usuario.email;
    }

    this._usuario.modificarUsuario(this.usuario).subscribe(
      resp => console.log(resp)
    );
  }

  subirImagen( archivo ) {


    if (!archivo) {
      this.imagenASubir = null;
      return;
    }
    console.log(archivo);

    if (archivo.type.indexOf('image') < 0) {
      console.log('no Image');
      swal('Atención!', 'El archivo seleccionado no es una imagen', 'error');
      this.imagenASubir = null;
      return;
    }
    this.imagenASubir = archivo;

    const reader = new FileReader();
    const urlImagenTemp = reader.readAsDataURL( archivo );

    reader.onloadend = () => {
      this.imagenTemp = reader.result;
    };
  }

  cambiarImagen() {
    this._usuario.actualizarImagen( this.imagenASubir, this.usuario._id);
  }

}
