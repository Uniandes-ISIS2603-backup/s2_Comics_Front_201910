/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AppRoutingModule } from '../../app-routing/app-routing.module';
import { APP_BASE_HREF } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { AppModule } from '../../app.module';

import { VendedorListComponent } from './vendedor-list.component';
import {VendedorService} from '../vendedor.service';
import { Vendedor } from '../vendedor';

describe('VendedorListComponent', () => {
    let component: VendedorListComponent;
    let fixture: ComponentFixture<VendedorListComponent>;
    const vendedores: Vendedor[] = require('../../../assets/vendedores.json');
    
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [ AppRoutingModule, HttpClientModule, AppModule ],
            declarations: [ ],
            providers: [{provide: APP_BASE_HREF, useValue: ''}, VendedorService ]
        })
        .compileComponents();
    }));
    
    beforeEach(() => {
        fixture = TestBed.createComponent(VendedorListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
    
    
    it('should have a list of vendedores', () => {
        component.vendedores = vendedores;
        expect(component.vendedores.length).toEqual(vendedores.length);
    });

    it('a vendedor should be a vendedor (first and last)', () => {
        component.vendedores = vendedores;
        //revisar todos los libros
        expect(component.vendedores[0].nombre).toEqual(vendedores[0].nombre);
        expect(component.vendedores[vendedores.length - 1].nombre).toEqual(vendedores[vendedores.length - 1].nombre);
    });
});

