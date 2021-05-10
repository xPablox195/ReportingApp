import { Component, OnInit } from '@angular/core';
import { PendingreportsService } from '../../services/pendingreports.service';
import { Mail } from '../../interfaces/interfaces';
import { PopoverController } from '@ionic/angular';
import { PopoverFiltroComponent } from '../../components/popover-filtro/popover-filtro.component';

@Component({
  selector: 'app-report-pending',
  templateUrl: './report-pending.page.html',
  styleUrls: ['./report-pending.page.scss'],
})
export class ReportPendingPage implements OnInit {

  mailsPendientes: Mail[] = [];

  constructor(public pendingReportService: PendingreportsService, private popoverController: PopoverController) { }

  ngOnInit() {
    this.pendingReportService.getReportPendings()
    .subscribe((resp: Mail[])  =>  {
      console.log('Reportes', resp[0].payload.parts[0].body.data);

      // this.mailsPendientes.push(...resp);
    });
  }

  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: PopoverFiltroComponent,
      cssClass: 'my-custom-class',
      event: ev,
      translucent: true
    });
    await popover.present();

    const { role } = await popover.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }


}
