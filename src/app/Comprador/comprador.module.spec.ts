import { CompradorModule } from './comprador.module';

describe('CompradorModule', () =>
{
    let compradorModule : CompradorModule;

    beforeEach(() =>
    {
        compradorModule = new CompradorModule();
    });

    it('Debería crear una instancia', () =>
    {
        expect(compradorModule).toBeTruthy();
    });
});