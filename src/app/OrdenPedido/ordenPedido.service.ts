import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { OrdenPedido} from './ordenPedido';
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
}
