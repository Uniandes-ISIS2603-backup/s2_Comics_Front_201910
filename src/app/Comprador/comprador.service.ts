import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Comprador } from "./comprador";
import { environment } from "../../environments/environment";
import { CompradorDetail } from "./comprador-detail";
import {Comic} from "../Comic/Comic";
import {ComicDetail} from "../Comic/ComicDetail";


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
     * Obtiene el comprador a partir del alias.
     * @param alias El alias del comprador que se va a buscar.
     */
    getCompradorByAlias(alias):Observable<CompradorDetail>
    {
        return this.http.get<CompradorDetail>(API_URL + compradores + '/' + alias);
    }

    /**
     * Crea un comprador en la base de datos
     * @param comprador El comrpador a crear
     */
    createComprador(comprador): Observable<Comprador> {
        return this.http.post<Comprador>(API_URL + compradores, comprador);
    }

    

    /**
     * Actualiza un comprador en la base de datos
     * @param comprador Los datos del comprador que será actualizado.
     */
    updateComprador(comprador):Observable<Comprador>
    {
        return this.http.put<Comprador>(API_URL + compradores + '/' + comprador.id, comprador);
    }

    /**
     * Obtiene el carrito de compras de un comprador
     * @param compradorId
     */
    getCarro(compradorId): Observable<Comic[]>
    {
        return this.http.get<Comic[]>(API_URL + compradores + '/' + compradorId + '/comics');
    }

    /**
     * Elimina un comic del carrito de compras de un comprador
     * @param compradorId
     * @param comicId
     */
    deleteComic(compradorId, comicId): Observable<boolean>
    {
        return this.http.delete<boolean>(API_URL + compradores + "/" + compradorId + "/comics/" + comicId)
    }

    /**
     * Añade un comic al carrito de compras de un comprador.
     * @param compradorId
     * @param comicId
     */
    addComicCarrito(compradorId:number, comicId):Observable<ComicDetail>
    {
        return this.http.post<ComicDetail>(API_URL + compradores + "/" + compradorId + "/comics/" + comicId, null);
    }
}