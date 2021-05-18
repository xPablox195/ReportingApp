import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { HeaderComponent } from '../header/header.component';
import { PopoverFiltroComponent } from '../popover-filtro/popover-filtro.component';
import { FormsModule } from '@angular/forms';
import { DatatableComponent } from '../datatable/datatable.component';



@NgModule({
  declarations: [
    HeaderComponent,
    PopoverFiltroComponent,
    DatatableComponent
  ],
  exports: [
    HeaderComponent,
    PopoverFiltroComponent,
    DatatableComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule
  ]
})
export class ComponentsModule { }
