
import { Injectable } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
import { Vendedor } from './vendedor';
import { Observable } from 'rxjs';
import { VendedorDetail} from './vendedor-detail';
import {Calificacion} from './calificacion';
import {environment} from "../../environments/environment";
const API_URL = environment.apiURL;
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

    getVendedorByAlias(alias):Observable<VendedorDetail>
    {
        return this.http.get<VendedorDetail>(API_URL + vendedores + '/' + alias);
    }
    
    getVendedorDetail(vendedorId):Observable<VendedorDetail>{
   
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
    updateVendedor(vendedorId,vendedor){
        
        return this.http.put<VendedorDetail>(API_URL + vendedores+'/'+vendedorId ,vendedor);
    }
    createVendedor(vendedor):Observable<Vendedor>
    {
        return this.http.post<Vendedor>(API_URL + vendedores, vendedor);
    }
    
}