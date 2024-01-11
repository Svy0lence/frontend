import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { API_URL } from 'src/app/ServicioApi/apiConfig';
import { Producto } from 'src/app/models/interfaces/producto.interface';
import { ApiService } from 'src/app/services/api.service';
import { ProductosEliminarComponent } from '../productos-eliminar/productos-eliminar.component';
import { NotificadorComponent } from 'src/app/notificador/notificador.component';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.scss']
})
export class InventarioComponent implements OnInit, AfterViewInit {
  
  @ViewChild('paginator') paginator!: MatPaginator;

  ngAfterViewInit(): void {
     if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }
  
  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  constructor(public dialog: MatDialog, private api: ApiService,private paginatorIntl: MatPaginatorIntl,private router:Router,
    private activatedRoute: ActivatedRoute, private notificadorRef:NotificadorComponent) { 
    this.paginatorIntl.itemsPerPageLabel = 'Elementos por página';
    this.mostrarInventario();
  }

  displayedColumns: string[] = ['clave', 'descripcion','precio','categoria','departamento','unidad', 'stock' ,'photo', 'acciones'];
  dataSource = new MatTableDataSource<Producto>([]);
  pageIndex = 0;
  pageSize = 30;
  pageSizeOptions = [30, 50, 100];
  API_URL = API_URL;

  openSnackBar() {
    const message = 'Producto Eliminado Correctamente'; 
    this.notificadorRef.openSnackBar(message, 'check_circle', 5);
  }

  async mostrarInventario(){
    try {
      const productoList = await this.api.get('inventario/stocks').toPromise();
      console.log("categorias lista de api: " + productoList.data)
      const startIndex = this.pageIndex * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      this.dataSource = productoList.data
        .slice(startIndex, endIndex)
        .map((producto: Producto) => {
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
          };
        });
      console.log('this.paginator:', this.paginator);
      console.log(productoList.data)
      if (this.paginator) {
        this.paginator.length = productoList.data.length;
      }
    } catch (error) {
      console.error('Error al obtener la lista de usuarios', error);
    }
    
  }

  openDialog() {
    this.router.navigate(['../crearProductos'], { relativeTo: this.activatedRoute });
    
  }

  opendialog2(producto: Producto) {
    const productoString = JSON.stringify(producto)
    console.log(productoString)

    const navigationExtras: NavigationExtras = {
      queryParams: producto
    }

    this.router.navigate(['/dashboard/editarProductos'], navigationExtras)
  }

  messageAlert(producto: Producto) {
    const dialogRef = this.dialog.open(ProductosEliminarComponent);
     
    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.api.post('producto/delete', producto).subscribe(response => {
          if (response.status) {
            this.openSnackBar();
            this.mostrarInventario();
          } else {
            alert("Error al eliminado la producto :C")
          }
        }, error => {
          console.error('Error en la solicitud:'+ error);
        });
      }              
    });
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
  }

}
