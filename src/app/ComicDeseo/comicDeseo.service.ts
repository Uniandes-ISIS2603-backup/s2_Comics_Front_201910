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
const comicsDeseo = '/comicDeseo';

@Injectable()
export class ComicDeseoService{
    
    constructor(private http: HttpClient){}
        
        getComicsDeseo():Observable<ComicDeseo[]>
            {
            
            return this.http.get<ComicDeseo[]>(API_URL + comicsDeseo);
        
    }

    /**
    * Returns the Observable object containing the editorial retrieved from the API
    * @returns The editorial
    */
   getComicDeseoDetail(comicDeseoId): Observable<ComicDeseoDetail> {
    return this.http.get<ComicDeseoDetail>(API_URL +comicDeseoId);
}

}


