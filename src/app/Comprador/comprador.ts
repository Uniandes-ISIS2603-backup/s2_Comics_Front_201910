import {Coleccionista} from '../Coleccionista/coleccionista'

/**
 * Clase que representa el comprador.
 */
export class Comprador extends Coleccionista
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

    /**
     * Cambia el correo de un comprador
     * @param correo El correo que será renovado
     */
    public setCorreoElectronico(correo:string):void
    {
        this.correoElectronico = correo;
    }

    /**
     * Cambia el nombre de un comprador
     * @param nombre El nombre nuevo del comprador
     */
    public setNombre(nombre:string):void
    {
        this.nombre = nombre;
    }

    /**
     * Cambia el id de un comprador
     * @param id el id nuevo de un comprador
     */
    public setId(id:number):void
    {
        this.id = id;
    }

    /**
     * Cambia la foto de un comprador.
     * @param foto la nueva foto del comprador
     */
    public setFoto(foto:string):void
    {
        this.foto = foto;
    }

    /**
     * Cambia lo intereses de un comprador.
     * @param intereses Lo intereses nuevos del comprador.
     */
    public setIntereses(intereses:string):void
    {
        this.intereses = intereses;
    }

    /**
     * Cambia el alias de un comprador.
     * @param alias el alias nuevo de un comprador.
     */
    public setAlias(alias:string):void
    {
        this.alias = alias;
    }
}