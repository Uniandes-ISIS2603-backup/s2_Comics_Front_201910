/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
 
import {Component, OnInit} from '@angular/core';
import {ComicDeseo} from '../ComicDeseo';
import {ComicDeseoService} from '../comicDeseo.service';


@Component({
    selector:'list-comicDeseo',
    templateUrl:'./comicDeseo-list.component.html',
    styleUrls:['./comicDeseo-List.component.css']
    
})

export class ComicDeseoListComponent implements OnInit{
    
    constructor(private comicsDeseoService:ComicDeseoService){
      
        
    }
    
    comicsDeseo: ComicDeseo[]=new Array();
    
    
    getComicsDeseo():void{
        
        console.log("In get comics deseo");
    //this.comicsDeseoService.getComicsDeseo()
     // .subscribe(comicDArr => {
      //  let temp: ComicDeseo[] = comicDArr;
      //  temp.forEach(c => {
          
            
              
        //        this.comicDeseo.push(c);
                
              
            
          
      //  });
     // });

     this.comicsDeseoService.getComicsDeseo()
     .subscribe(comicsDeseo =>
         this.comicsDeseo = comicsDeseo);
    }
  
    
    ngOnInit(){
        
        this.getComicsDeseo();
    }
    
    
}