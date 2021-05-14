import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Papa } from 'ngx-papaparse';

@Component({
  selector: 'app-xls',
  templateUrl: './xls.page.html',
  styleUrls: ['./xls.page.scss'],
})
export class XlsPage implements OnInit {

  csvData: any[] = [];
  headerRow: any[] = [];

  constructor(private http: HttpClient, private papa: Papa) {
    this.loadCSV();
   }

   private loadCSV() {
    this.http
      .get('./assets/test.csv', {
        responseType: 'text'
      })
      .subscribe(
        data => this.extractData(data),
        err => console.log('something went wrong: ', err)
      );
  }

  private extractData(res) {
    let csvData = res || '';

    this.papa.parse(csvData, {
      complete: parsedData => {
        this.headerRow = parsedData.data.splice(0, 1)[0];
        this.csvData = parsedData.data;
      }
    });
  }

  ngOnInit() {
  }

}
