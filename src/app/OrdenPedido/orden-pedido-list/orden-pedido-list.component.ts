import { Component, OnInit } from '@angular/core';
import { OrdenPedidoService } from '../ordenPedido.service';
import { OrdenPedido } from '../ordenPedido';


@Component({
  selector: 'app-orden-pedido-list',
  templateUrl: './orden-pedido-list.component.html',
  styleUrls: ['./orden-pedido-list.component.css']
})
export class OrdenPedidoListComponent implements OnInit {

  /**
     * Constructor for the component
     * @param OrdenPedidoService The author's services provider
     */
    constructor(private ordenPedidoService: OrdenPedidoService) { }
    
    /**
     * The list of ordenesPedido which belong to the ComicStore
     */
    ordenesPedido: OrdenPedido[];

    /**
     * Asks the service to update the list of ordenesPedido
     */
    getOrdenesPedido(): void {
        this.ordenPedidoService.getOrdenesPedido().subscribe(ordenesPedido => this.ordenesPedido = ordenesPedido);
    }

    /**
     * This will initialize the component by retrieving the list of ordenesPedido from the service
     * This method will be called when the component is created
     */
    ngOnInit() {
        this.getOrdenesPedido();
    }

}
