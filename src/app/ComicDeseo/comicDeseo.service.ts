/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ComicDeseo} from './ComicDeseo';
import {Observable} from 'rxjs';
import { ComicDeseoDetail } from './ComicDeseoDetail';


import { environment } from '../../environments/environment';

//const API_URL = "../../assets/";
const API_URL = environment.apiURL;
//const comicsDeseo = 'ComicsDeseo.json';
const comicsDeseo = '/comicDeseo';
const comprador= '/comprador'

@Injectable()
export class ComicDeseoService{
    
    constructor(private http: HttpClient){}
        
        getComicsDeseo():Observable<ComicDeseo[]>
            {
            
            return this.http.get<ComicDeseo[]>(API_URL + comicsDeseo);
        
    }

    /**
     * Crea un comic deseo en la base de datos
     * @param comicDeseo el comic a crear
     */
    createComicDeseo(comicDeseo): Observable<ComicDeseo> {
    
        return this.http.post<ComicDeseo>(API_URL + comicsDeseo, comicDeseo);
      }

   
    /**
    * Returns the Observable object containing the editorial retrieved from the API
    * @returns The editorial
    */
   getComicDeseoDetail(comicDeseoId): Observable<ComicDeseoDetail> {
    return this.http.get<ComicDeseoDetail>(API_URL +comicsDeseo+'/'+comicDeseoId);
}

/**
 * Obtiene el comprador a partir del alias
 * @param id Id del comicDeseo
 */
   // getComicDeseoById(id):Observable<ComicDeseoDetail>{

    //    return this.http.get<ComicDeseoDetail>(API_URL+comicsDeseo+'/'+id);
   // }

   
     /**
    * Deletes a comicDeseo
    * @param comicDeseo_Id The comicsDeseo's id
    * @returns True if the book was deleted, false otherwise
    */
   deleteComicDeseo(comicDeseo_Id): Observable<ComicDeseo> {
    return this.http.delete<ComicDeseo>(API_URL + comicsDeseo + '/' + comicDeseo_Id);
    }

    getComicsDeseoComprador(compradorId):  Observable<ComicDeseo[]> {
        return this.http.get<ComicDeseo[]>(API_URL + comprador + '/' + compradorId );
    }

          
     }




     

