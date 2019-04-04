import { Component, OnInit } from "@angular/core";
import { listener } from "@angular/core/src/render3/instructions";

@Component({
    selector:'app-form',
    templateUrl: 'formulario.component.html',
    styleUrls: ['formulario.component.css']
})

export class FormularioComponent implements OnInit
{
    
    ngOnInit()
    {

    }

    getConsole():void
    {
        console.log('Hola');
    }
}