import { Component, OnInit, ViewChild  } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-data-base',
  templateUrl: './data-base.page.html',
  styleUrls: ['./data-base.page.scss'],
})
export class DataBasePage implements OnInit {
  ionite: string;
  displayedColumns: string[] = ['first_name', 'last_name', 'twitter'];
  dataSource = new MatTableDataSource<any>([
    {
      first_name: 'Max',
      last_name: 'Lynch',
      twitter: 'maxlynch'
    },
    {
      first_name: 'Matt',
      last_name: 'Netkow',
      twitter: 'dotNetkow'
    },
    {
      first_name: 'Ben',
      last_name: 'Sperry',
      twitter: 'benjsperry'
    }
  ]);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  userForm: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;


    this.userForm = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
    });
  }

}
