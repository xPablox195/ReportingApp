import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { MenuComponents } from '../../interfaces/interfaces';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  menuItem: Observable<MenuComponents[]>;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.menuItem = this.dataService.getMenuComponents();
    console.log(this.menuItem);
  }


}
