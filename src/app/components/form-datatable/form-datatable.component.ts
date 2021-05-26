import { Component, OnInit, Input } from '@angular/core';



@Component({
  selector: 'app-form-datatable',
  templateUrl: './form-datatable.component.html',
  styleUrls: ['./form-datatable.component.scss'],
})

export class FormDatatableComponent implements OnInit {

  @Input() mostrarFormulario: boolean;
  @Input() headerRow: any[];

  constructor() { }

  ngOnInit() {}

  onSubmit(){
    this.mostrarFormulario = false;
  }
}
