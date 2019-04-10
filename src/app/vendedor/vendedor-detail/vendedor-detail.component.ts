import { Component,Input, OnInit ,ViewChild,ViewContainerRef} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { VendedorService } from '../vendedor.service';
import { VendedorDetail } from '../vendedor-detail';
import {VendedorCalificacionesComponent} from '../Vendedor-Calificaciones/vendedor-calificaciones.component';
import {VendedorAddCalificacionComponent} from '../vendedor-add-calificacion/vendedor-add-calificacion.component';
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
    @ViewChild(VendedorAddCalificacionComponent) calificacionAddComponent: VendedorAddCalificacionComponent;

    
       toggleCreateCalificacion(): void {
      
        this.calificacionAddComponent.isCollapsed = !this.calificacionAddComponent.isCollapsed;
    }
   
     updateCalificaciones(): void {
        this.getVendedorDetail();
        this.calificacionListComponent.updateCalificaciones(this.vendedorDetail.calificaciones);
        this.calificacionListComponent.isCollapsed = false;
        this.calificacionAddComponent.isCollapsed = true;
    }
  ngOnInit() {
     this.vendedorId = +this.route.snapshot.paramMap.get('id');
    
        this.vendedorDetail = new VendedorDetail();
        this.getVendedorDetail();
     
 
  }
  starList:boolean[] =[true,true,true,true,true];
      setStar(puntuacion:number):boolean[]{
       
      for(var i=0;i<=4;i++){  
          if (i <= puntuacion-1){  
          this.starList[i]=false;  
         
        }  
        else{  
          this.starList[i]=true;  
        }  
     }  
     return this.starList
 }  

}