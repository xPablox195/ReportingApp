import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReportPendingPageRoutingModule } from './report-pending-routing.module';

import { ReportPendingPage } from './report-pending.page';
import { ComponentsModule } from '../../components/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReportPendingPageRoutingModule, ComponentsModule
  ],
  declarations: [ReportPendingPage]
})
export class ReportPendingPageModule {}
