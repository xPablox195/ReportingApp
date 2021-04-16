import { Component, OnInit } from '@angular/core';
import { PhotoService } from '../../services/photo.service';
import { ChecksBoxs } from '../../interfaces/interfaces';
import { HttpClient } from '@angular/common/http';

const formData = new FormData();

@Component({
  selector: 'app-report-mail',
  templateUrl: './report-mail.page.html',
  styleUrls: ['./report-mail.page.scss'],
})
export class ReportMailPage implements OnInit {
  constructor(public photoService: PhotoService, public http: HttpClient) {}

  datosReporteApiGmail = {
    pak: 'ABA',
    order: 22,
    program: 'ababdda',
    date: new Date(),
    description: 'No funciona la pantalla',
    operation: 'Abastecimientos prim',
    user: 'pluparia',
    labels: ['Error'],
  };

  imagesReporteApiGmail = {
    images: [],
  };

  Checks: ChecksBoxs[] = [
    {
      name: 'Performance',
      selected: false,
      color: 'primary',
    },
    {
      name: 'Campo',
      selected: false,
      color: 'secondary',
    },
    {
      name: 'Visual',
      selected: false,
      color: 'tertiary',
    },
    {
      name: 'Fatal',
      selected: false,
      color: 'success',
    },
    {
      name: 'Performance',
      selected: false,
      color: 'warning',
    },
  ];
  blob: Blob;

  async ngOnInit() {}

  addPhotoToGallery() {
    this.photoService.addNewToGallery();
  }

  OnSubmit() {
    this.rellenarArrayChecks();
    this.rellenarArrayPhotos();
    this.datosReporteApiGmail.order = Number(this.datosReporteApiGmail.order);
    console.log(this.datosReporteApiGmail);
    this.sendDataApiGmail();
  }

  rellenarArrayChecks() {
    for (const check of this.Checks) {
      if (check.selected === true) {
        this.datosReporteApiGmail.labels.push(check.name);
      }
    }
  }

  rellenarArrayPhotos() {
    this.photoService.loadSaved();
    this.imagesReporteApiGmail.images = this.photoService.photos;
  }

  async sendDataApiGmail() {
    formData.append('report', JSON.stringify(this.datosReporteApiGmail));

    let attached = [];

    for (let image of this.imagesReporteApiGmail.images) {
      let response = await fetch(image.webviewPath);
      attached.push(response.blob());
    }
    let results = await Promise.all(attached);
    console.log(results);

    results.forEach((attachment, index) => {
      formData.append('images', attachment, `pantalla${index}.jpg`);
    });

    this.http
      .post('http://localhost:3000/reports', formData)
      .toPromise()
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }
}
