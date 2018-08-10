import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICES } from '../../config/config';
import { Hospital } from '../../models/hospital.model';
import { UsuarioService } from '../usuario/usuario.service';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  constructor(public http: HttpClient,
              public _usuarioService: UsuarioService,
              ) { }

  cargarHospitales(desde?: number) {
    const url = URL_SERVICES + '/hospital' + '?desde=' + desde;

    return this.http.get(url);
  }

  crearHospital(hospital: Hospital) {
    const url = URL_SERVICES + '/hospital?token=' + this._usuarioService.token;

    return this.http.post(url, hospital);
  }

  buscarhospitales(termino: string) {
    const url = URL_SERVICES + '/busqueda/coleccion/hospitales/' + termino;

    return this.http.get(url);
    }

  modificarHospital(hospital: Hospital) {
    const url = URL_SERVICES + '/hospital/' + hospital._id + '?token=' + this._usuarioService.token;

    return this.http.put(url, hospital).pipe(
      map( (resp: any) => {
        swal('Hospital Modificado', 'Se cambio a: ' + resp.hospital.nombre, 'success');
      })
    );

  }

  borrarHospital( hospital: Hospital) {
    const url = URL_SERVICES + '/hospital/' + hospital._id + '?token=' + this._usuarioService.token;

    return this.http.delete(url);
  }

 obtenerHospital( id: string ) {
   const url = URL_SERVICES + '/hospital/' + id;

   return this.http.get(url);
 }

}
