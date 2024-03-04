export interface Producto {
    idProducto?: number;
    NombreProducto: string;
    idMarca: number | null;
    NombreMarca?: string;
    idModelo: number | null;
    NombreModelo?: string;
    idColor: number | null;
    NombreColor?: string;
    idTalla: number | null;
    NombreTalla?: string;
    imagen?: string;
    PrecioVenta: number;
}