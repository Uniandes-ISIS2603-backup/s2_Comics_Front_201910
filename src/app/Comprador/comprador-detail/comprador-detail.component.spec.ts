import { CompradorDetailComponent } from "./comprador-detail.component";
import { ComponentFixture, async, TestBed } from "@angular/core/testing";
import { AppRoutingModule } from "src/app/app-routing/app-routing.module";
import { HttpClientModule } from "@angular/common/http";
import { AppModule } from "src/app/app.module";
import { APP_BASE_HREF } from "@angular/common";
import { CompradorService } from "../comprador.service";
import { ActivatedRoute, convertToParamMap } from "@angular/router";

describe('CompradorDetailComponent', () =>
{
    let component: CompradorDetailComponent;
    let fixture: ComponentFixture<CompradorDetailComponent>;

    beforeEach(async(() =>
    {
        TestBed.configureTestingModule(
            {
                imports: [AppRoutingModule, HttpClientModule, AppModule],
                declarations: [],
                providers: [
                    {
                        provide: APP_BASE_HREF,
                        useValue: ''
                    },
                    CompradorService,
                    {
                        provide: ActivatedRoute,
                        useValue:
                        {
                            snapshot:{
                                paramMap: convertToParamMap({id:100})
                            }
                        }
                    }
                ]
            }).compileComponents();
    }));

    beforeEach(() =>
    {
        fixture = TestBed.createComponent(CompradorDetailComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
});