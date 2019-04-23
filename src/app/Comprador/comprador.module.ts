import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompradorListComponent } from './comprador-list/comprador-list.component';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../app-routing/app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CompradorService } from './comprador.service';
import { OrdenPedidoModule } from '../orden-pedido/orden-pedido.module';
import { CompradorDetailComponent } from './comprador-detail/comprador-detail.component';
import { CompradorEditComponent } from './comprador-edit/comprador-edit.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import {ParticlesModule} from "angular-particle";

@NgModule({
    declarations: [
        CompradorListComponent,
        CompradorDetailComponent,
        CompradorEditComponent],
    imports: [
        ParticlesModule,
        FlexLayoutModule,
        ReactiveFormsModule,
        BrowserModule, 
        AppRoutingModule,
        HttpClientModule,
        OrdenPedidoModule,
        CommonModule,
        FormsModule],
    providers: [CompradorService],
    bootstrap: [CompradorListComponent]
})

export class CompradorModule 
{
    OnInit()
    {
        
    }
}