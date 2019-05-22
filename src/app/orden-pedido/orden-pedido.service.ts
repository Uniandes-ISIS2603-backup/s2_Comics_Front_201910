import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { OrdenPedido} from './OrdenPedido';
import {Observable} from 'rxjs';
import { environment } from "../../environments/environment";


const API_URL = environment.apiURL;
const ordenesPedido= '/ordenesPedido'
const comprador= '/comprador'
const vendedor= '/vendedores'
const pedido= '/pedido'

@Injectable()
export class OrdenPedidoService{

    constructor(private http: HttpClient){}
        
        getOrdenesPedido():Observable<OrdenPedido[]>
          {
            return this.http.get<OrdenPedido[]>(API_URL + ordenesPedido);       
    }
    getOrdenesPedidoEstado(estado):Observable<OrdenPedido[]>
    {
        return this.http.get<OrdenPedido[]>(API_URL + ordenesPedido);
    }
    getOrdenesPedidoEstado(estado):Observable<OrdenPedido[]> {

        return this.http.get<OrdenPedido[]>(API_URL + ordenesPedido + "/" + estado);
    }

    getOrdenPedidoId(ordenPedidoId): Observable<OrdenPedido>
    {
        return this.http.get<OrdenPedido>(API_URL + ordenesPedido+ '/'+  ordenPedidoId);
    }

    /**
     * Crea una ordenPedido en la base de datos
     * @param ordenPedido la ordenPedido a crear
     */
    createOrdenPedido(ordenPedido): Observable<OrdenPedido> {
        return this.http.post<OrdenPedido>(API_URL + ordenesPedido, ordenPedido);
    }

    /**
     * Updates a new ordenPedido
     * @param ordenPedido The updated rdenPedido
     * @returns The updated ordenPedido
     */
    updateOrdenPedido(ordenPedido): Observable<OrdenPedido> {
        return this.http.put<OrdenPedido>(API_URL + ordenesPedido + '/' + ordenPedido.id, ordenPedido);
    }
    /**
     * Deletes a ordenPedido
     * @param ordenPedido_Id The ordenPedido's id
     * @returns True if the book was deleted, false otherwise
     */
    deleteOrdenPedido(ordenPedido_Id): Observable<OrdenPedido> {
        return this.http.delete<OrdenPedido>(API_URL + ordenesPedido + '/' + ordenPedido_Id);
    }

    getOrdenesPedidoVendedor(vendedorId):  Observable<OrdenPedido[]> {
        return this.http.get<OrdenPedido[]>(API_URL + vendedor + '/' + vendedorId +pedido);
    }

getOrdenesPedidoVendedorEstado(vendedorId, estado):  Observable<OrdenPedido[]> {
    return this.http.get<OrdenPedido[]>(API_URL + vendedor + '/' + vendedorId +pedido + '/'+ estado);
}

getOrdenesPedidoComprador(compradorId):  Observable<OrdenPedido[]> {
    return this.http.get<OrdenPedido[]>(API_URL + comprador + '/' + compradorId +pedido);
}

getOrdenesPedidoCompradorEstado(compradorId, estado):  Observable<OrdenPedido[]> {
    return this.http.get<OrdenPedido[]>(API_URL + comprador + '/' + compradorId +pedido + '/'+ estado);
}

   


}