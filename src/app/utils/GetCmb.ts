import { ApiService } from "../services/api.service";

export async function MostrarRolActive(api: ApiService) {
    try {
        const rolList = await api.get('rol/list-activo').toPromise();
        return rolList.data;
    } catch (error) {
        console.error("Error en Mostrar Roles:", error);
        return error;
    }
}

export async function MostrarMarca(api: ApiService) {
    try{
      const marcaList = await api.get('marca/list').toPromise();
      return marcaList.data;
    } catch (error) {
        console.error("Error en Mostrar Marca de producto:", error);
        return error;
    }
}

export async function MostrarColor(api: ApiService) {
    try{
      const colorList = await api.get('color/list').toPromise();
      return colorList.data;
    } catch (error) {
        console.error("Error en Mostrar Color de producto:", error);
        return error;
    }
}

export async function MostrarTalla(api: ApiService) {
    try{
      const tallaList = await api.get('talla/list').toPromise();
      return tallaList.data;
    } catch (error) {
        console.error("Error en Mostrar Talla de producto:", error);
        return error;
    }
}

export async function MostrarModelo(api: ApiService) {
    try{
      const modeloList = await api.get('modelo/list').toPromise();
      return modeloList.data;
    } catch (error) {
        console.error("Error en Mostrar modelo de producto:", error);
        return error;
    }
}

export async function MostrarProducto(api: ApiService) {
    try{
      const productoList = await api.get('producto/list').toPromise();
      return productoList.data;
    } catch (error) {
        console.error("Error en Mostrar modelo de producto:", error);
        return error;
    }
}


  