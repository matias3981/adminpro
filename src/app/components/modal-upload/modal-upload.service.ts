import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalUploadService {

  public tipo: string;
  public id: string;
  public hide: string = 'hide';

  public notificacion = new EventEmitter<any>();

  constructor() {
    console.log('Modal service!!!');
   }

   ocultarModal() {
     this.hide = 'hide';
     this.id = null;
     this.tipo = null;

   }

   mostrarModal(tipo: string, id: string) {
     this.hide = '';
     this.id = id;
     this.tipo = tipo;
   }
}
