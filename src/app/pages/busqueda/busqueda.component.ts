import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '../../../../node_modules/@angular/router';
import { HttpClient } from '../../../../node_modules/@angular/common/http';
import { URL_SERVICES } from '../../config/config';
import { Usuario } from '../../models/usuario.model';
import { Medico } from '../../models/medico.model';
import { Hospital } from '../../models/hospital.model';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: []
})
export class BusquedaComponent implements OnInit {

  usuarios: Usuario[] = [];
  medicos: Medico[] = [];
  hospitales: Hospital[] = [];
  constructor(
              public activatedRoute: ActivatedRoute,
              public http: HttpClient
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe( params => {
      const termino = params['termino'];
      this.buscar(termino);
            });
  }

  buscar(termino) {
    const url = URL_SERVICES + '/busqueda/todo/' + termino;

    return this.http.get(url).subscribe( (resp: any) => {
      this.usuarios = resp.usuarios;
      this.medicos = resp.medicos;
      this.hospitales = resp.hospitales;
    });
  }
}
