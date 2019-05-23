/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import { Component, OnInit, Input, OnChanges, EventEmitter, Output, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgForm, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Calificacion } from '../calificacion';
import { VendedorService } from '../vendedor.service';
import { VendedorDetail } from '../vendedor-detail';
import {VendedorCalificacionesComponent} from '../Vendedor-Calificaciones/vendedor-calificaciones.component';
@Component({
    selector: 'app-vendedor-add-calificacion',
    templateUrl: './vendedor-add-calificacion.component.html',

})

export class VendedorAddCalificacionComponent implements OnInit, OnChanges {
    constructor(
        private vendedorService: VendedorService,
        private toastrService: ToastrService,
        private route: ActivatedRoute,

    ) { }

    @Input() vendedor: VendedorDetail;
    @ViewChild(VendedorCalificacionesComponent) vendedorCalificacionesComponent: VendedorCalificacionesComponent;
    vendedorId:number;
    /**
     * The review to post
     */
    calificacion: Calificacion;
    //atributo para esconder/mostrar el componente
    public isCollapsed = true;

    @Output() updateCalificaciones = new EventEmitter();

    //metodo que llama al servicio del vendedor para crear una nueva calificacion segun el formulario recibido 
     postCalificacion(calificacionForm: NgForm): Calificacion {
         
         if (this.calificacion.puntuacion!=null){
           
         
        this.vendedorService.createCalificacion(this.vendedorId,this.calificacion)
            .subscribe(() => {
                calificacionForm.resetForm();
                this.updateCalificaciones.emit();
                this.toastrService.success("La calificacion fue creada exitosamente", 'Calificación anadida');
                window.location.reload();
            }, err => {
                this.toastrService.error(err, 'Error');
            });
         }
        return this.calificacion;
    }

    //obtiene la id del vendedor actual y lo inicializa llamando al servicio
    ngOnInit(){
        this.vendedorId = +this.route.snapshot.paramMap.get('id');
        this.calificacion=new Calificacion();
        this.vendedorService.getVendedorDetail(this.vendedorId).subscribe(vendedor=>{this.vendedor=vendedor;});
    }
    ngOnChanges() {
        this.ngOnInit();
    }
    starList: boolean[] = [true,true,true,true,true];

//metodo que modifica el arreglo de booleanos para desplegar la puntuacion con estrellas
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


