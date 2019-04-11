import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';



import {OrdenPedidoService} from './orden-pedido.service';
import { AppRoutingModule } from '../app-routing/app-routing.module';
import { OrdenPedidoListComponent } from './orden-pedido-list/orden-pedido-list.component';
import { OrdenPedidoDetailComponent } from './orden-pedido-detail/orden-pedido-detail.component';



@NgModule({
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        CommonModule,
        FormsModule,
        
    ],
    declarations: [
     OrdenPedidoListComponent,
     OrdenPedidoDetailComponent],
    exports:[OrdenPedidoListComponent,OrdenPedidoDetailComponent],
    providers: [OrdenPedidoService],
   })

export class OrdenPedidoModule { }