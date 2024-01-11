import { ApiService } from "../services/api.service";


export async function MostrarCategorias(api: ApiService) {
    try {
        const catList = await api.get('categoria/list').toPromise();
        return catList.data;
    } catch (error) {
        console.error("Error en MostrarCategorias:", error);
        return error;
    }
}

//   export async function MostrarDepartamentos() {
//     try {
//       const departList = await this.api.get('departamento/list').toPromise();
//       this.departList = departList.data;
//       console.log(this.departList);
//     } catch (error) {
//       alert(error);
//     }
//   }
  
//   export async function MostrarUnidades() {
//     try {
//       const uniList = await this.api.get('unidad/list').toPromise();
//       this.uniList = uniList.data;
//       console.log(this.uniList);
//     } catch (error) {
//       alert(error);
//     }
//   }
  