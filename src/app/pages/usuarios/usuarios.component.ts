import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/service.index';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

declare var swal: any;

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {
  usuarios: Usuario[];
  desde: number = 0;
  totalRegistros: number;
  cargando: boolean;

  constructor(public _usuario: UsuarioService,
              public _modalUploadService: ModalUploadService) {}

  ngOnInit() {
    this.cargarUsuarios();
    this._modalUploadService.notificacion.subscribe( resp => this.cargarUsuarios() );
  }
  mostrarModal(id: string) {
    this._modalUploadService.mostrarModal('usuarios', id);
  }

  cargarUsuarios(desde: number = 0) {
    this.cargando = true;

    this._usuario.cargarUsuarios(desde).subscribe((resp: any) => {
      this.usuarios = resp.usuarios;
      this.totalRegistros = resp.total_usuarios;
      this.cargando = false;
    });
  }

  cambiarDesde(valor: number) {
    const desde = this.desde + valor;

    if (desde < 0) {
      return;
    }
    if (desde > this.totalRegistros) {
      return;
    }

    this.desde += valor;
    console.log(this.desde);
    this.cargarUsuarios(this.desde);
  }

  buscarUsuarios(valor: string) {
    if (valor.length <= 0) {
      return this.cargarUsuarios();
    }
    this._usuario
      .buscarUsuarios(valor)
      .subscribe((usuarios: Usuario[]) => (this.usuarios = usuarios));
    console.log(valor);
  }

  borarUsuario(usuario: Usuario) {
    if (usuario._id === this._usuario.usuario._id) {
      swal('No se puede borrar', 'No se puede eliminar a si mismo', 'error');
      return;
    }
    swal({
      title: '¿Esta seguro?',
      text: 'Una vez eliminado el usuario no se podra recuperar',
      icon: 'warning',
      buttons: true,
      dangerMode: true
    }).then(borrado => {

      if (borrado) {
        this._usuario.borrarUsuario(usuario._id).subscribe(
          resp => {
            console.log(resp);
            this.cargarUsuarios();
          }
        );
      }

    });
    console.log(usuario);
  }

  guardarUsuario(usuario: Usuario) {
    console.log(usuario);
    this._usuario.modificarUsuario(usuario).subscribe();
  }
}
