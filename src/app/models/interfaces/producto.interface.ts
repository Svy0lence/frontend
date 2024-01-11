export interface Producto {
   id?:any,  
   clave:any,
   descripcion:any,
   image?:any,
   id_categoria:any,
   categoria?: any,
   id_departamento :any,
   departamento?: any,
   id_unidad_compra :any,
   unidad_compra?: any,
   costo_compra:any,
   precio_venta_1:any,
   precio_venta_2:any,
   precio_venta_3:any,
   p_med_mayoreo:any,
   p_mayoreo:any,
   cant_med_mayoreo:any,
   cant_mayoreo:any,
   estadoProducto?:any,
   stock_actual?: any,

   listaLote?: any,
   total_salidas?:any

}