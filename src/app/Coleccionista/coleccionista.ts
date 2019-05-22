/**
 * Clase abstracta que representa un coleccionista
 */
export abstract class Coleccionista
{
    /**
     * El id de un coleccionista
     */
    id:number;

    /**
     * El alias de un coleccionista
     */
    alias:string;

    /**
     * Los intereses de un comprador
     */
    intereses:string;

    /**
     * El correo Electronico de un coleccionista
     */
    correoElectronico:string;

    /**
     * La foto de un coleccionista
     */
    foto:string;

    /**
     * El nombre de un coleccionista
     */
    nombre:string;

    /**
     *
     */
    password:string;
}