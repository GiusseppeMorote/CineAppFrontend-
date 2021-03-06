import { Pelicula } from 'src/app/_model/pelicula';
import { Cliente } from './cliente';
import { DetalleVenta } from './detalleVenta';
export class Venta{
    idVenta:number;
    fecha:string;
    cliente:Cliente;
    pelicula:Pelicula;
    cantidad:number;
    total:number;
    detalle: DetalleVenta[];
}