import {ColeccionistaModule} from '../Coleccionista/coleccionista.module'

export class Comprador extends ColeccionistaModule
{
    /**
     * Representa el id del comprador
     * @return un número con el id del comprador
     */
    public darId():number
    {
        return this.id;
    }

    /**
     * Representa el alias del comprador
     * @return un string con el alias del comprador
     */
    public darAlias():string
    {
        return this.alias;
    }

    /**
     * Representa los intereses de un comprador
     * @return los intereses de un comprador
     */
    public darIntereses():string
    {
        return this.intereses;
    }

    /**
     * Representa el correo electronico de un comprador.
     * @return el correo de un comprador
     */
    public darCorreoElectronico():string
    {
        return this.correoElectronico;
    }

    /**
     * Representa la foto del comprador
     * @return la foto del comprador
     */
    public darFoto():string
    {
        return this.foto;
    }


    /**
     * Representa el nombre del comprador al que se accede
     * @return el nombre del comprador
     */
    public darNombre():string
    {
        return this.nombre;
    }
}