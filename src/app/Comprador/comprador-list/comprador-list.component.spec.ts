import { CompradorListComponent } from "./comprador-list.component";
import { ComponentFixture, async, TestBed } from "@angular/core/testing";
import { Comprador } from "../comprador";
import { AppRoutingModule } from "src/app/app-routing/app-routing.module";
import { HttpClientModule } from "@angular/common/http";
import { AppModule } from "src/app/app.module";
import { APP_BASE_HREF } from "@angular/common";
import { CompradorService } from "../comprador.service";

describe('CompradorListComponent', () =>
{
    let component: CompradorListComponent;
    let fixture: ComponentFixture<CompradorListComponent>
    const compradores: Comprador[] = require('../../../assets/compradores.json');

    beforeEach(async(() =>
    {
        TestBed.configureTestingModule({
            imports:[AppRoutingModule, HttpClientModule, AppModule],
            declarations: [],
            providers: [{provide: APP_BASE_HREF, useValue: ''}, CompradorService]
        }).compileComponents();
    }));

    beforeEach(()=>
    {
        fixture = TestBed.createComponent(CompradorListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () =>
    {
        expect(component).toBeTruthy();
    });

    it('Debería tener una lista de compradores', ()=>
    {
        component.compradores = compradores;
        expect(component.compradores.length).toEqual(compradores.length);
    });

    it('Un comprador debería ser un comprador (primero y último)', ()=>
    {
        component.compradores = compradores;
        //Revisar todos los compradores
        expect(component.compradores[0].darAlias()).toEqual(compradores[0].darAlias());
        expect(component.compradores[compradores.length - 1].darCorreoElectronico()).toEqual(compradores[compradores.length - 1].darCorreoElectronico());
    })
})