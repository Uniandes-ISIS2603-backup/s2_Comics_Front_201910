import { OrdenPedidoModule } from './orden-pedido.module';

describe('OrdenPedidoModule', () => {
  let ordenPedidoModule: OrdenPedidoModule;

  beforeEach(() => {
    ordenPedidoModule = new OrdenPedidoModule();
  });

  it('should create an instance', () => {
    expect(ordenPedidoModule).toBeTruthy();
  });
});
