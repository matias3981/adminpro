import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { retry, map, filter } from 'rxjs/operators';



@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  subsription: Subscription;
  constructor() {

    this.subsription = this.regresarObservable().subscribe(
      response => console.log('Subs', response),
      error => console.error('error', error),
      () => console.log('completado'));
   }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subsription.unsubscribe();
  }

  regresarObservable(): Observable<any> {

    return new Observable( (observer: Subscriber<any>) => {

      let contador = 0;

      const intervalo = setInterval(() => {

        contador += 1;

        const salida = {
          valor: contador
        };

        observer.next(salida);

        // if ( contador === 3) {
        //   clearInterval(intervalo);
        //   observer.complete();
        // }

        // if (contador === 2) {
        //   // clearInterval(intervalo);
        //   observer.error(contador);
        // }

      }, 1000);

    }).pipe(
      map( resp => resp.valor),
      filter( (valor, index) => {
        if ( (  valor % 2) === 1) {
          // valor impar
          return true;
        } else {
          return false;
        }
      })
    );
  }

}
