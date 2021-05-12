import { Component } from '@angular/core';
import {registerWebPlugin} from '@capacitor/core';
import {FileSharer} from '@byteowls/capacitor-filesharer';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor() {
    this.initializeApp();
  }

  initializeApp(){
   registerWebPlugin(FileSharer);
  }
}
