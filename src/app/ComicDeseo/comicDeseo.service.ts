/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ComicDeseo} from './ComicDeseo';
import {Observable} from 'rxjs';

const API_URL = "../../assets";
const comicsDeseo = 'ComicsDeseo.json'

@Injectable()
export class ComicDeseoService{
    
    constructor(private http: HttpClient){}
        
        getComicsDeseo():Observable<ComicDeseo[]>
            {
            
            return this.http.get<ComicDeseo[]>(API_URL + comicsDeseo);
        
    }
}


