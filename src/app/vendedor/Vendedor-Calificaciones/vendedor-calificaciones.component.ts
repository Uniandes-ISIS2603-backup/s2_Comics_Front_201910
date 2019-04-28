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

@Component({
    selector: 'app-vendedor-calificaciones',
    templateUrl: './vendedor-calificaciones.component.html',
})

export class VendedorCalificacionesComponent implements OnInit,OnChanges {
    constructor(private vendedorService: VendedorService,  private route: ActivatedRoute, private viewRef: ViewContainerRef){}
    @Input()  vendedorCalificaciones : Calificacion [];
    vendedorId: number;
    public isCollapsed = true;
    @ViewChild(VendedorEditCalificacionComponent) calificacionEditComponent: VendedorEditCalificacionComponent;

    getCalificaciones(): void {
        this.vendedorService.getCalificaciones(this.vendedorId).subscribe(vendedorCalificaciones => this.vendedorCalificaciones = vendedorCalificaciones);
    }
    updateCalificaciones(calificaciones:Calificacion[]): void {

        this.vendedorCalificaciones = calificaciones;
    }
    toggleUpdateCalificacion(): void {

        this.calificacionEditComponent.isCollapsed = !this.calificacionEditComponent.isCollapsed;
    }
    ngOnInit(){
        this.vendedorId = +this.route.snapshot.paramMap.get('id');
        this.getCalificaciones();


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
