import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MenuComponents, ActionRow } from '../interfaces/interfaces';



@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getMenuComponents(){
    return this.http.get<MenuComponents[]>('assets/data/menu-components.json');
  }

  getPopOverActionsRow(){
    return this.http.get<ActionRow[]>('assets/data/popOverActionsRow.json');
  }

}
