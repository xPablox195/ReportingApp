import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Papa } from 'ngx-papaparse';
import { Platform } from '@ionic/angular';
import { File } from '@ionic-native/file/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { RowListOptions } from '../../interfaces/interfaces';





@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.scss'],
})


export class DatatableComponent implements OnInit {

  csvData: any[] = [];
  headerRow: any[] = [];
  lengthHeader: number;
  lengthData: number;
  arrayEmpty: any[] = [];

  arrayPaginado: any[] = [];
  selectBoxCountRow: number;
  csvDataBackup: any[] = [];

  numeroPaginas: number;
  contadorPagActal: number;
  irPagina: number;


  customPopoverOptions: any = {
    header: 'Items per page',
    message: 'Selecciona la cantidad de registros por pagina'
  };

  constructor(private http: HttpClient, private papa: Papa, private plt: Platform, private socialSharing: SocialSharing,
              private file: File)
              {
                this.loadCSV();
              }

  rowListOptions: RowListOptions[] = [
    {
      id: 5,
      message: 5,
    },
    {
      id: 10,
      message: 10,
    },
    {
      id: 15,
      message: 15,
    },
    {
      id: 20,
      message: 20,
    },
  ];

  ngOnInit() {
    this.contadorPagActal = 1;
    this.selectBoxCountRow = 0;
    this.numeroPaginas = 1;
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
    const csvData = res || '';

    this.papa.parse(csvData, {
      complete: parsedData => {
        this.headerRow = parsedData.data.splice(0, 1)[0];
        this.lengthHeader = this.headerRow.length;
        // console.log(this.csvData.length); // tamaño de los datos
        // console.log(this.headerRow.length); // tamaño del header
        this.csvData = parsedData.data;
        this.csvDataBackup = this.csvData; // para cantidad de registros (filtro)
        this.lengthData = this.csvData.length;
        // console.log(csvData);
      }
    });
  }

  exportCSV(){
    const csv = this.papa.unparse({
      fields: this.headerRow,
      data: this.csvData
    });
    if (this.plt.is('cordova')) {
      this.file.writeFile(this.file.dataDirectory, 'data.csv', csv, {replace: true}).then( res => {
        this.socialSharing.share(null, null, res.nativeURL, null).then(e => {
          // Success
        }).catch(e => {
          console.log('Share failed:', e);
        });
      }, err => {
        console.log('Error: ', err);
      });

    } else {
      // Dummy implementation for Desktop download purpose
      const blob = new Blob([csv]);
      const a = window.document.createElement('a');
      a.href = window.URL.createObjectURL(blob);
      a.download = 'newdata.csv';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  }

  trackByFn(index: any, item: any) {
    return index;
  }

  onDeleteRow(i: number){
    this.csvData.splice(i, 1);
    this.csvDataBackup.forEach((item, index) => {
      if (index === 0 && this.csvDataBackup[0] !== this.csvData[0]){
        this.csvDataBackup.splice(index, 1);
      }else{
        if (item === this.csvData[index]){
          if (this.csvDataBackup[index + 1] !== this.csvData[index + 1]){
            this.csvDataBackup.splice(index + 1, 1);
          }
        }
      }
    });

    this.actualizarcsvBackup();
  }

  addRowEmpty(i: number){
    // console.log(this.csvData[i]);
    this.lengthData++;
    for ( let k = 0 ; k < this.lengthHeader ; k++)
    {
      this.arrayEmpty.push('');
    }
    // console.log(this.arrayEmpty);
    // console.log(this.csvData);
    this.csvDataBackup.forEach((item, index) => {
        if (item === this.csvData[i])
        {
            this.csvDataBackup.splice(index + 1, 0 ,  this.arrayEmpty);
          }
    });
    this.arrayEmpty = [];
    this.actualizarcsvBackup();
  }

  selectCountRow(evento: any){
    this.actualizarcsvBackup();
  }

  actualizarcsvBackup(){
    if (this.selectBoxCountRow === 0){
      this.csvData = this.csvDataBackup;
    }else{
      this.numeroPaginas = Math.trunc((this.csvDataBackup.length / this.selectBoxCountRow));

      this.irPagina = this.contadorPagActal - 1;

      this.csvData = [];

      for (let i = 0; i < this.selectBoxCountRow ; i ++){
        this.csvData.splice(i, 0, this.csvDataBackup[this.irPagina]);
        this.irPagina++;
      }

    }
  }

  calcularNumerodePaginas()
  {
      return(Math.trunc((this.csvDataBackup.length / this.selectBoxCountRow)));
  }

  onClick(){
    this.contadorPagActal ++;
  }

}

