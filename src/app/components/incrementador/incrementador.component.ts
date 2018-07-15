import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: []
})
export class IncrementadorComponent implements OnInit {
  @Input() progreso: number ;
  @Input() leyenda: string = 'Leyenda';

  @Output() cambioValor: EventEmitter<number> = new EventEmitter();

  @ViewChild('txtProgreso') txtProgreso: ElementRef;

  constructor() {}

  ngOnInit() {
    console.log(this.progreso);
  }

  onChangesValue ( newValue: number) {

    // let elemHTML: any = document.getElementsByName('progreso')[0];
    if (newValue >= 100) {

      newValue = 100;
    } else if ( newValue <= 0) {

      newValue = 0;
    }
      // elemHTML.value = newValue;
      this.txtProgreso.nativeElement.value = newValue;
      this.cambioValor.emit(newValue);

  }
  cambiar(valor: number) {
    if (this.progreso >= 100 && valor > 0) {
      this.progreso = 100;
      return;
    }

    if (this.progreso <= 0 && valor < 0) {
      this.progreso = 0;
      return;
    }

    this.progreso = this.progreso + valor;
    this.cambioValor.emit(this.progreso);
    this.txtProgreso.nativeElement.focus();
  }
}
