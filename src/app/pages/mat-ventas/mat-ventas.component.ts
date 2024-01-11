import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Producto } from 'src/app/models/interfaces/producto.interface';

import { SharedDataService } from 'src/app/services/DatosVentas.service';

@Component({
  selector: 'app-mat-ventas',
  templateUrl: './mat-ventas.component.html',
  styleUrls: ['./mat-ventas.component.scss']
})
export class MatVentasComponent {
  productSelect: any[]= [];
  searchTerm: string;

  displayedColumns: string[] = ['clave', 'descripcion', 'precio', 'lote','stock' , 'seleccionar'];
  dataSource = new MatTableDataSource<Producto>([]);

  ngOnInit(): void {
  }

  actualizarSelectPrice(producto: any, nuevoPrecio: string): void {
    producto.selectPrice = nuevoPrecio;
    console.log("ra: "+producto.selectPrice)
  }

  actualizarSelectLote(producto: any, nuevoLoteId: number): void {
    producto.selectLote = nuevoLoteId;
    console.log(producto.selectLote)
  }

  constructor(private api: ApiService, private dialogRef: MatDialogRef<MatVentasComponent>, private sharedDataService: SharedDataService ){
    
  }

  
  selectProduct(product: any) {
    product.isSelected = !product.isSelected;

    if (product.isSelected) {
      this.sharedDataService.sendSelectedProducts([{
        ...product,
        selectPrice: product.selectPrice 
      }]);
    } else {
      this.sharedDataService.removeSelectedProduct(product.id);
    }
  }





  async filterProducts() {
    if (this.searchTerm.trim() !== '') {

      const buscar = {
        search: this.searchTerm
      }

      const listaTable = await this.api.post('venta/search', buscar).toPromise();
      console.log(listaTable.data)
      this.dataSource =  listaTable.data.map((producto: Producto) => {
        console.log(producto.listaLote[0].clave)
        return {
          id :producto.id,  
          clave:producto.clave,
          descripcion:producto.descripcion,
          image:producto.image,
          id_categoria:producto.id_categoria,
          categoria: producto.categoria,
          id_departamento :producto.id_departamento,
          departamento: producto.departamento,
          id_unidad_compra :producto.id_unidad_compra,
          unidad_compra: producto.unidad_compra,
          precio_venta_1:producto.precio_venta_1,
          precio_venta_2:producto.precio_venta_2,
          precio_venta_3:producto.precio_venta_3,
          costo_compra:producto.costo_compra,           
          p_med_mayoreo:producto.p_med_mayoreo,
          p_mayoreo:producto.p_mayoreo,
          cant_med_mayoreo:producto.cant_med_mayoreo,
          cant_mayoreo:producto.cant_mayoreo,
          stock_actual:producto.stock_actual,

          listaLote: producto.listaLote,
          selectPrice: producto.precio_venta_1,
          selectLote: producto.listaLote[0].id,         
        };
      });


    }
  }
  
  

}
