/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import { Comic } from "../Comic/Comic";

export class ComicDeseo extends Comic{

  /**
   * fecha de agregado del comic a la lista de deseos
   */
  fechaAgregado:String;


  // comic:Comic;

  public darFecha():String{

    return this.fechaAgregado;
  }
}
