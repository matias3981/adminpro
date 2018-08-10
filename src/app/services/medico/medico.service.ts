import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICES } from '../../config/config';
import { map } from '../../../../node_modules/rxjs/operators';
import { UsuarioService } from '../usuario/usuario.service';
import { Medico } from '../../models/medico.model';

declare var swal;
@Injectable({
  providedIn: 'root'
})
export class MedicoService {


  constructor(public http: HttpClient,
              public _usuarioService: UsuarioService) { }

  cargarMedicos(desde: number) {
    const url = URL_SERVICES + '/medico' + '?desde=' + desde;

    return this.http.get(url);
  }

  buscarMedico(termino: string) {
    const url = URL_SERVICES + '/busqueda/coleccion/medicos/' + termino;

    return this.http.get(url).pipe(
      map( resp => resp['medicos'])
    );
  }

  eliminarHospital(id: string) {
    const url = URL_SERVICES + '/medico/' + id + '?token=' +  this._usuarioService.token;

    return this.http.delete(url).pipe(
      map( () => {
        swal('Medico Eliminado', 'El medico se eliminó correctamente', 'success');
      }
      )
    );
  }

  crearMedico(medico: Medico) {
    let url = URL_SERVICES + '/medico';
    console.log('medico', medico);
    if ( medico._id) {
      url += '/' + medico._id + '?token=' + this._usuarioService.token;
      console.log('Actualiza', medico._id);
      return this.http.put(url, medico).pipe(
        map( (resp: any) => {
          swal('Médico Actualizado', resp.medico.nombre, 'success');
          return resp.medico;
        }
        )
      );
    } else {
      url += '?token=' + this._usuarioService.token;
      console.log('Crea', medico);
      return this.http.post(url, medico).pipe(
        map( (resp: any) => {
          swal('Médico Creado', resp.medico.nombre, 'success');
          return resp.medico;
        }

        )
      );
    }

  }

  obtenerMedico(id: string) {
    const url = URL_SERVICES + '/medico/' + id;

    return this.http.get(url).pipe(
      map(resp => resp['medico'])
    );
  }
}
