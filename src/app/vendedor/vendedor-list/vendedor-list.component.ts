import { Component, OnInit } from '@angular/core';





import { Vendedor } from '../vendedor';
import { VendedorService } from '../vendedor.service';

/**
 * The component for the list of editorials in the BookStore
 */
@Component({
    selector: 'list-vendedor',
    templateUrl: './vendedor-list.component.html', 
})
export class VendedorListComponent implements OnInit {

    /**
     * Constructor for the component
     * @param editorialService The author's services provider
     */
    constructor(private vendedorService: VendedorService) { }
    
    /**
     * The list of editorials which belong to the BookStore
     */
    vendedores: Vendedor[];

    /**
     * Asks the service to update the list of editorials
     */
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