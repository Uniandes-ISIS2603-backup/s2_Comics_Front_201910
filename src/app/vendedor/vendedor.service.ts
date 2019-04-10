
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Vendedor } from './vendedor';
import { Observable } from 'rxjs';
import { VendedorDetail} from './vendedor-detail';
import {Calificacion} from './calificacion';
const API_URL = "http://localhost:8080/s2_comics-api/api";
const vendedores = '/vendedores';
const calificaciones='/calificaciones';
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
    
   
        return this.http.get<VendedorDetail>(API_URL + vendedores+'/'+vendedorId);
    }
    getCalificaciones(vendedorId):Observable<Calificacion[]>{
   
        return this.http.get<Calificacion[]>(API_URL + vendedores+'/'+vendedorId + calificaciones);
    }
    
    createCalificacion(vendedorId,calificacion){
        return this.http.post<Calificacion>(API_URL + vendedores+'/'+vendedorId + calificaciones,calificacion);
    }
    updateCalificacion(vendedorId,calificacion,id){
        
        return this.http.put<Calificacion>(API_URL + vendedores+'/'+vendedorId + calificaciones+'/'+id,calificacion);
    }

    createVendedor(vendedor):Observable<Vendedor>
    {
        return this.http.post<Vendedor>(API_URL + vendedores, vendedor);
    }
    
}