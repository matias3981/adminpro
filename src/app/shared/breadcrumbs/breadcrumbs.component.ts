import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: []
})
export class BreadcrumbsComponent implements OnInit {
  titulo: string;
  constructor(private route: Router,
              private title: Title) {
    this.getData().subscribe( resp => {
      this.titulo = resp.titulo;
      this.title.setTitle(this.titulo);
    });
  }

  ngOnInit() {
  }

  getData() {
    return this.route.events.pipe(
      filter(evento => evento instanceof ActivationEnd),
      filter((evento: ActivationEnd) => evento.snapshot.firstChild === null),
      map( evento => evento.snapshot.data)
    );
  }
}
