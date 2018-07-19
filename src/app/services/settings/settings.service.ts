import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  ajuste: Ajustes = {
    temaUrl: 'assets/css/colors/default.css',
    tema: 'default'
  };

  constructor(@Inject(DOCUMENT) private _document) {
    this.cargarTema();
   }

  guardarTema() {

    localStorage.setItem('ajustes', JSON.stringify(this.ajuste));
  }

  cargarTema() {

    if ( localStorage.getItem('ajustes') ) {

      this.ajuste = JSON.parse(localStorage.getItem('ajustes'));
      this.insertarTema(this.ajuste.tema);

    } else {

      this.insertarTema(this.ajuste.tema);
    }
  }

  insertarTema(tema: string) {
    const url = `assets/css/colors/${ tema }.css`;
    this._document.getElementById('tema').setAttribute('href', url);

    this.ajuste.tema = tema;
    this.ajuste.temaUrl = url;

    this.guardarTema();
  }
}

interface Ajustes {
  temaUrl: string;
  tema: string;
}
