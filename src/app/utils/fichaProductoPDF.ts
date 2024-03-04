import pdfMake from 'pdfMake/build/pdfmake';
import pdfFonts from 'pdfMake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

import * as printjs from 'print-js';
import { Producto } from '../models/interfaces/producto.interface';
import { API_URL } from '../ServicioApi/apiConfig';



async function urlImagenAbase64(urlImagen: string): Promise<string> {
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
      throw new Error('Error al obtener la imagen: ');
    }
}


export async function pdfcreate(data: Producto){
    const rutaImagenLogo = '../assets/img/FOOTLOOSELOGOSIDEBAR.png';
    const rutaImageProduct = API_URL+'images/'+data.imagen;

    const imageLogo = await urlImagenAbase64(rutaImagenLogo);
    const imageProduct = await urlImagenAbase64(rutaImageProduct)

    const NombreProducto = data.NombreProducto
    const CodigoProducto = "Codigo: " +data.idProducto
    const NombreMarca = "Marca: " + data.NombreMarca
    const NombreModelo = "Modelo: " + data.NombreModelo
    const NombreColor = "Color: " + data.NombreColor
    const NombreTalla = "Talla: " + data.NombreTalla
    const PrecioVenta = "Precio: S/ " + data.PrecioVenta

    const colorRojo = '#ff4949';
    const tittleColor = '#535353';
    const colorNegro = '#000000';
    const colorMorado = '#470952';
    

    let pdfHeader = [
        {
            image:imageLogo,
            fit: [300, 200],
            margin: [20, -30, 0, 0],
        },

        {
            table: {
              widths: [220], // Ajusta el ancho de la celda según tus necesidades
              body: [
                [{
                  image: imageProduct,
                  fit: [220, 220],
                  margin: [0, -0, 0, 0],
                  alignment: 'center', // Ajusta la alineación de la imagen en la celda
                }]
              ]
            },
            margin: [40, -30, 0, 0], // Ajusta los márgenes según tus necesidades
        },

        {
            text: NombreProducto,
            style: 'tittle',
            margin: [315, -220, 40, 0],
        },

        {
            text: 'Informacion de Producto: ',
            style: 'info',
            color: colorNegro,
            bold: true,
            fontSize: 16,
            margin: [315, 10, 40, 0],
        },

        {
            text: CodigoProducto,
            style: 'info',
            margin: [315, 20, 40, 0],
        },

        {
            text: NombreMarca,
            style: 'info',
            margin: [315, 10, 40, 0],
        },

        {
            text: NombreModelo,
            style: 'info',
            margin: [315, 10, 40, 0],
        },

        {
            text: NombreColor,
            style: 'info',
            margin: [315, 10, 40, 0],
        },

        {
            text: NombreTalla,
            style: 'info',
            margin: [315, 10, 40, 0],
        },

        {
            text: PrecioVenta,
            style: 'tittle',
            fontSize: 16,
            margin: [315, 10, 40, 0],
        },

    ]

    let pdfFotter = [
        {
            absolutePosition: { x: 0, y: 180},
            canvas: [
                {
                    type: 'rect',
                    x: 0,
                    y: 332,
                    w: 595.276,
                    h: 50,
                    color: colorMorado,
                },
            ],
        },
    ]


    let pdfStyle = 
    {
        tittle: {
            fontSize: 20,
            bold: true,
            color: colorRojo,
        },
        info: {
            fontSize: 14,
            bold: false,
            color: tittleColor,
        },
    }

    const pdfContentCreate = [
        pdfHeader,
        pdfFotter
      ]
    

    const pdfDefinition = {
        pageSize: {
            width: 595,  // Ancho A4 estándar en puntos
            height: 550, // Altura personalizada en puntos (ajusta según tus necesidades)
        },
      pageMargins: [0, 0, 0, 0],
      info: {
        title: 'F001-000001',
        author: 'maclode',
        subject: 'ticket',
        keywords: 'tck, sale',
      },

      content: pdfContentCreate,

      styles: pdfStyle,

    }

    

    

    const pdfMakeCreatePdf = pdfMake.createPdf(pdfDefinition);
    pdfMakeCreatePdf.getBase64((data) => {
        printjs({
        printable: data,
        type: 'pdf',
        base64: true,
      });
    });
  }