import { Component,Input, OnInit ,ViewChild,ViewContainerRef} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import {VendedorService} from '../vendedor.service';
import { VendedorDetail } from '../vendedor-detail';
import {VendedorCalificacionesComponent} from '../Vendedor-Calificaciones/vendedor-calificaciones.component';
import { Vendedor } from '../vendedor';
@Component({
  selector: 'app-vendedor-detail',
  templateUrl: './vendedor-detail.component.html',
  styleUrls: ['./vendedor-detail.component.css']
})
export class VendedorDetailComponent implements OnInit {
    
  constructor(
    private route: ActivatedRoute,
        private vendedorService: VendedorService,
          private viewRef: ViewContainerRef
  ) { }



vendedorId: number;
 vendedorDetail: VendedorDetail;
 getVendedorDetail(): void {
        this.vendedorService.getVendedorDetail(this.vendedorId)
            .subscribe(vendedorDetail => {
                this.vendedorDetail = vendedorDetail
            });
    }
    @ViewChild(VendedorCalificacionesComponent) calificacionListComponent: VendedorCalificacionesComponent;
    
     
  ngOnInit() {
     this.vendedorId = +this.route.snapshot.paramMap.get('id');
    
        this.vendedorDetail = new VendedorDetail();
        this.getVendedorDetail();
     

  }
  

}