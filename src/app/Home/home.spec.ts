//import { CompradorListComponent } from "./comprador-list.component";
import {ComicDeseoListComponent} from "../ComicDeseo/ComicDeseo-List/comicDeseo-list.component";
import { ComponentFixture, async, TestBed } from "@angular/core/testing";
//import { Comprador } from "../comprador";
import {ComicDeseo} from "../ComicDeseo/ComicDeseo";
import { AppRoutingModule } from "src/app/app-routing/app-routing.module";
import { HttpClientModule } from "@angular/common/http";
import { AppModule } from "src/app/app.module";
import { APP_BASE_HREF } from "@angular/common";
//import { CompradorService } from "../comprador.service";
import {ComicDeseoService} from "../ComicDeseo/comicDeseo.service";

describe('ComicDeseoListComponent', () =>
{
    let component: ComicDeseoListComponent;
    let fixture: ComponentFixture<ComicDeseoListComponent>
    const comicsDeseo: ComicDeseo[] = require('../../../assets/ComicsDeseo.json');

    beforeEach(async(() =>
    {
        TestBed.configureTestingModule({
            imports:[AppRoutingModule, HttpClientModule, AppModule],
            declarations: [],
            providers: [{provide: APP_BASE_HREF, useValue: ''}, ComicDeseoService]
        }).compileComponents();
    }));

    beforeEach(()=>
    {
        fixture = TestBed.createComponent(ComicDeseoListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () =>
    {
        expect(component).toBeTruthy();
    });

    it('Debería tener una lista de compradores', ()=>
    {
        component.comicsDeseo = comicsDeseo;
        expect(component.comicsDeseo.length).toEqual(comicsDeseo.length);
    });

   
})