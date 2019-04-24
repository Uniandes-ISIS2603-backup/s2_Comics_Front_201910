import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdenPedidoDetailComponent } from './orden-pedido-detail.component';

describe('OrdenPedidoDetailComponent', () => {
  let component: OrdenPedidoDetailComponent;
  let fixture: ComponentFixture<OrdenPedidoDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdenPedidoDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdenPedidoDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
