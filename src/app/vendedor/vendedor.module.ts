import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from '@angular/common/http';


import { VendedorListComponent } from './vendedor-list/vendedor-list.component';
import { VendedorDetailComponent } from './vendedor-detail/vendedor-detail.component';
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
        CalificacionModule
    ],
    declarations: [VendedorListComponent,VendedorDetailComponent],
    providers: [VendedorService],
    exports:[VendedorListComponent]
})
export class VendedorModule {}
