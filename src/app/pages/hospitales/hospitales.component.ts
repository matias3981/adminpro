import { Component, OnInit } from '@angular/core';
import { Hospital } from '../../models/hospital.model';
import { HospitalService } from '../../services/service.index';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

declare var swal;
@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {

  hospitales: Hospital;
  desde: number = 0;
  totalRegistros: number;

  constructor(public _hospitalService: HospitalService,
              public _modalUploadService: ModalUploadService) { }

  ngOnInit() {
    this.cargarHospitales();
    this._modalUploadService.notificacion.subscribe( resp => this.cargarHospitales() );
  }

  cambiarDesde(valor: number) {
    const desde = this.desde + valor;

    if ( desde < 0) {
      return;
    }

    if (desde > this.totalRegistros) {
      return;
    }

    this.desde += valor;
    console.log(this.desde);
    this.cargarHospitales(this.desde);
  }

  cargarHospitales(desde: number = 0) {
    this._hospitalService.cargarHospitales(desde).subscribe(
      (resp: any) => {
        this.hospitales = resp.hospitales;
        this.totalRegistros = resp.total_hospitales;
      }
    );
  }

  crearHospital() {

    swal({
      title: 'Crear Nuevo Hospital',
      text: 'Ingrese el nombre del nuevo Hospital',
      content: {
        element: 'input',
        attributes: {
          placeholder: 'Ingrese nombre del hospital',
          type: 'text',
        },
      },
    }).then(nombre => {
      if (!nombre) {
        swal('Ingrese un nombre!', '', 'error');
        return;
      }
      const hospital = new Hospital(nombre);
      this._hospitalService.crearHospital(hospital).subscribe(resp => this.cargarHospitales(this.desde));
    });
  }

  buscarHospital(valor: string) {
    if ( valor.length <= 0) {
      this.cargarHospitales();
      return;
    }

    this._hospitalService.buscarhospitales(valor).subscribe((resp: any) => this.hospitales = resp.hospitales);
  }

  modificarHospital(hospital: Hospital) {
      this._hospitalService.modificarHospital(hospital).subscribe();
  }

  eliminarHospital(hospital: Hospital) {
    swal({
      title: '¿Esta Seguro?',
      text: 'Una vezeliminado el hospital no se podra recuperar!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
    .then(borrado => {
      if (borrado) {
        this._hospitalService.borrarHospital(hospital).subscribe(resp => {
          console.log(resp);
          swal('El Hospital ha sido eliminado', {
            icon: 'success',
          }
        );
        this.cargarHospitales(this.desde);

        });

      }
    });
  }

  modificarImagen(hospital: Hospital) {
    this._modalUploadService.mostrarModal('hospitales', hospital._id);
  }

}
