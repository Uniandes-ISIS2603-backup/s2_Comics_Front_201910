import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdenPedidoListComponent } from './orden-pedido-list/orden-pedido-list.component';
import { OrdenPedidoDetailComponent } from './orden-pedido-detail/orden-pedido-detail.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [OrdenPedidoListComponent, OrdenPedidoDetailComponent]
})
export class OrdenPedidoModule { }
