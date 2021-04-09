import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MenuComponents } from '../interfaces/interfaces';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getMenuComponents(){
    return this.http.get<MenuComponents[]>('assets/data/menu-components.json');
  }
}
