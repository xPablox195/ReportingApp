import { Component, OnInit } from '@angular/core';
import { PendingreportsService } from '../../services/pendingreports.service';
import { Mail } from '../../interfaces/interfaces';

@Component({
  selector: 'app-report-pending',
  templateUrl: './report-pending.page.html',
  styleUrls: ['./report-pending.page.scss'],
})
export class ReportPendingPage implements OnInit {

  mailsPendientes: Mail[] = [];

  constructor(public pendingReportService: PendingreportsService) { }

  ngOnInit() {
    this.pendingReportService.getReportPendings()
    .subscribe((resp: Mail[])  =>  {
      console.log('Reportes', resp[0].payload.parts[0].body.data);

      // this.mailsPendientes.push(...resp);
    });
  }

}
