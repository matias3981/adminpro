import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any[] = [{
    item: 'Principal',
    icono: 'mdi mdi-gauge',
    submenu: [
      {
        item: 'Dashboard',
        url: '/dashboard'
      },
      {
        item: 'ProgressBar',
        url: '/progress'
      },
      {
        item: 'Graficas',
        url: '/graficas1'
      }
    ]}
  ];

  constructor() { }
}
