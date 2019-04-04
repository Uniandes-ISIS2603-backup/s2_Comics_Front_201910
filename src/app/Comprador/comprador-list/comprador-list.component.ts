import {Component, OnInit} from '@angular/core';
import { CompradorService } from '../comprador.service';
import { Comprador } from '../comprador';

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
     * Esto inicializa el componente
     * Este método será llamado cuendo el componente es creado.
     */
    ngOnInit()
    {
        this.getCompradores();
    }
}