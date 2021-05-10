import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { HeaderComponent } from '../header/header.component';
import { PopoverFiltroComponent } from '../popover-filtro/popover-filtro.component';



@NgModule({
  declarations: [
    HeaderComponent,
    PopoverFiltroComponent
  ],
  exports: [
    HeaderComponent,
    PopoverFiltroComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class ComponentsModule { }
