import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { API_URL } from 'src/app/ServicioApi/apiConfig';
import { ApiService } from 'src/app/services/api.service';
import { Color } from 'src/app/models/interfaces/color.interface';

import { MatCrearColoresComponent } from '../mat-crear-colores/mat-crear-colores.component';
import { MatEditarColoresComponent } from '../mat-editar-colores/mat-editar-colores.component';
import { MatEliminarComponent } from 'src/app/components/mat-eliminar/mat-eliminar.component';

import { MatSort } from '@angular/material/sort';
import { NotificadorComponent } from 'src/app/components/notificador/notificador.component';
import { MostrarColor } from 'src/app/utils/GetCmb';
import { ExcelService } from 'src/app/services/excel.service';



@Component({
  selector: 'app-colores',
  templateUrl: './colores.component.html',
  styleUrls: ['./colores.component.scss']
})
export class ColoresComponent { 
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  colorData: Color[];

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
    this.mostrarColor();
  }

  displayedColumns: string[] = ['codigo', 'descripcion','acciones'];
  dataSource = new MatTableDataSource<Color>([]);
  
  API_URL = API_URL;

  async mostrarColor(){
    const colorList: Color[] = await MostrarColor(this.api);
    this.colorData = colorList

    this.dataSource = new MatTableDataSource(this.colorData);

    this.paginator.length = this.colorData.length
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
    const dialogRef = this.dialog.open(MatCrearColoresComponent, {
      width: '50vw',
      height: '50vh'
     });
     dialogRef.afterClosed().subscribe(() => {
        this.mostrarColor();
     });
  }

  openUpdate(color: Color) {
     const dialogRef = this.dialog.open(MatEditarColoresComponent, {
       data: color,
       width: '50vw',
       height: '60vh'
     });
     dialogRef.afterClosed().subscribe(() => {
       this.mostrarColor();
     });
  }

  openDelete(color: Color) {
    const dialogRef = this.dialog.open(MatEliminarComponent);
    
    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.api.post('color/delete', color).subscribe(response => {
          if (response.status) {
            this.openSnackBar(response.message)
            this.mostrarColor();
          } else {
            this.openSnackBar("Error al eliminado la color", "cancel")
          }
        }, error => {
          this.openSnackBar("Error al eliminado la color", "cancel")
          console.error('Error en la solicitud:'+ error);
        });
      }           
    });
  }
  
  openSnackBar(message: string, image: string = 'check_circle') {
    this.notificadorRef.openSnackBar(message, image, 5);
  }



}
