import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { XlsPageRoutingModule } from './xls-routing.module';

import { XlsPage } from './xls.page';
import { ComponentsModule } from '../../components/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    XlsPageRoutingModule,
    ComponentsModule
  ],
  declarations: [XlsPage]
})
export class XlsPageModule {}
