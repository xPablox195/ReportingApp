import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DataBasePage } from './data-base.page';

const routes: Routes = [
  {
    path: '',
    component: DataBasePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DataBasePageRoutingModule {}
