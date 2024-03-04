import { Component, ViewChild } from '@angular/core';
import { MatDialog, MatDialogClose } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { API_URL } from 'src/app/ServicioApi/apiConfig';
import { ApiService } from 'src/app/services/api.service';
import { Producto } from 'src/app/models/interfaces/producto.interface';

import { MatCrearProductosComponent } from '../mat-crear-productos/mat-crear-productos.component';
import { MatEditarProductosComponent } from '../mat-editar-productos/mat-editar-productos.component';
import { MatEliminarComponent } from 'src/app/components/mat-eliminar/mat-eliminar.component';

import { MatSort } from '@angular/material/sort';
import { NotificadorComponent } from 'src/app/components/notificador/notificador.component';
import { MostrarProducto } from 'src/app/utils/GetCmb';
import { ExcelService } from 'src/app/services/excel.service';
import * as XLSX from 'xlsx';
import { compareArrays } from 'src/app/utils/compareArrays';
import { DialogCloseComponent } from 'src/app/materials/dialog-close/dialog-close.component';
import { pdfcreate } from 'src/app/utils/fichaProductoPDF';


@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('fileInput') fileInput: any;
  productoData: Producto[];
  

  ngAfterViewInit(): void {
     if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }
  
  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  constructor(public dialog: MatDialog, private api: ApiService,private paginatorIntl: MatPaginatorIntl, 
    private notificadorRef:NotificadorComponent, private excelService: ExcelService,) { 
    this.paginatorIntl.itemsPerPageLabel = 'Elementos por página';
    this.mostrarProducto();
  }

  displayedColumns: string[] = ['codigo', 'descripcion', 'marca', 'modelo', 'color', 'talla', 'precio' , 'imagen','acciones'];
  dataSource = new MatTableDataSource<Producto>([]);
  
  API_URL = API_URL;

  async mostrarProducto(){
    const productoList: Producto[] = await MostrarProducto(this.api);
    this.productoData = productoList

    this.dataSource = new MatTableDataSource(this.productoData);

    this.paginator.length = this.productoData.length
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

  

  selectFile(): void {
    const dialogClose = this.dialog.open(DialogCloseComponent, {
      data: {
        tittle: "¡Referencia!",
        message: 'Recuerda que el archivo excel debe tener valores válidos y esta estructura de columnas: \n descripcion - marca - modelo - color - talla - precio'
      }
    });
    dialogClose.afterClosed().subscribe(() => {
      this.fileInput.nativeElement.click();
    });
    
  }

  

  onFileInputChange(event: any): void {
    
    const target: DataTransfer = <DataTransfer>(event.target);
    const fileName: string = target.files[0].name.toLowerCase();

    if (target.files.length !== 1) {
      this.dialog.open(DialogCloseComponent, {
        data:{tittle: "Error de archivo", message: 'Seleccione un solo archivo'}
      })
      throw new Error('Seleccione un solo archivo');
    }

    if (!(fileName.endsWith('.xls') || fileName.endsWith('.xlsx') || fileName.endsWith('.csv'))) {
      this.dialog.open(DialogCloseComponent, {
        data:{tittle: "Error al cargar", message: 'Seleccione un archivo Excel válido (.xls, .xlsx, .csv)'}
      })
      throw new Error('Seleccione un archivo Excel válido (.xls, .xlsx, .csv)');
    }

    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      const bstr: string = e.target.result;
      const workbook: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

      // Obtener el nombre de la primera hoja
      const sheetName = workbook.SheetNames[0];
      const worksheet: XLSX.WorkSheet = workbook.Sheets[sheetName];

      // Declarar variables de header(solo para validacion correcta de los headers de excel) y filas
      const headers: string[] = [];
      let rowData: { [key: string]: any[] } = {};

      const range = XLSX.utils.decode_range(worksheet['!ref']);
      console.log(range)
      //------------ Obtener los nombres de las columnas 
      for (let C = range.s.c; C <= range.e.c; ++C) {
        const address = XLSX.utils.encode_col(C) + '1';
        const cell = worksheet[address];
        if(cell){
          headers.push(cell.v);
        }else{
          console.log('falta columna')
        }
      }



      const tableColumns: string[] = ['descripcion', 'marca', 'modelo', 'color', 'talla', 'precio'];
    
      const headersLowercase = headers.map(header => header.toLowerCase().trim());
      if (compareArrays(headersLowercase, tableColumns)) {
        for (let C = range.s.c; C <= range.e.c; ++C) {
          const columnName = headers[C];
          let auxColumnaName;
          
          if (!rowData[columnName] && columnName) {
            auxColumnaName = columnName.toLowerCase().trim()
            rowData[auxColumnaName] = [];
          }
      
          for (let R = range.s.r + 1; R <= range.e.r + 1; R++) {
            const cellAddress = XLSX.utils.encode_col(C) + R;
            const cell = worksheet[cellAddress];

            if(cell){
              if(cell.v){
                rowData[auxColumnaName].push(cell.v);
              }
            }else{
              if(!rowData[auxColumnaName]){
              }else{
                rowData[auxColumnaName].push(null);
              }
              
            }      
          }
        }

        for(const key in rowData) {
          if (Array.isArray(rowData[key]) && rowData[key].length > 1) {
            rowData[key].shift();
          }
        }
        
  
        this.api.post('producto/excelImport', rowData).subscribe(response => {
          if (response.status) {
            this.openSnackBar(response.message)
            this.mostrarProducto();
          } else {
            this.dialog.open(DialogCloseComponent, {
              data:{tittle: "error en la solicitud", message: response.message}
            })
            
          }
        }, error => {
          this.openSnackBar("Error al importar el excel", "cancel")
          console.error('Error en la solicitud:'+ error);
        });

      } else {
        this.dialog.open(DialogCloseComponent, {
          data:{tittle: "Error al subir Excel", message: "Los nombres de las columnas no coinciden"}
        })
      }
      
    };

    reader.readAsBinaryString(target.files[0]);
  }

  exportToExcel(): void{
    const dataToExport = this.dataSource.filteredData;

    this.excelService.exportToExcel(dataToExport, 'nombre-del-archivo');
  }



  openCreate() {
    const dialogRef = this.dialog.open(MatCrearProductosComponent, {
      width: '60vw',
      height: '80vh'
     });
     dialogRef.afterClosed().subscribe(() => {
        this.mostrarProducto();
     });
  }

  openViewPDF(producto: Producto){
    pdfcreate(producto);
  }

  openUpdate(producto: Producto) {
     const dialogRef = this.dialog.open(MatEditarProductosComponent, {
       data: producto,
       width: '60vw',
       height: '80vh'
     });
     dialogRef.afterClosed().subscribe(() => {
       this.mostrarProducto();
     });
  }

  openDelete(producto: Producto) {
    const dialogRef = this.dialog.open(MatEliminarComponent);
    
    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.api.post('producto/delete', producto).subscribe(response => {
          if (response.status) {
            this.openSnackBar(response.message)
            this.mostrarProducto();
          } else {
            this.openSnackBar("Error al eliminado la producto", "cancel")
          }
        }, error => {
          this.openSnackBar("Error al eliminado la producto", "cancel")
          console.error('Error en la solicitud:'+ error);
        });
      }           
    });
  }
  
  openSnackBar(message: string, image: string = 'check_circle') {
    this.notificadorRef.openSnackBar(message, image, 5);
  }

}
