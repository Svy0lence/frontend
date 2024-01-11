import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { API_URL } from 'src/app/ServicioApi/apiConfig';
import { User } from 'src/app/models/interfaces/user.interface';
import { ApiService } from 'src/app/services/api.service';
import { Categoria } from 'src/app/models/interfaces/categoria.interface';
import { MatEditarCategoriasComponent } from '../mat-editar-categorias/mat-editar-categorias.component';
import { MatEliminarCategoriasComponent } from '../mat-eliminar-categorias/mat-eliminar-categorias.component';
import { MatCrearCategoriasComponent } from '../mat-crear-categorias/mat-crear-categorias.component';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.scss']
})
export class CategoriaComponent {
  @ViewChild('paginator') paginator!: MatPaginator;

  displayedColumns: string[] = ['numero' ,'descripcion', 'estadoCategoria', 'acciones'];
  dataSource = new MatTableDataSource<Categoria>([]);
  pageIndex = 0;
  pageSize = 10;
  pageSizeOptions = [10, 30, 50];
  API_URL = API_URL;

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
    this.mostrarCategorias();
  }

  async mostrarCategorias(){
    try {
      const cateList = await this.api.get('categoria/list').toPromise();
      console.log("categorias lista de api: " + cateList.data)
      const startIndex = this.pageIndex * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      this.dataSource = cateList.data
        .slice(startIndex, endIndex)
        .map((categoria: Categoria) => {
          return {
            id: categoria.id,
            descripcion: categoria.descripcion,
            estadoCategoria: categoria.estadoCategoria
          };
        });
      console.log('this.paginator:', this.paginator);
      if (this.paginator) {
        this.paginator.length = cateList.data.length;
      }
    } catch (error) {
      console.error('Error al obtener la lista de usuarios', error);
    }
    
  }

  openDialog() {
    const dialogRef = this.dialog.open(MatCrearCategoriasComponent, {
      width: '50vw',
       height: '50vh'
     });
     dialogRef.afterClosed().subscribe(() => {
        this.mostrarCategorias();
     });
  }

  opendialog2(selectedCategoria: Categoria) {
     const dialogRef = this.dialog.open(MatEditarCategoriasComponent, {
       data: selectedCategoria,
       width: '50vw',
       height: '60vh'
     });
     dialogRef.afterClosed().subscribe(() => {
      this.mostrarCategorias();
     });
  }

  messageAlert(categoria: Categoria) {
    const dialogRef = this.dialog.open(MatEliminarCategoriasComponent);
     
    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.api.post('categoria/delete', categoria).subscribe(response => {
          if (response.status) {
            alert("eliminado con Eficacia")
            this.mostrarCategorias();
          } else {
            alert("Error al eliminado la categoria :C")
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
