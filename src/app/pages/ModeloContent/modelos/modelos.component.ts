import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { API_URL } from 'src/app/ServicioApi/apiConfig';
import { ApiService } from 'src/app/services/api.service';
import { Modelo } from 'src/app/models/interfaces/modelo.interface';

import { MatCrearModelosComponent } from '../mat-crear-modelos/mat-crear-modelos.component';
import { MatEditarModelosComponent } from '../mat-editar-modelos/mat-editar-modelos.component';
import { MatEliminarComponent } from 'src/app/components/mat-eliminar/mat-eliminar.component';

import { MatSort } from '@angular/material/sort';
import { NotificadorComponent } from 'src/app/components/notificador/notificador.component';
import { MostrarModelo } from 'src/app/utils/GetCmb';
import { ExcelService } from 'src/app/services/excel.service';


@Component({
  selector: 'app-modelos',
  templateUrl: './modelos.component.html',
  styleUrls: ['./modelos.component.scss']
})
export class ModelosComponent { 
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  modeloData: Modelo[];

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
    this.mostrarModelo();
  }

  displayedColumns: string[] = ['codigo', 'descripcion','acciones'];
  dataSource = new MatTableDataSource<Modelo>([]);
  
  API_URL = API_URL;

  async mostrarModelo(){
    const modeloList: Modelo[] = await MostrarModelo(this.api);
    this.modeloData = modeloList

    this.dataSource = new MatTableDataSource(this.modeloData);

    this.paginator.length = this.modeloData.length
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
    const dialogRef = this.dialog.open(MatCrearModelosComponent, {
      width: '50vw',
      height: '50vh'
     });
     dialogRef.afterClosed().subscribe(() => {
        this.mostrarModelo();
     });
  }

  openUpdate(modelo: Modelo) {
     const dialogRef = this.dialog.open(MatEditarModelosComponent, {
       data: modelo,
       width: '50vw',
       height: '60vh'
     });
     dialogRef.afterClosed().subscribe(() => {
       this.mostrarModelo();
     });
  }

  openDelete(modelo: Modelo) {
    const dialogRef = this.dialog.open(MatEliminarComponent);
    
    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.api.post('modelo/delete', modelo).subscribe(response => {
          if (response.status) {
            this.openSnackBar(response.message)
            this.mostrarModelo();
          } else {
            this.openSnackBar("Error al eliminado la modelo", "cancel")
          }
        }, error => {
          this.openSnackBar("Error al eliminado la modelo", "cancel")
          console.error('Error en la solicitud:'+ error);
        });
      }           
    });
  }
  
  openSnackBar(message: string, image: string = 'check_circle') {
    this.notificadorRef.openSnackBar(message, image, 5);
  }



}
