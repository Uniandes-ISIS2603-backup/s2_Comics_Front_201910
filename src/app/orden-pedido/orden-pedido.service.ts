import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { OrdenPedido} from './OrdenPedido';
import {OrdenPedidoDetail} from './OrdenPedidoDetail';
import {Observable} from 'rxjs';
import { environment } from "../../environments/environment";


const API_URL = environment.apiURL;
const ordenesPedido= '/ordenesPedido'

@Injectable()
export class OrdenPedidoService{
    
    constructor(private http: HttpClient){}
        
        getOrdenesPedido():Observable<OrdenPedido[]>
            {
            
            return this.http.get<OrdenPedido[]>(API_URL + ordenesPedido);
        
    }

    

    getOrdenPedidoId(ordenPedidoId): Observable<OrdenPedido> {
       return this.http.get<OrdenPedido>(API_URL + ordenesPedido+ '/'+  ordenPedidoId); 
    }

    /**
     * Crea una ordenPedido en la base de datos
     * @param ordenPedido la ordenPedido a crear
     */
    createOrdenPedido(ordenPedido): Observable<OrdenPedido> {
        return this.http.post<OrdenPedido>(API_URL + ordenesPedido, ordenPedido);
    }
}