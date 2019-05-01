import { Component, OnInit } from '@angular/core';

import {Comic} from '../../comic/comic';
import {VendedorService} from '../vendedor.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-vendedor-comic-list',
  templateUrl: './vendedor-comic-list.html'
})
export class VendedorComicListComponent implements OnInit {

  isCollapsed=true;
  comics: Comic[];
vendedorId:number;
  constructor(private vendedorService: VendedorService, private route: ActivatedRoute,) { }

  getComics(): void {
    this.vendedorService.getComicsVendedor(this.vendedorId)
      .subscribe(c => {
        this.comics = c;
      });
  }

  ngOnInit() {
    this.vendedorId = +this.route.snapshot.paramMap.get('id');
    this.getComics();
 
     
   
     
    

  }
}