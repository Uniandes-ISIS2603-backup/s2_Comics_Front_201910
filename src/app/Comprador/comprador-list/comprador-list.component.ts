import {Component, OnInit} from '@angular/core';
import { CompradorService } from '../comprador.service';
import { Comprador } from '../comprador';
import { CompradorDetail } from '../comprador-detail';

@Component({
    selector: 'app-comprador',
    templateUrl: 'comprador-list.component.html',
    styleUrls: ['comprador-list.component.css']
})

export class CompradorListComponent implements OnInit
{
    /**
     * Constructor del componente
     * @param compradorService El servicio proveedor de comprador
     */
    constructor(private compradorService: CompradorService)
    {
        
    }

    /**
     * La lista de los compradores que pertenece a la tienda de comics
     */
    compradores:Comprador[];
    compradorId:number;
    selectedComprador:Comprador;

    onSelected(compradorId:number):void
    {
        this.compradorId = compradorId;
        this.selectedComprador = new CompradorDetail();
        this.getCompradorDetail();
    }

    /**
     * Pide al servicio actualizar la lista de compradores.
     */
    getCompradores(): void
    {
        this.compradorService.getCompradores()
            .subscribe(compradores => {
                this.compradores = compradores;
            });
    }

    /**
     * 
     */
    getCompradorDetail():void
    {
        this.compradorService.getCompradorDetail(this.compradorId)
        .subscribe(selectedComprador=>
            {
                this.selectedComprador = selectedComprador;
            });
    }

    /**
     * Esto inicializa el componente
     * Este método será llamado cuendo el componente es creado.
     */
    ngOnInit()
    {
        this.getCompradores();
    }
}