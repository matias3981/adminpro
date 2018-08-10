import { Component, OnInit } from '@angular/core';
import { HospitalService, MedicoService } from '../../services/service.index';
import { Hospital } from '../../models/hospital.model';
import { Medico } from '../../models/medico.model';
import { NgForm } from '../../../../node_modules/@angular/forms';
import { Router, ActivatedRoute } from '../../../../node_modules/@angular/router';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: []
})
export class MedicoComponent implements OnInit {

  hospitales: Hospital[] = [];
  medico: Medico = new Medico('', '', '', '', '');
  hospital: Hospital = new Hospital('');

  constructor(public _hospitalService: HospitalService,
              public _medicoService: MedicoService,
              public route: Router,
              public activatedRoute: ActivatedRoute,
              public _modalUploadService: ModalUploadService) {

              activatedRoute.params.subscribe( (params: any) => {
                if ( params['id'] !== 'nuevo') {
                  console.log('ingresa', params['id']);
                  this.cargarMedico(params['id']);
                }
              });
            }

  ngOnInit() {
    this._hospitalService.cargarHospitales().subscribe((resp: any) => this.hospitales = resp.hospitales);
    this._modalUploadService.notificacion.subscribe(
      resp => {
        this.medico.img = resp.medico.img;
      }
    );
  }

guardarMedico(formulario: NgForm) {
  if (formulario.invalid) {
    return;
  }
  console.log(this.medico);

  this._medicoService.crearMedico(this.medico).subscribe((resp: any) => {
    this.medico = resp;
    this.route.navigate(['/medico', this.medico._id]);
  });
}

cambiarHospital(id: string) {
  this._hospitalService.obtenerHospital(id).subscribe((resp: any) => this.hospital = resp.hospital);
}

cargarMedico(id: string) {
  this._medicoService.obtenerMedico(id).subscribe((medico: any) => {
    this.medico = medico;
   this.medico.hospital = medico.hospital._id;
   this.cambiarHospital(this.medico.hospital);
    console.log(medico);
  });
}

cambiarImagen() {
  this._modalUploadService.mostrarModal('medicos', this.medico._id);
}
}
