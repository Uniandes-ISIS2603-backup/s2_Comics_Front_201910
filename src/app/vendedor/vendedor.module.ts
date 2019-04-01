import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from '@angular/common/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { VendedorListComponent } from './vendedor-list/vendedor-list.component';
import { VendedorDetailComponent } from './vendedor-detail/vendedor-detail.component';
import {VendedorCalificacionesComponent} from './Vendedor-Calificaciones/vendedor-calificaciones.component'
import { VendedorService } from './vendedor.service';
import { FormsModule } from '@angular/forms';
import {AppRoutingModule} from '../app-routing/app-routing.module';
import {CalificacionModule}from '../calificacion/calificacion.module';
@NgModule({
    imports: [       
        CommonModule,
        FormsModule,
        AppRoutingModule,
        BrowserModule,
        HttpClientModule,
        CalificacionModule,
        NgbModule
    ],
    declarations: [VendedorListComponent,VendedorDetailComponent,
        VendedorCalificacionesComponent],
    providers: [VendedorService],
    exports:[VendedorListComponent]
})
export class VendedorModule {}
