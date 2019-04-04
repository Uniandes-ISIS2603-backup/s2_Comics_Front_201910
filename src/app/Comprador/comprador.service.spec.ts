import { TestBed, getTestBed } from "@angular/core/testing";
import { CompradorService } from "./comprador.service";
import { Comprador } from "./comprador";
import { HttpClientModule } from "@angular/common/http";
import { AppModule } from "../app.module";
import { APP_BASE_HREF } from "@angular/common";

describe('Service: CompradorService', ()=>
{
    let injector : TestBed;
    let service : CompradorService;
    const compradores: Comprador[] = require('../../assets/compradores.json');

    beforeEach(() =>
    {
        TestBed.configureTestingModule({
            imports: [HttpClientModule, AppModule],
            declarations: [],
            providers: [{provide: APP_BASE_HREF, useValue: ''}, CompradorService]
        });
        injector = getTestBed();
        service = injector.get(CompradorService);
    });

    it('#getCompradores debería retornar un valor de Observable',
    (done: DoneFn)=>
    {
        service.getCompradores().subscribe(value =>
            {
                expect(value.length).toBeGreaterThan(0);
                done();
            });
    });

    it('#getCompradorDetail debería retornar un comprador existente',
    (done: DoneFn)=>
    {
        service.getCompradorDetail(compradores[0].darId()).subscribe(value =>
            {
                expect(value.darAlias()).toEqual(compradores[0].darAlias());
                done();
            });
    });
});