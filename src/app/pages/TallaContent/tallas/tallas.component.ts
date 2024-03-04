import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { API_URL } from 'src/app/ServicioApi/apiConfig';
import { ApiService } from 'src/app/services/api.service';
import { Talla } from 'src/app/models/interfaces/talla.interface';

import { MatCrearTallasComponent } from '../mat-crear-tallas/mat-crear-tallas.component';
import { MatEditarTallasComponent } from '../mat-editar-tallas/mat-editar-tallas.component';
import { MatEliminarComponent } from 'src/app/components/mat-eliminar/mat-eliminar.component';

import { MatSort } from '@angular/material/sort';
import { NotificadorComponent } from 'src/app/components/notificador/notificador.component';
import { MostrarTalla } from 'src/app/utils/GetCmb';
import { ExcelService } from 'src/app/services/excel.service';



@Component({
  selector: 'app-tallas',
  templateUrl: './tallas.component.html',
  styleUrls: ['./tallas.component.scss']
})
export class TallasComponent { 
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  tallaData: Talla[];

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
    this.mostrarTalla();
  }

  displayedColumns: string[] = ['codigo', 'descripcion','acciones'];
  dataSource = new MatTableDataSource<Talla>([]);
  
  API_URL = API_URL;

  async mostrarTalla(){
    const tallaList: Talla[] = await MostrarTalla(this.api);
    this.tallaData = tallaList

    this.dataSource = new MatTableDataSource(this.tallaData);

    this.paginator.length = this.tallaData.length
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
    const dialogRef = this.dialog.open(MatCrearTallasComponent, {
      width: '50vw',
      height: '50vh'
     });
     dialogRef.afterClosed().subscribe(() => {
        this.mostrarTalla();
     });
  }

  openUpdate(talla: Talla) {
     const dialogRef = this.dialog.open(MatEditarTallasComponent, {
       data: talla,
       width: '50vw',
       height: '60vh'
     });
     dialogRef.afterClosed().subscribe(() => {
       this.mostrarTalla();
     });
  }

  openDelete(talla: Talla) {
    const dialogRef = this.dialog.open(MatEliminarComponent);
    
    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.api.post('talla/delete', talla).subscribe(response => {
          if (response.status) {
            this.openSnackBar(response.message)
            this.mostrarTalla();
          } else {
            this.openSnackBar("Error al eliminado la talla", "cancel")
          }
        }, error => {
          this.openSnackBar("Error al eliminado la talla", "cancel")
          console.error('Error en la solicitud:'+ error);
        });
      }           
    });
  }
  
  openSnackBar(message: string, image: string = 'check_circle') {
    this.notificadorRef.openSnackBar(message, image, 5);
  }



}
