
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Vendedor } from './vendedor';
import { Observable } from 'rxjs';
const API_URL = "../../assets/";
const vendedores = 'vendedores.json';
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
    
   
    
}