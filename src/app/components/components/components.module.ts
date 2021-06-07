import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { HeaderComponent } from '../header/header.component';
import { PopoverFiltroComponent } from '../popover-filtro/popover-filtro.component';
import { FormsModule } from '@angular/forms';
import { DatatableComponent } from '../datatable/datatable.component';
import { FormDatatableComponent } from '../form-datatable/form-datatable.component';
import { PopoverActionsrowComponent } from '../popover-actionsrow/popover-actionsrow.component';

import { MaterialModule } from '../../material.module';

@NgModule({
  declarations: [
    HeaderComponent,
    PopoverFiltroComponent,
    DatatableComponent, FormDatatableComponent, PopoverActionsrowComponent
  ],
  exports: [
    HeaderComponent,
    PopoverFiltroComponent,
    DatatableComponent, FormDatatableComponent, PopoverActionsrowComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule
  ]
})
export class ComponentsModule { }
