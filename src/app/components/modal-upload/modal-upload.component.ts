import { Component, OnInit } from '@angular/core';
import { SubirArchivoService } from '../../services/service.index';
import { ModalUploadService } from './modal-upload.service';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styleUrls: ['./modal-upload.component.css']
})
export class ModalUploadComponent implements OnInit {

  imagenASubir: File;
  imagenTemp: string;
  constructor(public _subirArchivoService: SubirArchivoService,
              public _modalUploadService: ModalUploadService) { }

  ngOnInit() {
  }

  cerrarModal() {
    this.imagenASubir = null;
    this.imagenTemp = null;

    this._modalUploadService.ocultarModal();
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

  asignarImagen() {

    this._subirArchivoService.subirArchivo(this.imagenASubir, this._modalUploadService.tipo, this._modalUploadService.id)
    .then( resp => {
      this._modalUploadService.notificacion.emit(resp);
      this.cerrarModal();

    })
    .catch( err => console.log('Error en la carga', err));
  }
}
