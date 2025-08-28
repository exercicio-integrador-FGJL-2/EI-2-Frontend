import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { requireUserGuard } from './core/require-user.guard';

export const routes: Routes = [
 
  { path: '', component: HomeComponent, pathMatch: 'full' },

  {
    path: 'dashboard',
    loadComponent: () =>
      import('./pages/dashboard/dashboard').then(m => m.DashboardComponent),
    canActivate: [requireUserGuard],
  },
  {
    path: 'agendamento',
    loadComponent: () =>
      import('./components/agendamento/agendamento').then(m => m.AgendamentoComponent),
    canActivate: [requireUserGuard],
  },
  {
    path: 'gerenciamento',
    loadComponent: () =>
      import('./pages/gerenciamento/gerenciamento').then(m => m.GerenciamentoComponent),
    canActivate: [requireUserGuard],
  },
  {
    path: 'estatisticas',
    loadComponent: () =>
      import('./pages/estatisticas/estatisticas').then(m => m.EstatisticasComponent),
    canActivate: [requireUserGuard],
  },

  
  { path: '**', redirectTo: '' },
];
