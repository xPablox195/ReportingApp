import { Component, OnInit } from '@angular/core';
import { PhotoService } from '../../services/photo.service';
import { ChecksBoxs } from '../../interfaces/interfaces';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Share } from '@capacitor/core';

const formData = new FormData();



@Component({
  selector: 'app-report-mail',
  templateUrl: './report-mail.page.html',
  styleUrls: ['./report-mail.page.scss'],
})


export class ReportMailPage implements OnInit {
  constructor(
    public photoService: PhotoService,
    public http: HttpClient,
    private router: Router,
    private navCtrl: NavController
  ) {}

  datosReporteApiGmail = {
    pak: '',
    order: 0,
    program: '',
    date: new Date(),
    description: '',
    operation: '',
    user: '',
    labels: ['Error'],
  };

  imagesReporteApiGmail = {
    images: [],
  };

  Checks: ChecksBoxs[] = [
    {
      name: 'Campo',
      selected: false,
      color: 'secondary',
      description: 'falta contulta',
    },
    {
      name: 'Visual',
      selected: false,
      color: 'tertiary',
      description: 'no visualiza bien un campo, solapamiento',
    },
    {
      name: 'Fatal',
      selected: false,
      color: 'success',
      description: 'se cuelga el navegador, debo reiniciar la app',
    },
    {
      name: 'Performance',
      selected: false,
      color: 'warning',
      description: 'consulta en vuelo o reporte demoran en responder',
    },
    {
      name: 'Funcionalidad',
      selected: false,
      color: 'primary',
      description: 'no se imprimen mensajes, pop ups',
    },
  ];
  blob: Blob;

  verProgressbarSubmit = false;

  async ngOnInit() {

  }

  addPhotoToGallery() {
    this.photoService.addNewToGallery();
  }

  OnSubmit() {
    this.verProgressbarSubmit = !this.verProgressbarSubmit;
    this.rellenarArrayChecks();
    this.rellenarArrayPhotos();
    this.datosReporteApiGmail.order = Number(this.datosReporteApiGmail.order);
    console.log('UNO');
    console.log(this.datosReporteApiGmail);
    this.sendDataApiGmail().then((res) => {
      console.log('DOS');
      this.eliminarPhotos();
      console.log('TRES');
      location.reload ();
      // this.navCtrl.navigateRoot('/menu', { animated: true, animationDirection: 'forward' });
    })
    .catch((err) => {
      console.log('CUATRO');
      console.log(err);
    });
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

    const attached = [];

    for (const image of this.imagesReporteApiGmail.images) {
      const response = await fetch(image.webviewPath);
      attached.push(response.blob());
    }
    const results = await Promise.all(attached);
    console.log(results);

    results.forEach((attachment, index) => {
      formData.append('images', attachment, `pantalla${index}.jpg`);
    });

    return this.http
      .post('http://172.172.0.39:3000/reports', formData)
      .toPromise();
  }

  async eliminarPhotos(){
    for (const [index, photo] of this.photoService.photos.entries()) {
        console.log(index);
        console.log(photo);
        this.photoService.deletePicture(photo, index);
    }
  }

  onClickPhoto(photo: any, index: number){
    this.photoService.deletePicture(photo, index);
  }

  async compartir(){
    await Share.share({
      title: 'lo consegui',
      url: 'https://www.google.com.ar/'
    });
  }
}
