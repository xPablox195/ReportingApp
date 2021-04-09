import { Component, OnInit } from '@angular/core';
import { PhotoService } from '../../services/photo.service';
import { ChecksBoxs } from '../../interfaces/interfaces';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-report-mail',
  templateUrl: './report-mail.page.html',
  styleUrls: ['./report-mail.page.scss'],
})
export class ReportMailPage implements OnInit {

  constructor(public photoService: PhotoService, public http: HttpClient) { }

  datosReporteApiGmail = {
    pack: '',
    order: '',
    program: '',
    date: '',
    description: '',
    operation: '',
    user: '',
    images: [],
    labels: []
  };

  Checks: ChecksBoxs[] = [{
    name: 'Rendimiento',
    selected: false,
    color: 'primary'
  },
  {
    name: 'Campo',
    selected: false,
    color: 'secondary'
  },
  {
    name: 'Visual',
    selected: false,
    color: 'tertiary'
  },
  {
    name: 'Fatal',
    selected: false,
    color: 'success'
  },
  {
    name: 'Performance',
    selected: false,
    color: 'warning'
  },
];


  ngOnInit() {
  }

  addPhotoToGallery() {
    this.photoService.addNewToGallery();
  }

  OnSubmit(){
    this.rellenarArrayChecks();
    this.rellenarArrayPhotos();
    this.sendDataApiGmail();
    console.log(this.datosReporteApiGmail);
  }

  rellenarArrayChecks(){
    for (const check of this.Checks){
      if (check.selected === true){
        this.datosReporteApiGmail.labels.push(check.name);
      }
    }
  }

  rellenarArrayPhotos(){
    this.datosReporteApiGmail.images.push(this.photoService.photos);
  }

  sendDataApiGmail(){
    return this.http.post('http://aluparia:3000/reports', this.datosReporteApiGmail).subscribe(data => {
      console.log(data['_body']);
     }, error => {
      console.log(error);
    });
}
}
