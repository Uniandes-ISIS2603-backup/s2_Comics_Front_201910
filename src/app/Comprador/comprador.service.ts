import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Comprador } from "./comprador";
import { environment } from "../../environments/environment";
import { CompradorDetail } from "./comprador-detail";


//const API_URL = environment.apiURL;
const compradores = '/comprador';
const API_URL = environment.apiURL;

/**
 * El servicio proveedor para todos los compradores relacionados.
 */
@Injectable()
export class CompradorService
{
    /**
     * Contructor de la clase 
     * @param http the http del cliente que se necesita para poder realizar peticiones
     */
    constructor(private http: HttpClient)
    {

    }

    /**
     * Retorna el objeto observable que contiene la lista de compradores recuperados de la API.
     * @returns La lista de autores en tiempo real.
     */
    getCompradores(): Observable<Comprador[]>
    {
        return this.http.get<Comprador[]>(API_URL + compradores);
    }

    /**
     * retorna el objeto observable con el detail de un comprador recuperado de la API.
     * @returns El detail del autor.
     */
    getCompradorDetail(compradorId): Observable<CompradorDetail>
    {
        return this.http.get<CompradorDetail>(API_URL + compradores + '/' + compradorId);
    }

    /**
     * 
     * @param comprador 
     */
    createComprador(comprador): Observable<Comprador>
    {
        return this.http.post<Comprador>(API_URL + compradores, comprador);
    }
}