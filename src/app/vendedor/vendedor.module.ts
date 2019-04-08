import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VendedorListComponent } from './vendedor-list/vendedor-list.component';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from '@angular/common/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { VendedorListComponent } from './vendedor-list/vendedor-list.component';
import { VendedorDetailComponent } from './vendedor-detail/vendedor-detail.component';
import {VendedorCalificacionesComponent} from './Vendedor-Calificaciones/vendedor-calificaciones.component'
import {VendedorAddCalificacionComponent} from './vendedor-add-calificacion/vendedor-add-calificacion.component'
import { VendedorService } from './vendedor.service';
import { FormsModule } from '@angular/forms';
import {AppRoutingModule} from '../app-routing/app-routing.module';

@NgModule({
    imports: [       
        CommonModule,
        FormsModule,
        AppRoutingModule,
        BrowserModule,
        HttpClientModule,
        
        NgbModule
    ],
    declarations: [VendedorListComponent,VendedorDetailComponent,
        VendedorCalificacionesComponent, VendedorAddCalificacionComponent],
    providers: [VendedorService],
    exports:[VendedorListComponent]
})
export class VendedorModule {}
