import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReportPendingPage } from './report-pending.page';

const routes: Routes = [
  {
    path: '',
    component: ReportPendingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportPendingPageRoutingModule {}
