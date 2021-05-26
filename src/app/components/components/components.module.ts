import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { HeaderComponent } from '../header/header.component';
import { PopoverFiltroComponent } from '../popover-filtro/popover-filtro.component';
import { FormsModule } from '@angular/forms';
import { DatatableComponent } from '../datatable/datatable.component';
import { FormDatatableComponent } from '../form-datatable/form-datatable.component';





@NgModule({
  declarations: [
    HeaderComponent,
    PopoverFiltroComponent,
    DatatableComponent, FormDatatableComponent
  ],
  exports: [
    HeaderComponent,
    PopoverFiltroComponent,
    DatatableComponent, FormDatatableComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule
  ]
})
export class ComponentsModule { }
