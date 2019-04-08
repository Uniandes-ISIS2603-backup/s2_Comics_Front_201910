/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Comic} from './Comic';
import {Observable} from 'rxjs';

const API_URL = "../../assests";
const comics = 'Comics.json'

@Injectable()
export class ComicService{
    
    constructor(private http: HttpClient){}
        
        getComics():Observable<Comic[]>
        {
            return this.http.get<Comic[]>(API_URL + comics);
        }
}