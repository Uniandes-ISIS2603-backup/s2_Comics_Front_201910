import { Component, OnInit } from '@angular/core';
import { OrdenPedidoService } from '../orden-pedido.service';
import { Vendedor } from '../../vendedor/vendedor';
import { Comprador } from '../../Comprador/comprador';
import { CompradorService } from '../../Comprador/comprador.service';
import { VendedorService } from '../../vendedor/vendedor.service';
import {OrdenPedido} from "../OrdenPedido";




@Component({
  selector: 'app-orden-pedido-list-com-ven',
  templateUrl: './orden-pedido-list-com-ven.component.html',
  styleUrls: ['./orden-pedido-list-com-ven.component.css']
})
export class OrdenPedidoListComVenComponent implements OnInit {

   
  /**
     * Constructor for the component
     * @param OrdenPedidoService The author's services provider
     */
    constructor(private ordenPedidoService: OrdenPedidoService ,
      private compradorService: CompradorService,
      private vendedorService: VendedorService   ){
        }
    
    /**
     * The list of ordenesPedido which belong to the ComicStore
     */
  
    ordenesPedido: OrdenPedido[];
    estados: String[]= ['EN_ESPERA' ,'ACEPTADO','RECHAZADO','ENVIADO' ,'FINALIZADO'];
    categoriasElegidas: boolean[] = [true,true,true,true,true];
 


    ordenPedido: OrdenPedido;
    rol: String =localStorage.getItem("role");
    idComprador:Number;
    comprador: Comprador;
    aliasComprador: String;
    idVendedor:Number;
    vendedor: Vendedor;
    aliasVendedor: String;
    ADMI:Boolean;
    filtro:Boolean=false;
    

    /**
     * Asks the service to update the list of ordenesPedido
     */
    getOrdenesPedido(): void {
      this.ordenPedidoService.getOrdenesPedido().subscribe(ordenesPedido => this.ordenesPedido = ordenesPedido);
     
    }

    getOrdenesPedidoEstado(estado): void {
      if(this.rol=="Comprador"){
      this.ordenPedidoService.getOrdenesPedidoCompradorEstado(localStorage.getItem("user"),estado).subscribe(ordenesPedido => this.ordenesPedido = ordenesPedido)
    }
    if ( this.rol=="Vendedor"){
      this.ordenPedidoService.getOrdenesPedidoVendedorEstado(localStorage.getItem("user"),estado).subscribe(ordenesPedido => this.ordenesPedido = ordenesPedido)
    }
if(this.rol=="ADMIN"){
  this.ordenPedidoService.getOrdenesPedidoEstado(estado).subscribe(ordenesPedido => this.ordenesPedido = ordenesPedido)
}
    

    }


    deletOrdenesNo(ordenes2):void{

      for (let orden of ordenes2) {
        if(this.rol=="Comprador"){
       if(orden.comprador.id!=parseInt(localStorage.getItem("user") ) ){
        var index = ordenes2.indexOf(orden);
        ordenes2.splice(index, 1);
       }}
       else if (this.rol=="Vendedor"){
        if(orden.vendedor.id!=parseInt(localStorage.getItem("user") )){
          var index = ordenes2.indexOf(orden);
          ordenes2.splice(index, 1);
         } 
       }
       else{}
      }
      this.ordenesPedido= ordenes2;
    }



    /**
    * Creates a new orden
    */
   createOrdenPedido(): OrdenPedido {
    this.ordenPedidoService.createOrdenPedido(this.ordenPedido)
        .subscribe(OrdenPedido => {
            this.ordenPedido.id = OrdenPedido.id;
            });
    return this.ordenPedido;
}


getOrdenesPedidoComprador():void{
  if(localStorage.getItem("role")=='ADMIN'){
this.compradorService.getCompradorByAlias(this.aliasComprador).subscribe(comprador => this.comprador= comprador );
this.idComprador=this.comprador.id;}
this.ordenPedidoService.getOrdenesPedidoComprador(this.idComprador).subscribe(ordenesPedido => this.ordenesPedido = ordenesPedido)
}
getOrdenesPedidoVendedor():void{
  if(localStorage.getItem("role")=='ADMIN'){
    this.vendedorService.getVendedorByAlias(this.aliasVendedor).subscribe(vendedor => this.vendedor= vendedor );
    this.idVendedor=this.vendedor.id;}
  this.ordenPedidoService.getOrdenesPedidoVendedor(this.idVendedor).subscribe(ordenesPedido => this.ordenesPedido = ordenesPedido)
  }
    /**
     * This will initialize the component by retrieving the list of ordenesPedido from the service
     * This method will be called when the component is created
     */
    ngOnInit() {
     this.idComprador=parseInt(localStorage.getItem("user"));
     this.idVendedor=parseInt(localStorage.getItem("user"));
      
      if(localStorage.getItem("role")=='Comprador'){
      this.getOrdenesPedidoComprador();
       
      }
     if(localStorage.getItem("role")=='Vendedor') {
        this.getOrdenesPedidoVendedor(); 
      }
      if(localStorage.getItem("role")=='ADMIN') {
        this.getOrdenesPedido(); 
      }
    }

}
