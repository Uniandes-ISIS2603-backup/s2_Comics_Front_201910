import { Component, OnInit } from '@angular/core';
import { OrdenPedidoService } from '../orden-pedido.service';
import { OrdenPedido } from '../ordenPedido';
import { toInteger } from '@ng-bootstrap/ng-bootstrap/util/util';



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
    constructor(private ordenPedidoService: OrdenPedidoService) {
       
     }
    
    /**
     * The list of ordenesPedido which belong to the ComicStore
     */
    ordenesPedido: OrdenPedido[];

    ordenPedido: OrdenPedido;
    rol: String =localStorage.getItem("role");
    idComprador: Number;
    idVendedor: Number;
    /**
     * Asks the service to update the list of ordenesPedido
     */
    getOrdenesPedido(): void {
        this.ordenPedidoService.getOrdenesPedido().subscribe(ordenesPedido => this.ordenesPedido = ordenesPedido);
    }

    /**
    * Creates a new book
    */
   createOrdenPedido(): OrdenPedido {
    this.ordenPedidoService.createOrdenPedido(this.ordenPedido)
        .subscribe(OrdenPedido => {
            this.ordenPedido.id = OrdenPedido.id;
            });
    return this.ordenPedido;
}

getOrdenesPedidoComprador():void{

this.ordenPedidoService.getOrdenesPedidoComprador(parseInt(localStorage.getItem("user"))).subscribe(ordenesPedido => this.ordenesPedido = ordenesPedido)
}
getOrdenesPedidoVendedor():void{
  this.ordenPedidoService.getOrdenesPedidoVendedor(this.idVendedor).subscribe(ordenesPedido => this.ordenesPedido = ordenesPedido)
  }
    /**
     * This will initialize the component by retrieving the list of ordenesPedido from the service
     * This method will be called when the component is created
     */
    ngOnInit() {
      this.idComprador=parseInt(localStorage.getItem("user"));
      this.idVendedor=parseInt(localStorage.getItem("user"));
      alert(localStorage.getItem("role"))
      if(localStorage.getItem("role")=='comprador'){
      this.getOrdenesPedidoComprador();
       
      }
      else{
        this.getOrdenesPedidoVendedor(); 
      }
    }

}
