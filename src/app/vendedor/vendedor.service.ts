
import { Injectable } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
import { Vendedor } from './vendedor';
import { Observable } from 'rxjs';
import { VendedorDetail} from './vendedor-detail';
import {Calificacion} from './calificacion';
import {Comic} from './../comic/comic'
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

    //llama al back y hace la peticion get de los vendedores
    getVendedores() : Observable<Vendedor[]> {
        return this.http.get<Vendedor[]>(API_URL + vendedores);
    }

//llama al back y hace la peticion get de un vendedor por alias
    getVendedorByAlias(alias):Observable<VendedorDetail>
    {
        return this.http.get<VendedorDetail>(API_URL + vendedores + '/' + alias);
    }
    //llama al back y hace la peticion get del detalle de un vendedor por id
    getVendedorDetail(vendedorId):Observable<VendedorDetail>{

        return this.http.get<VendedorDetail>(API_URL + vendedores+'/'+vendedorId);
    }
    //llama al back y hace la peticion get de las calificaciones
    getCalificaciones(vendedorId):Observable<Calificacion[]>{

        return this.http.get<Calificacion[]>(API_URL + vendedores+'/'+vendedorId + calificaciones);
    }
    //llama al back y hace la peticion post de una calificacion
    createCalificacion(vendedorId,calificacion){
        return this.http.post<Calificacion>(API_URL + vendedores+'/'+vendedorId + calificaciones,calificacion);
    }
    //llama al back y hace la peticion post del subrecurso entre vendedores y comics

    addComic(vendedorId,comicId){
        console.log(API_URL + vendedores+'/'+vendedorId + '/comics/'+comicId);
        return this.http.post<Comic>(API_URL + vendedores+'/'+vendedorId + '/comics/'+comicId, null);
    }
    //llama al back y hace la peticion put de una calificacion

    updateCalificacion(vendedorId,calificacion,id){

        return this.http.put<Calificacion>(API_URL + vendedores+'/'+vendedorId + calificaciones+'/'+id,calificacion);
    }

    deleteCalificacion(vendedorId,id){
        console.log(API_URL + vendedores+'/'+vendedorId  +calificaciones+'/'+id);
    return  this.http.delete<boolean>(API_URL + vendedores+'/'+vendedorId  +calificaciones+'/'+id);
    }
    //llama al back y hace la peticion put de un vendedor

    updateVendedor(vendedorId,vendedor){

        return this.http.put<VendedorDetail>(API_URL + vendedores+'/'+vendedorId ,vendedor);
    }
    //llama al back y hace la peticion post de un vendedor

    createVendedor(vendedor):Observable<Vendedor>
    {
        return this.http.post<Vendedor>(API_URL + vendedores, vendedor);
    }

    getComicsVendedor(vendedorId){
        return this.http.get<Comic[]>(API_URL+vendedores+'/'+vendedorId+'/comics');
    }
    vendedor:Vendedor;
    id:number;
    getComicsVendedorPorAlias(vendedorAlias){
     
       this.http.get<Vendedor>(API_URL+vendedores+'/'+vendedorAlias).subscribe(vendedor1 =>{this.vendedor=vendedor1;});
      this.id=this.vendedor.id;
       return this.http.get<Comic[]>(API_URL+vendedores+'/'+this.id+'/comics');
    }
    
}