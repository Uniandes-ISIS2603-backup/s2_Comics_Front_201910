import { Component, OnInit, Input,OnChanges ,ViewChild,ViewContainerRef} from '@angular/core';

import {Vendedor} from '../../vendedor/vendedor';
import { Comic } from '../../Comic/Comic';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit, OnChanges {

  public isCollapsed = true;
  vendedor:Vendedor;
  comics:Comic;

  constructor() { }

  ngOnInit() {
  }
  ngOnChanges(){
    this.ngOnInit();
}


}
