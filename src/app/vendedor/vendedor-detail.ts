/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


import { Calificacion } from "./calificacion";

import { Vendedor } from "./vendedor";

export class VendedorDetail extends Vendedor {
    
    /** Los libros del author **/
   calificaciones : Calificacion[];
    
}