export interface Menu {
    id: any;
    nombre: any;
    padreId?: any;
    posicion?: any;
    icono?: any;
    ruta?: any;
    Habilitado?: any;
    submenus?: Menu[];
    completed?: boolean;
}