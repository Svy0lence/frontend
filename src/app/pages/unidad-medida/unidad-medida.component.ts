import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { API_URL } from 'src/app/ServicioApi/apiConfig';
import { User } from 'src/app/models/interfaces/user.interface';
import { ApiService } from 'src/app/services/api.service';
import { UnidadCompras } from 'src/app/models/interfaces/unidadCompras.interface';
import { MatCrearUnidadComprasComponent } from '../mat-crear-unidad-compras/mat-crear-unidad-compras.component';
import { MatEditarUnidadMedidasComponent } from '../mat-editar-unidad-medidas/mat-editar-unidad-medidas.component';
import { MatEliminarUnidadMedidasComponent } from '../mat-eliminar-unidad-medidas/mat-eliminar-unidad-medidas.component';

@Component({
  selector: 'app-unidad-medida',
  templateUrl: './unidad-medida.component.html',
  styleUrls: ['./unidad-medida.component.scss']
})
export class UnidadMedidaComponent {
   
  @ViewChild('paginator') paginator!: MatPaginator;

  ngAfterViewInit(): void {
     if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }
  
  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  constructor(public dialog: MatDialog, private api: ApiService,private paginatorIntl: MatPaginatorIntl) { 
    this.paginatorIntl.itemsPerPageLabel = 'Elementos por página';
    this.mostrarUnidades();
  }

  displayedColumns: string[] = ['numero', 'descripcion', 'estadoUnidad', 'acciones'];
  dataSource = new MatTableDataSource<User>([]);
  pageIndex = 0;
  pageSize = 30;
  pageSizeOptions = [30, 50, 100];
  API_URL = API_URL;

  async mostrarUnidades(){
    try {
      const UnidadList = await this.api.get('unidad/list').toPromise();
      console.log("categorias lista de api: " + UnidadList.data)
      const startIndex = this.pageIndex * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      this.dataSource = UnidadList.data
        .slice(startIndex, endIndex)
        .map((unidad: UnidadCompras) => {
          return {
            id: unidad.id,
            descripcion: unidad.descripcion,
            estadoUnidad: unidad.estadoUnidad
          };
        });
      console.log('this.paginator:', this.paginator);
      if (this.paginator) {
        this.paginator.length = UnidadList.data.length;
      }
    } catch (error) {
      console.error('Error al obtener la lista de unidad', error);
    }
    
  }

  openDialog() {
    const dialogRef = this.dialog.open(MatCrearUnidadComprasComponent, {
      width: '50vw',
      height: '50vh'
     });
     dialogRef.afterClosed().subscribe(() => {
        this.mostrarUnidades();
     });
  }

  opendialog2(selectedUni: UnidadCompras) {
     const dialogRef = this.dialog.open(MatEditarUnidadMedidasComponent, {
       data: selectedUni,
       width: '50vw',
       height: '60vh'
     });
     dialogRef.afterClosed().subscribe(() => {
       this.mostrarUnidades();
     });
  }

  messageAlert(unidad: UnidadCompras) {

    const dialogRef = this.dialog.open(MatEliminarUnidadMedidasComponent);

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.api.post('unidad/delete', unidad).subscribe(response => {
          if (response.status){    
            alert("eliminado con Eficacia")
            this.mostrarUnidades();    
          } else {
            alert("Error al eliminado el usuario :C")
          }
        }, error => {
          console.error('Error en la solicitud:', error);
          console.error('Error al eliminado el usuario: ' + unidad.id);
        });
      }
    });
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
  }

}
