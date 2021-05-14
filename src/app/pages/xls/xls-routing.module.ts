import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { XlsPage } from './xls.page';

const routes: Routes = [
  {
    path: '',
    component: XlsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class XlsPageRoutingModule {}
