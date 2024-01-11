import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { ProductosComponent } from './ventas/productos.component';
import { ClientesComponent } from './clientes/clientes.component';
import { InventarioComponent } from './productos/inventario.component';
import { EntradaProductoComponent } from './entrada-producto/entrada-producto.component';
import { SistemVentasComponent } from './sistem-ventas/sistem-ventas.component';
import { HistoVentasComponent } from './histo-ventas/histo-ventas.component';
import { SalidaProductoComponent } from './salida-producto/salida-producto.component';
import { PermisosComponent } from './permisos/permisos.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { DepartamentoComponent } from './departamento/departamento.component';
import { UnidadMedidaComponent } from './unidad-medida/unidad-medida.component';
import { CrearProductosComponent } from './crear-productos/crear-productos.component';
import { ProductosEditarComponent } from './productos-editar/productos-editar.component';
import { VenderXMLBOLETAFACTURAComponent } from './vender-xmlboleta-factura/vender-xmlboleta-factura.component';

  const routes: Routes=[
  {path: 'dashboard', component: PagesComponent,
    children:[
      {path:'', component:DashboardComponent, data:{titulo:'Dashboard'}},
      {path:'usuarios', component: UsuariosComponent, data:{titulo:'Usuarios'}},
      {path: 'productosVenta', component: ProductosComponent, data:{titulo:'Ventas'}},
      {path: 'clientes', component: ClientesComponent, data:{titulo:'Clientes'}},
      {path: 'productos', component: InventarioComponent, data:{titulo:'Listado de Productos'}},
      {path: 'entraProduc', component: EntradaProductoComponent, data:{titulo:'Entrada de Productos'}},
      {path: 'saliProduc', component: SalidaProductoComponent, data:{titulo:'Salida de Productos'}},
      {path: 'sistemVentas', component: SistemVentasComponent, data:{titulo:'Sistema de Ventas'}},
      {path: 'histoVentas', component: HistoVentasComponent, data:{titulo:'Historial de Ventas'}},
      {path: 'permisos', component: PermisosComponent, data:{titulo:'Permisos'}},
      {path: 'categorias', component: CategoriaComponent, data:{titulo:'Categorias'}},
      {path: 'departamentos', component: DepartamentoComponent, data:{titulo:'Departamentos'}},
      {path: 'uniMedida', component: UnidadMedidaComponent, data:{titulo:'Unidades de medida'}},
      {path: 'crearProductos', component: CrearProductosComponent, data:{titulo:'Creacion de un producto'}},
      {path: 'editarProductos', component: ProductosEditarComponent, data:{titulo:'Edicion de un producto'}},
      {path: 'SeccionBoleta_Factura', component: VenderXMLBOLETAFACTURAComponent, data:{titulo:'¡Felicidades Por la Venta!'}},
    ]
  }
  ]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports:[RouterModule]
})
export class PagesRoutingModule { }
