/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import { Component, OnInit, Input, } from '@angular/core';
import {VendedorService} from '../vendedor.service';
import {Calificacion} from '../calificacion';
import { ActivatedRoute } from '@angular/router';
@Component({
    selector: 'app-vendedor-calificaciones',
    templateUrl: './vendedor-calificaciones.component.html',
})

export class VendedorCalificacionesComponent implements OnInit {
    constructor(private vendedorService: VendedorService,  private route: ActivatedRoute,){}
    vendedorCalificaciones : Calificacion [];
    vendedorId: number;
    public isCollapsed = true;
    getCalificaciones(): void {
        this.vendedorService.getCalificaciones(this.vendedorId).subscribe(vendedorCalificaciones => this.vendedorCalificaciones = vendedorCalificaciones);
    }
    updateCalificaciones(calificaciones:Calificacion[]): void {
        this.vendedorCalificaciones = calificaciones;
    }
    ngOnInit(){
         this.vendedorId = +this.route.snapshot.paramMap.get('id');
        this.getCalificaciones();
    }
}
