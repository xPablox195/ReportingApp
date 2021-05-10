import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-popover-filtro',
  templateUrl: './popover-filtro.component.html',
  styleUrls: ['./popover-filtro.component.scss'],
})
export class PopoverFiltroComponent implements OnInit {

  constructor(private popoverController:PopoverController) { }

  ngOnInit() {}

  onClickAPlicarFiltro(){
    this.popoverController.dismiss();
  }
}
