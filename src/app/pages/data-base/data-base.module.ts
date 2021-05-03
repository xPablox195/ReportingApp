import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DataBasePageRoutingModule } from './data-base-routing.module';

import { DataBasePage } from './data-base.page';
import { ComponentsModule } from '../../components/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DataBasePageRoutingModule,
    ComponentsModule
  ],
  declarations: [DataBasePage]
})
export class DataBasePageModule {}
