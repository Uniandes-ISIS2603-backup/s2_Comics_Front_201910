/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import { Component, OnInit, Input,OnChanges ,ViewChild,ViewContainerRef} from '@angular/core';
import {VendedorService} from '../vendedor.service';
import {Calificacion} from '../calificacion';
import { ActivatedRoute } from '@angular/router';
import {VendedorEditCalificacionComponent} from '../vendedor-edit-calificacion/vendedor-edit-calificacion.component';
import { ToastrService } from 'ngx-toastr';
@Component({
    selector: 'app-vendedor-calificaciones',
    templateUrl: './vendedor-calificaciones.component.html',
})

export class VendedorCalificacionesComponent implements OnInit,OnChanges {
    constructor(private vendedorService: VendedorService,
                private route: ActivatedRoute,
                private viewRef: ViewContainerRef, private toastrService: ToastrService){}
    @Input()  vendedorCalificaciones : Calificacion [];
   
    vendedorId: number;
    //atributo para mostrrar/ocultar el componente
    public isCollapsed = true;
    //atributo que permite utilizar el componente de editar
    @ViewChild(VendedorEditCalificacionComponent) calificacionEditComponent: VendedorEditCalificacionComponent;
//atributo que llama al servicio para cargar la lista de calificaciones
    getCalificaciones(): void {
        this.vendedorService.getCalificaciones(this.vendedorId).subscribe(vendedorCalificaciones => this.vendedorCalificaciones = vendedorCalificaciones);
    }
    updateCalificaciones(calificaciones:Calificacion[]): void {

        this.vendedorCalificaciones = calificaciones;
    }
    deleteCalificacion(calificacionId:number): void {

        this.vendedorService.deleteCalificacion(this.vendedorId,calificacionId).subscribe(() => {
            this.toastrService.error("The comment was successfully deleted", "Comment deleted");
            this.ngOnInit();
        }, err => {
            this.toastrService.error(err, "Error");
        });
    }
    //metodo que oculta la ventana de editar calificaciones
    toggleUpdateCalificacion(): void {

        this.calificacionEditComponent.isCollapsed = !this.calificacionEditComponent.isCollapsed;
    }
    //se obtiene el id del vendedor actual
    ngOnInit(){
        this.vendedorId = +this.route.snapshot.paramMap.get('id');
        this.getCalificaciones();


    }
    refresh(){
        window.location.reload();
    }
    suma:number =0;
    contador:number=0;
    add(numero:number):void{
        this.suma+=numero;
        this.contador++;
    }
    average():number{
        return this.suma/this.contador;
    }
    ngOnChanges(){
        this.ngOnInit();

    }

    setStar(puntuacion:number):boolean[]{
        var starList =[true,true,true,true,true];
        for(var i=0;i<=4;i++){
            if (i <= puntuacion-1){
                starList[i]=false;

            }
            else{
                starList[i]=true;
            }
        }
        return starList
    }

}