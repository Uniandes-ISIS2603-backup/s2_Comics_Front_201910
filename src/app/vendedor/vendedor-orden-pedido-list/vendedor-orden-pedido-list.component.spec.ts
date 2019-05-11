import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendedorOrdenPedidoListComponent } from './vendedor-orden-pedido-list.component';

describe('OrdenPedidoListComponent', () => {
  let component: VendedorOrdenPedidoListComponent;
  let fixture: ComponentFixture<VendedorOrdenPedidoListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendedorOrdenPedidoListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendedorOrdenPedidoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
