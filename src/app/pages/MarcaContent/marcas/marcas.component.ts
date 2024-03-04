import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { API_URL } from 'src/app/ServicioApi/apiConfig';
import { ApiService } from 'src/app/services/api.service';
import { Marca } from 'src/app/models/interfaces/marca.interface';

import { MatCrearMarcasComponent } from '../mat-crear-marcas/mat-crear-marcas.component';
import { MatEditarMarcasComponent } from '../mat-editar-marcas/mat-editar-marcas.component';
import { MatEliminarComponent } from 'src/app/components/mat-eliminar/mat-eliminar.component';

import { MatSort } from '@angular/material/sort';
import { NotificadorComponent } from 'src/app/components/notificador/notificador.component';
import { MostrarMarca } from 'src/app/utils/GetCmb';
import { ExcelService } from 'src/app/services/excel.service';


@Component({
  selector: 'app-marcas',
  templateUrl: './marcas.component.html',
  styleUrls: ['./marcas.component.scss']
})
export class MarcaComponent { 
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  marcaData: Marca[];

  ngAfterViewInit(): void {
     if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }
  
  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  constructor(public dialog: MatDialog, private api: ApiService,private paginatorIntl: MatPaginatorIntl, 
    private notificadorRef:NotificadorComponent, private excelService: ExcelService) { 
    this.paginatorIntl.itemsPerPageLabel = 'Elementos por página';
    this.mostrarMarca();
  }

  displayedColumns: string[] = ['codigo', 'descripcion','acciones'];
  dataSource = new MatTableDataSource<Marca>([]);
  
  API_URL = API_URL;

  async mostrarMarca(){
    const marcaList: Marca[] = await MostrarMarca(this.api);
    this.marcaData = marcaList

    this.dataSource = new MatTableDataSource(this.marcaData);

    this.paginator.length = this.marcaData.length
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }

  filterTable(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  exportToExcel(): void{
    const dataToExport = this.dataSource.filteredData;

    this.excelService.exportToExcel(dataToExport, 'nombre-del-archivo');
  }

  openCreate() {
    const dialogRef = this.dialog.open(MatCrearMarcasComponent, {
      width: '50vw',
      height: '50vh'
     });
     dialogRef.afterClosed().subscribe(() => {
        this.mostrarMarca();
     });
  }

  openUpdate(marca: Marca) {
     const dialogRef = this.dialog.open(MatEditarMarcasComponent, {
       data: marca,
       width: '50vw',
       height: '60vh'
     });
     dialogRef.afterClosed().subscribe(() => {
       this.mostrarMarca();
     });
  }

  openDelete(marca: Marca) {
    const dialogRef = this.dialog.open(MatEliminarComponent);
    
    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.api.post('marca/delete', marca).subscribe(response => {
          if (response.status) {
            this.openSnackBar(response.message)
            this.mostrarMarca();
          } else {
            this.openSnackBar("Error al eliminado la marca", "cancel")
          }
        }, error => {
          this.openSnackBar("Error al eliminado la marca", "cancel")
          console.error('Error en la solicitud:'+ error);
        });
      }           
    });
  }
  
  openSnackBar(message: string, image: string = 'check_circle') {
    this.notificadorRef.openSnackBar(message, image, 5);
  }



}
