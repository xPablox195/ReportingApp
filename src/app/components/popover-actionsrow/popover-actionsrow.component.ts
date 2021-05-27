import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActionRow } from '../../interfaces/interfaces';
import { PopoverController } from '@ionic/angular';
import { DataService } from '../../services/data.service';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-popover-actionsrow',
  templateUrl: './popover-actionsrow.component.html',
  styleUrls: ['./popover-actionsrow.component.scss'],
})
export class PopoverActionsrowComponent implements OnInit {

  box: number;

  constructor(private popoverController: PopoverController, private dataService: DataService) { }

  actionRowList: Observable<ActionRow[]> = this.dataService.getPopOverActionsRow();

  ngOnInit() {

  }

  onClick(idActionRow: number){
    this.popoverController.dismiss({
      box: idActionRow
    });
    }
  }


