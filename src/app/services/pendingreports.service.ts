import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Mail} from '../interfaces/interfaces';


@Injectable({
  providedIn: 'root'
})
export class PendingreportsService {

  constructor(private http: HttpClient) {}
  getReportPendings(){
    return this.http.get<Mail[]>('http://172.172.0.39:3000/reports?labels=Error&labels=Fatal&from=2021-03-23');
  }
}
