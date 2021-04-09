import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReportMailPageRoutingModule } from './report-mail-routing.module';

import { ReportMailPage } from './report-mail.page';
import { ComponentsModule } from '../../components/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReportMailPageRoutingModule,
    ComponentsModule
  ],
  declarations: [ReportMailPage]
})
export class ReportMailPageModule {}
