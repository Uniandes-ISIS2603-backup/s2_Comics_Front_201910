
import { Injectable } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
import { Vendedor } from './vendedor';
import { Observable } from 'rxjs';
import { VendedorDetail} from './vendedor-detail';

const API_URL = "http://localhost:8080/s2_comics-api/api";
const vendedores = '/vendedores';

/**
* The service provider for everything related to vendedores
*/
@Injectable()
export class VendedorService {
    
    /**
    * Constructor of the service
    * @param http The HttpClient - This is necessary in order to perform requests
    */
    constructor(private http: HttpClient) { }
    
  
    getVendedores() : Observable<Vendedor[]> {
        return this.http.get<Vendedor[]>(API_URL + vendedores);
    }
    
    getVendedorDetail(vendedorId):Observable<VendedorDetail>{
   
        return this.http.get<VendedorDetail>(API_URL + vendedores+'/'+vendedorId);
    }
    
}