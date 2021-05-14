import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { XlsPageRoutingModule } from './xls-routing.module';

import { XlsPage } from './xls.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    XlsPageRoutingModule
  ],
  declarations: [XlsPage]
})
export class XlsPageModule {}
