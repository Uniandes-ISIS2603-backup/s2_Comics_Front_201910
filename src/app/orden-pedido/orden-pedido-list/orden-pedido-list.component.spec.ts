import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdenPedidoListComponent } from './orden-pedido-list.component';

describe('OrdenPedidoListComponent', () => {
  let component: OrdenPedidoListComponent;
  let fixture: ComponentFixture<OrdenPedidoListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdenPedidoListComponent ]
    })
        .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdenPedidoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
