import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';



import {OrdenPedidoService} from './orden-pedido.service';
import { AppRoutingModule } from '../app-routing/app-routing.module';
import { OrdenPedidoListComponent } from './orden-pedido-list/orden-pedido-list.component';
import { OrdenPedidoListComVenComponent} from './orden-pedido-list-com-ven/orden-pedido-list.component'
import { OrdenPedidoDetailComponent } from './orden-pedido-detail/orden-pedido-detail.component';
import {OrdenPedidoDetailComprador} from './orden-pedido-detail-comprador/orden-pedido-detail-comprador';
import {OrdenPedidoDetailVendedor} from './orden-pedido-detail-vendedor/orden-pedido-detail-vendedor';
import { CreateComponent } from './create/create.component';



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
     OrdenPedidoListComVenComponent,
     OrdenPedidoDetailComponent,
     OrdenPedidoDetailVendedor,
     OrdenPedidoDetailComprador,
     CreateComponent],
    exports:[OrdenPedidoListComponent,OrdenPedidoListComVenComponent,OrdenPedidoDetailComponent],
    providers: [OrdenPedidoService],
   })

export class OrdenPedidoModule { }