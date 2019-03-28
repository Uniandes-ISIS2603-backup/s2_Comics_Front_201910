import { Component,Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { VendedorService } from '../vendedor.service';
import { VendedorDetail } from '../vendedor-detail';

import { Vendedor } from '../vendedor';
@Component({
  selector: 'app-vendedor-detail',
  templateUrl: './vendedor-detail.component.html',
  styleUrls: ['./vendedor-detail.component.css']
})
export class VendedorDetailComponent implements OnInit {
     vendedorDetail: VendedorDetail;
  constructor(
    private route: ActivatedRoute,
        private vendedorService: VendedorService
  ) { }



vendedorId: number;

 getVendedorDetail(): void {
        this.vendedorService.getVendedorDetail(this.vendedorId)
            .subscribe(vendedorDetail => {
                this.vendedorDetail = vendedorDetail
            });
    }
  ngOnInit() {
     this.vendedorId = +this.route.snapshot.paramMap.get('id');
    
        this.vendedorDetail = new VendedorDetail();
        this.getVendedorDetail();
     

  }

}