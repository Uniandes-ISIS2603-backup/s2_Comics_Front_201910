/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
    
import { Component, OnInit, Input, OnChanges, EventEmitter, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Calificacion } from '../calificacion';
import { VendedorService } from '../vendedor.service';
import { Vendedor } from '../vendedor';
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
    
     @Input() vendedor: Vendedor;

     vendedorId:number;
    /**
    * The review to post
    */
    calificacion: Calificacion;
    
    public isCollapsed = true;
    
    @Output() updateCalificaciones = new EventEmitter();
    
     postCalificacion(calificacionForm: NgForm): Calificacion {
        
        this.vendedorService.createCalificacion(this.vendedorId,this.calificacion)
            .subscribe(() => {
                calificacionForm.resetForm();
                this.updateCalificaciones.emit();
                this.toastrService.success("La calificacion fue creada exitosamente", 'Calificación anadida');
            }, err => {
                this.toastrService.error(err, 'Error');
            });
        return this.calificacion;
    }
    ngOnInit(){
          this.vendedorId = +this.route.snapshot.paramMap.get('id');
          this.calificacion=new Calificacion();
    }
    ngOnChanges() {
        this.ngOnInit();
    }
}


