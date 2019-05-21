import { Component, OnInit } from '@angular/core';
import { Vendedor } from '../vendedor';
import { VendedorService } from '../vendedor.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'list-vendedor',
    templateUrl: './vendedor-list.component.html',
    styleUrls: ['./vendedor-list.component.css']
})
export class VendedorListComponent implements OnInit {

    /**
     * Constructor for the component
     * @param editorialService The author's services provider
     */
    constructor(private vendedorService: VendedorService, private route: ActivatedRoute) { }

    /**
     * The list of editorials which belong to the BookStore
     */
    vendedores: Vendedor[];



    //metodo que llama al servicio para inicializar la lista de vendedores
    getVendedores(): void {
        this.vendedorService.getVendedores().subscribe(vendedores => this.vendedores = vendedores);
    }

    /**
     * This will initialize the component by retrieving the list of editorials from the service
     * This method will be called when the component is created
     */
    ngOnInit() {
        this.getVendedores();
    }
}