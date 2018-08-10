import { Injectable } from '@angular/core';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any[] = [];
  // menu: any[] = [{
  //   item: 'Principal',
  //   icono: 'mdi mdi-gauge',
  //   submenu: [
  //     {
  //       item: 'Dashboard',
  //       url: '/dashboard'
  //     },
  //     {
  //       item: 'ProgressBar',
  //       url: '/progress'
  //     },
  //     {
  //       item: 'Graficas',
  //       url: '/graficas1'
  //     },
  //     {
  //       item: 'Rxjs',
  //       url: '/rxjs'
  //     }
  //   ]},
  //   {
  //     item: 'Mantenimiento',
  //     icono: 'mdi mdi-folder-lock',
  //     submenu: [
  //       {
  //       item: 'Usuarios', url: '/usuarios'
  //     },
  //       {
  //       item: 'Medicos', url: '/medicos'
  //     },
  //       {
  //       item: 'Hospitales', url: '/hospitales'
  //     }
  //   ]
  //   }
  // ];

  constructor(public _usuarioService: UsuarioService) {

  }

  cargarMenu() {
    this.menu = this._usuarioService.menu;
  }
}
