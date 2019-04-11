import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { OrdenPedido} from './OrdenPedido';
import {OrdenPedidoDetail} from './OrdenPedidoDetail';
import {Observable} from 'rxjs';

const API_URL = "../../assets/";
const ordenesPedido= 'ordenesPedido.json'

@Injectable()
export class OrdenPedidoService{
    
    constructor(private http: HttpClient){}
        
        getOrdenesPedido():Observable<OrdenPedido[]>
            {
            
            return this.http.get<OrdenPedido[]>(API_URL + ordenesPedido);
        
    }

   

    getOrdenPedidoId(ordenPedidoId): Observable<OrdenPedido> {
     /**  return this.http.get<OrdenPedido>(API_URL + ordenesPedido+ '/'+  ordenPedidoId); */
     return this.http.get<OrdenPedido>(API_URL + "data-" + ordenPedidoId+".json"); 
    }

    /**
     * Crea una ordenPedido en la base de datos
     * @param ordenPedido la ordenPedido a crear
     */
    createOrdenPedido(ordenPedido): Observable<OrdenPedido> {
        return this.http.post<OrdenPedido>(API_URL + ordenesPedido, ordenPedido);
    }
}