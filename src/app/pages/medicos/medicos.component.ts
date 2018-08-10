import { Component, OnInit } from '@angular/core';
import { Medico } from '../../models/medico.model';
import { MedicoService } from '../../services/service.index';

declare var swal;

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit {

  medicos: Medico[] = [];
  totalRegistros: number = 0;
  desde: number = 0;
  constructor(public _medicoService: MedicoService) { }

  ngOnInit() {
    this.cargarMedicos();
    }

  cargarMedicos() {
    this._medicoService.cargarMedicos(this.desde).subscribe((resp: any) => {
      this.medicos = resp.medicos;
      this.totalRegistros = resp.total_medicos;
      console.log(resp);
    });
  }

  buscarMedico(valor: string) {
    if (valor.length <= 0) {
      this.cargarMedicos();
      return;
    }

    this._medicoService.buscarMedico(valor).subscribe( (medico: any) => this.medicos = medico);
  }

  eliminarMedico(medico: Medico) {

    swal({
      title: '¿Esta Seguro?',
      text: 'Una vez eliminado el medico no se podra recuperar!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
    .then(borrado => {
      if (borrado) {
        this._medicoService.eliminarHospital(medico._id).subscribe( () => this.cargarMedicos());

        }
    });
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
    this.cargarMedicos();
  }

}
