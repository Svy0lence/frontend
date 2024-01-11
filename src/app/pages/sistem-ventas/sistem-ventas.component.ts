import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatVentasComponent } from '../mat-ventas/mat-ventas.component';
import { HttpClient } from '@angular/common/http';
import { convertirMontoALetras } from 'src/app/utils/formatoFecha';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl  } from '@angular/platform-browser';
import {MatGridListModule} from '@angular/material/grid-list';


import pdfMake from 'pdfMake/build/pdfmake';
import pdfFonts from 'pdfMake/build/vfs_fonts';
import * as printjs from 'print-js';
import { SharedDataService } from 'src/app/services/DatosVentas.service';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-sistem-ventas',
  templateUrl: './sistem-ventas.component.html',
  styleUrls: ['./sistem-ventas.component.scss']
})
export class SistemVentasComponent {
  productos: any[]=[{name: "0200PORTUGAL", cantidad: 2, valor: 7.5,},{name:"0150PORTUGAL", cantidad: 4, valor: 9.5,},{name:"0100PORTUGAL", cantidad: 3, valor: 2.0,}];


  displayedColumns: string[] = ['nombre', 'precio','cantidad' ,'subtotal','acciones'];
  dataSource = [
  ];

  @ViewChild(MatVentasComponent) matVentasComponent!: MatVentasComponent;


  constructor(public dialog: MatDialog, private http: HttpClient, private activatedRoute: ActivatedRoute, private router:Router, private sanitizer: DomSanitizer, private sharedDataService:SharedDataService){
    
    this.sharedDataService.selectedProducts$.subscribe((productosSeleccionados: any[]) => {
      if (productosSeleccionados) {
        // Actualiza tu dataSource o realiza acciones necesarias con los productos seleccionados
        this.dataSource = productosSeleccionados.map((producto: any) => {
          console.log(producto)
          let cantidadProduct: number = 1;
          return {
             //objeto otorgado
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
             precioseleccionado: producto.selectPrice,

             //variable de cantidad
            cantidad: cantidadProduct,
          };
        });
      }
    });
  }

  async ngOnInit() {
  }

  eliminarProducto(index: number) {
    const productosSeleccionados = this.dataSource.slice(); // Clonar la lista de productos
    productosSeleccionados.splice(index, 1); // Eliminar el producto en la posición 'index'
  
    // Actualizar el dataSource y enviar los productos actualizados al servicio
    this.dataSource = productosSeleccionados;
    this.sharedDataService.sendSelectedProducts(productosSeleccionados);
  }


  openDialog() {
    const dialogRef = this.dialog.open(MatVentasComponent, {
       
      //width: '900px',
      //height:'600px'
      width: '70%',
      height:'70%'
    });


   
  }

  //-------------------Incrementar y Decrementar cantidad----------------------------
  incrementarCantidadFunc= (cantidad: number): number => {
    return cantidad + 1;
  };
  
  decrementarCantidadFunc = (cantidad: number): number => {
    return Math.max(1, cantidad - 1);
  };
  //-------------------Incrementar y Decrementar cantidad-----------------------------
  
  openDialog2() {
    // const dialogRef = this.dialog.open(MatEditarComponent, {
    //   width: '500px',
    //   height:'500px'
    //    // Puedes personalizar el ancho y otras propiedades
    // });
  }

  async urlImagenAbase64(urlImagen: string): Promise<string> {
    try {
      const response = await fetch(urlImagen);
      const blob = await response.blob();
  
      return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
  
        reader.onloadend = () => {
          const base64data = reader.result as string;
          resolve(base64data);
        };
  
        reader.onerror = () => {
          reject(new Error('Error al leer la imagen como base64.'));
        };
  
        reader.readAsDataURL(blob);
      });
    } catch (error) {
      throw new Error(`Error al obtener la imagen: ${error.message}`);
    }
  }

  async venta(){
    //this.router.navigate(['../SeccionBoleta_Factura'], { relativeTo: this.activatedRoute });
    this.pdfcreate();
  }

  async pdfcreate() {
    //DATOS EMPRESA
    const rutaImagen = '../assets/img/miFortaleza2.png'; // Reemplaza con la ruta de tu imagen
    const image64 = await this.urlImagenAbase64(rutaImagen);

    const EMPRESA = 'BOTICA MI FORTALEZA'
    const RUC = 'RUC: '+'10749980473';
    const DIRECCION = 'DIRECCION'
    
    const codFactura = '001-001-0000045678'
    const Fact_Bol = 'Factura'
    const Fech_Hora = new Date().toLocaleString();

    //DATOS CLIENTE
    const Cli_Doc = '1791257049001'
    const Cli_Tel = '912275454'
    const Cliente = 'Jair Santivanez'

    //DATOS PRODUCTOS
    const Productos = this.productos
    let Total_Compra = 0;

    const rows = [];
    for (let ra of Productos) {
      const descripcion = ra.name;
      const cantidad = ra.cantidad;
      const valor = ra.valor;
      const subtotal = (ra.valor*ra.cantidad);
      rows.push([
        { text: descripcion, style: 'tableRow', alignment: 'left' },
        { text: cantidad, style: 'tableRow' },
        { text: valor, style: 'tableRow' },
        { text: subtotal.toFixed(2), style: 'tableRow', alignment: 'right' },
      ]);
      Total_Compra += subtotal;
    }

    //DATOS PAGO
    
    let auxtipo= "Efectivo"

    let Total_Efectivo = 0.00;
    let Total_Credito = 0.00;
    let Total_Tarjeta = 0.00;
    let Total_Pago_Con = 0.00;
    let Monto_Cliente = 0.00;
    const Impuesto = 0.00;
    let montoTotalEnLetras = '';

    switch (auxtipo) {
      case "Efectivo":
        Total_Efectivo = Total_Compra;
        if(Monto_Cliente>Total_Efectivo) Monto_Cliente-=Total_Efectivo
        montoTotalEnLetras = convertirMontoALetras(Total_Efectivo)
        break;
      case "Credito":
        Total_Credito += (1+Total_Compra);
        if(Monto_Cliente>Total_Credito) Monto_Cliente-=Total_Credito
        montoTotalEnLetras = convertirMontoALetras(Total_Credito)
        break;
      case "Tarjeta":
        Total_Tarjeta += (5+Total_Compra);
        if(Monto_Cliente>Total_Tarjeta) Monto_Cliente-=Total_Tarjeta
        montoTotalEnLetras = convertirMontoALetras(Total_Tarjeta)
        break;
      case "PagoCon":
        Total_Pago_Con += (5+Total_Compra);
        if(Monto_Cliente>Total_Pago_Con) Monto_Cliente-=Total_Pago_Con
        montoTotalEnLetras = convertirMontoALetras(Total_Pago_Con)
        break;
      default:
        console.error('Tipo de pago no válido.');
        break;
    }
    
    //DATOS DEL VENDEDOR
    const Vendedor = 'Katy';
    


    //-------------------------------------------------PDF
    const pdfDefinition = {
      pageSize: {
        width: 226.77,
        height: 841.88,
      },
      pageMargins: [10, 20, 10, 20],
      info: {
        title: 'F001-000001',
        author: 'maclode',
        subject: 'ticket',
        keywords: 'tck, sale',
      },
      
      content: [
        {
          image:image64, //Logo
          fit: [100, 40],
          alignment: 'center',
          margin: [0, 0, 0, 10],
        },
        {
          text: EMPRESA,
          style: 'header',
          bold: true,
        },
        {
          text: DIRECCION,
          style: 'header',
        },
        {
          text: RUC,
          style: 'header',
        },


        //----------------------------SubHeader-------------------
        {
          text: 'FECHA DE EMISIÓN '+ Fech_Hora,
          style: 'subheader',
        },
        {
          text: 'COMP. '+Fact_Bol+' ELECTRONICA N°:',
          style: 'subheader',
        },
        {
          text: codFactura,
          style: 'subheader',
        },
        {
          text: 'AMBIENTE: PRODUCCION',
          style: 'subheader',
        },
        {
          text: 'EMISIÓN: NORMAL',
          style: 'subheader',
          margin: [0, 0, 0, 10],
        },


        //-----------------------------body---------------------------------
        {
          text: [
            'Cliente: ',
            { text: Cliente, bold: true},
          ],
          style: 'body',
        },
        {
          text: [
            'RUC/DNI: ',
            { text: Cli_Doc, bold: true},
          ],
          style: 'body',
        },
        {
          text: 'Teléfono: '+Cli_Tel,
          style: 'body',
        },
        {
          text: '--------------------------------------------------------------',
          margin: [0, 0, 0, 2],
        },

        //-------------------------------body Table---------------------------------------------
        {
          table: {
            headerRows: 1,
            widths: ['57%', '14%', '15%', '14%'],
            body: [

            //TABLE HEADER
            [
              { text: 'Descripción', style: 'tableHeader', alignment: 'left' },
              { text: 'CANT', style: 'tableHeader', alignment: 'center' },
              { text: 'VALOR', style: 'tableHeader', alignment: 'center' },
              { text: 'TOTAL', style: 'tableHeader', alignment: 'center' },
            ],
            [
              { text: '--------------------------------------------------------------', border: [false, false, false, false], colSpan: 4, bold: false,},
            ],
            ...rows,
            
            
          ]
          },

          layout: 'noBorders',
        },
        {
          text: '--------------------------------------------------------------',
          margin: [0, 0, 0, 2],
        },
        // ---------------------------body footer------------------------------------------------
        {
          table: {
            widths: ['37%', '35%', '1%', '27%'],
            body: [
              [{},{ text: 'Sub Total S/', style: 'bodyFooter' },{}, { text: `${Total_Compra.toFixed(2)}`, style: 'bodyFooter', alignment: 'right'}],
              [{},{ text: 'Descuento S/', style: 'bodyFooter' },{}, { text: `${Total_Compra.toFixed(2)}`, style: 'bodyFooter', alignment: 'right' }],
              [{},{ text: 'Impuesto S/', style: 'bodyFooter' },{}, { text: `${Impuesto.toFixed(2)}`, style: 'bodyFooter', alignment: 'right' }],
              [{},{ text: 'Monto Total S/', style: 'bodyFooter' },{}, { text: `${Total_Compra.toFixed(2)}`, style: 'bodyFooter', bold: true, alignment: 'right' }],
              [{},{ text: 'Efectivo S/', style: 'bodyFooter' },{}, { text: `${Total_Efectivo.toFixed(2)}`, style: 'bodyFooter', alignment: 'right' }],
              [{},{ text: 'Credito S/', style: 'bodyFooter' },{}, { text: `${Total_Credito.toFixed(2)}`, style: 'bodyFooter', alignment: 'right' }],
              [{},{ text: 'Tarjeta S/', style: 'bodyFooter' },{}, { text: `${Total_Tarjeta.toFixed(2)}`, style: 'bodyFooter', alignment: 'right' }],
              [{},{ text: 'Pago Con S/', style: 'bodyFooter' },{}, { text: `${Total_Pago_Con.toFixed(2)}`, style: 'bodyFooter', alignment: 'right' }],
              [{},{ text: 'Cambio S/', style: 'bodyFooter' },{}, { text: `${Monto_Cliente.toFixed(2)}`, style: 'bodyFooter', alignment: 'right' }],
            ]
          },
          layout: 'noBorders',
          margin: [0, 0, 0, 15],
        },

        {
          text: montoTotalEnLetras,
          style:'Footer',
          margin: [0, 0, 0, 2],
        },
        {
          text: '--------------------------------------------------------------',
          margin: [0, 0, 0, 2],
        },


        //------------------------------FOOTER--------------------
        {
          table: {
            widths: ['49%', '1%', '1%', '49%'],
            body: [
              [{text: 'Sub Total S/', style: 'Footer'},{},{}, { text: 'Vendedor', style: 'Footer', alignment: 'right'}],
              [{},{},{}, { text: Vendedor, style: 'Footer', alignment: 'right' }],
            ]
          },
          layout: 'noBorders',
        },
        {
          text: '====================================================',
          fontSize: 7,
          bold: true,
          margin: [0, 0, 0, 4],
        },

        {
          text: '** Gracias por su Compra **',
          style: 'Footer_'
        },
        {
          text: 'BENDICIONES',
          style: 'Footer_'
        },

      ],
      
      styles: {
        header: {
          fontSize: 8,
          alignment: 'center',
          margin: [0, 0, 0, 1],
        },
        subheader: {
          fontSize: 8,
          alignment: 'center',
          margin: [0, 0, 0, 1],
        },
        body: {
          fontSize: 8,
          alignment: 'left',
          margin: [10, 0, 10, 1],
        },
        tableHeader: {
          bold: true,
          fontSize: 8,
          color: 'black',
          border: [true, true, true, true],
        },
        tableRow: {
          fontSize: 8,
          color: 'black',
          alignment: 'center',
        },
        bodyFooter: {
          fontSize: 8,
          alignment: 'right',
          margin: [10, 0, 0, 0],
        },
        Footer: {
          fontSize: 8,
          alignment: 'left',
          margin: [10, 0, 0, 0],
        },

        Footer_: {
          fontSize: 8,
          alignment: 'center',
          margin: [0, 0, 0, 1],
        },
      },

    };
    const pdfMakeCreatePdf = pdfMake.createPdf(pdfDefinition);
    pdfMakeCreatePdf.getBase64((data) => {
      printjs({
        printable: data,
        type: 'pdf',
        base64: true,
      });
    });
        

    //const pdf = pdfMake.createPdf(pdfDefinition);
    //pdf.open();
    //pdf.download('Factura_Prueba')

  }
}
