import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompradorListComponent } from './comprador-list/comprador-list.component';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../app-routing/app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CompradorService } from './comprador.service';
import { OrdenPedidoModuleModule } from '../OrdenPedido/orden-pedido-module/orden-pedido-module.module';
import { CompradorDetailComponent } from './comprador-detail/comprador-detail.component';

@NgModule({
    declarations: [
        CompradorListComponent,
        CompradorDetailComponent],
    imports: [ 
        BrowserModule, 
        AppRoutingModule,
        HttpClientModule,
        OrdenPedidoModuleModule,
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