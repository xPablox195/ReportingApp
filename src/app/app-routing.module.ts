import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'menu',
    pathMatch: 'full'
  },
  {
    path: 'menu',
    loadChildren: () => import('./pages/menu/menu.module').then( m => m.MenuPageModule)
  },
  {
    path: 'report-mail',
    loadChildren: () => import('./pages/report-mail/report-mail.module').then( m => m.ReportMailPageModule)
  },  {
    path: 'data-base',
    loadChildren: () => import('./pages/data-base/data-base.module').then( m => m.DataBasePageModule)
  },
  {
    path: 'report-pending',
    loadChildren: () => import('./pages/report-pending/report-pending.module').then( m => m.ReportPendingPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
