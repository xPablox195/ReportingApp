import { Component, OnInit, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Papa } from 'ngx-papaparse';
import { Platform } from '@ionic/angular';
import { File } from '@ionic-native/file/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { RowListOptions, CustomPopover, ActionRow } from '../../interfaces/interfaces';
import { PopoverController } from '@ionic/angular';
import { PopoverActionsrowComponent } from '../popover-actionsrow/popover-actionsrow.component';
import { DataService } from '../../services/data.service';

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

  // Registros por página
  arrayPaginado: any[] = [];
  selectBoxCountRow: number;
  csvDataBackup: any[] = [];

  // Paginado (rigth - left, etc)
  numeroPaginas: number; // numero de paginas de la tablas, si esta establecida la cantidad de registros.
  contadorPagActal: number; // establece la pàgina que se està presentando.
  irPagina: number;

  // Completar Formulario
  mostrarFormulario: boolean;
  mostrarTabla = true;


  CustomPopooverRowList: CustomPopover = {
    header: 'Items per page',
    message: 'Selecciona la cantidad de registros por pagina'
  };


  constructor(private http: HttpClient, private papa: Papa, private plt: Platform, private socialSharing: SocialSharing,
              private file: File, private popoverController: PopoverController, private dataService: DataService)
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

  async popOverActionsRow(indexRow: number, ev: any) {
    const popover = await this.popoverController.create({
      component: PopoverActionsrowComponent,
      cssClass: 'my-custom-class',
      event: ev,
      translucent: true
    });
    await popover.present();
    const { data } = await popover.onWillDismiss();
    switch (data.box){
      case 0: {this.addRowEmpty(indexRow); break; }
      case 1: {this.onDeleteRow(indexRow); break; }
      case 2: break;
      case 3: break;
      default: break;
    }

  }



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
    this.csvDataBackup.forEach((item, index) => {
      if (item === this.csvData[i]){
        this.csvDataBackup.splice(index, 1);
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
      this.numeroPaginas = Math.ceil((this.csvDataBackup.length / this.selectBoxCountRow));

      this.irPagina = (this.contadorPagActal - 1) * 5;

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

  rigth(){
    if ( this.selectBoxCountRow !== 0 && this.contadorPagActal < this.numeroPaginas){
      this.contadorPagActal ++;
      this.actualizarcsvBackup();
    }
  }

  left(){
    if ( this.selectBoxCountRow !== 0 && this.contadorPagActal !== 1){
      this.contadorPagActal --;
      this.actualizarcsvBackup();
    }

  }

  finalLeft(){
    if ( this.selectBoxCountRow !== 0 && this.contadorPagActal !== 1){
      this.contadorPagActal = 1;
      this.actualizarcsvBackup();
    }
  }


  finalRigth(){
    if ( this.selectBoxCountRow !== 0 && this.contadorPagActal < this.numeroPaginas){
      this.contadorPagActal = this.numeroPaginas;
      this.actualizarcsvBackup();
    }
  }


  completarFormulario(){
    if ( this.mostrarFormulario === true){
      this.mostrarFormulario = false;
      this.mostrarTabla = true;
    }else{
      this.mostrarFormulario = true;
      this.mostrarTabla = false;
    }
  }

  onClick(){}
}

