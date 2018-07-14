import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [{
        path: '',
        component: PagesComponent,
        children: [
            { path: 'progress', component: ProgressComponent },
            { path: 'graficas1', component: Graficas1Component },
            { path: 'dashboard', component: DashboardComponent },
            { path: '', pathMatch: 'full', redirectTo: '/dashboard' }
        ] }
    ];

export const PAGES_ROUTES = RouterModule.forChild(routes);
