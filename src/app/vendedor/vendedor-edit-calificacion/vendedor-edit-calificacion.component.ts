/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
    
import { Component, OnInit, Input, OnChanges, EventEmitter, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgForm, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Calificacion } from '../calificacion';
import { VendedorService } from '../vendedor.service';
import { VendedorDetail } from '../vendedor-detail';
@Component({
    selector: 'app-vendedor-edit-calificacion',
    templateUrl: './vendedor-edit-calificacion.component.html',
   
})

export class VendedorEditCalificacionComponent implements OnInit, OnChanges {
     constructor(
        private vendedorService: VendedorService,
        private toastrService: ToastrService,
        private route: ActivatedRoute,

    ) { }
    
     @Input() vendedor: VendedorDetail;

     vendedorId:number;
   
    calificacion: Calificacion;
    
    public isCollapsed = true;
    
    @Output() updateCalificaciones = new EventEmitter();
    //metodo que llama al servicio para actualizar la calificacion
     putCalificacion(calificacionForm: NgForm): Calificacion {
        
         if (this.calificacion.puntuacion!=null){
          
        this.vendedorService.updateCalificacion(this.vendedorId,this.calificacion,this.calificacion.id)
            .subscribe(() => {
                calificacionForm.resetForm();
                this.updateCalificaciones.emit();
                this.toastrService.success("La calificacion fue creada exitosamente", 'Calificación anadida');
            }, err => {
                this.toastrService.error(err, 'Error');
            });
         }
        return this.calificacion;
    }
    //inicializa el vendedor dueño de las calificaicones
    ngOnInit(){
          this.vendedorId = +this.route.snapshot.paramMap.get('id');
          this.calificacion=new Calificacion();
         this.vendedorService.getVendedorDetail(this.vendedorId).subscribe(vendedor=>{this.vendedor=vendedor;});
    }
    ngOnChanges() {
        this.ngOnInit();
    }
    starList: boolean[] = [true,true,true,true,true];       // create a list which contains status of 5 stars
    cancelEdition(): void {
        
        this.toastrService.warning('Esta calificación no fue editada', 'Edicion de calificacion');
        this.isCollapsed=true;
    }
//metodo que permite desplegar la puntuacion con estrellas
setStar(data:any){
      this.calificacion.puntuacion=data+1;                               
      for(var i=0;i<=4;i++){  
        if(i<=data){  
          this.starList[i]=false;  
        }  
        else{  
          this.starList[i]=true;  
        }  
     }  
 }  
}

