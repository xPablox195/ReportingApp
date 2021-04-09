import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReportMailPage } from './report-mail.page';

const routes: Routes = [
  {
    path: '',
    component: ReportMailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportMailPageRoutingModule {}
