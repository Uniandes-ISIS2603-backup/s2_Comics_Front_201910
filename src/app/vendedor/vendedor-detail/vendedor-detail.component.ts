import { Component,Input, OnInit ,ViewChild,ViewContainerRef} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { VendedorService } from '../vendedor.service';
import { VendedorDetail } from '../vendedor-detail';
import {VendedorCalificacionesComponent} from '../Vendedor-Calificaciones/vendedor-calificaciones.component';
import {VendedorAddCalificacionComponent} from '../vendedor-add-calificacion/vendedor-add-calificacion.component';
import {VendedorComicsComponent} from '../vendedor-comic/vendedor-comic.component';

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

cambiar:boolean=true;

vendedorId: number;
 vendedorDetail: VendedorDetail;

 //metodo que llama al servicio para obtener el detalle del vendedor 
 getVendedorDetail(): void {
        this.vendedorService.getVendedorDetail(this.vendedorId)
            .subscribe(vendedorDetail => {
                this.vendedorDetail = vendedorDetail
            });
    }
    //atributos para acceder a los componentes hijos que serán desplegados junto con el detail
    @ViewChild(VendedorCalificacionesComponent) calificacionListComponent: VendedorCalificacionesComponent;
    @ViewChild(VendedorAddCalificacionComponent) calificacionAddComponent: VendedorAddCalificacionComponent;
    @ViewChild(VendedorComicsComponent) comicsComponent: VendedorComicsComponent;
    //metodo para ocultar el componente de crear una calificacion
       toggleCreateCalificacion(): void {
      
        this.calificacionAddComponent.isCollapsed = !this.calificacionAddComponent.isCollapsed;
    }
   
     updateCalificaciones(): void {
        this.getVendedorDetail();
        this.calificacionListComponent.updateCalificaciones(this.vendedorDetail.calificaciones);
        this.calificacionListComponent.isCollapsed = false;
        this.calificacionAddComponent.isCollapsed = true;
    }
    //inicializa el id del vendedor con el del path actual
  ngOnInit() {
     this.vendedorId = +this.route.snapshot.paramMap.get('id');
    
        this.vendedorDetail = new VendedorDetail();
        this.getVendedorDetail();
     
 
  }
  //metodo para desplegar la puntuacion en forma de estrellas
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