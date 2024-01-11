export function formatearFecha(fecha: string, isTime: Boolean): string {
    const fechaObj = new Date(fecha);

    const año = fechaObj.getFullYear();
    const mes = (fechaObj.getMonth() + 1).toString().padStart(2, '0');
    const dia = fechaObj.getDate().toString().padStart(2, '0');
    

    let fechaFormateada = "";

    if(isTime){
        const horas = fechaObj.getHours().toString().padStart(2, '0');
        const minutos = fechaObj.getMinutes().toString().padStart(2, '0');
        const segundos = fechaObj.getSeconds().toString().padStart(2, '0');
        
        fechaFormateada = `${año}-${mes}-${dia} ${horas}:${minutos}:${segundos}`;
        return fechaFormateada

    } else {
        fechaFormateada = `${año}-${mes}-${dia}`;
        return fechaFormateada
    }
}


export function convertirMontoALetras(monto: number): string {
    const unidades = ['', 'UN ', 'DOS ', 'TRES ', 'CUATRO ', 'CINCO ', 'SEIS ', 'SIETE ', 'OCHO ', 'NUEVE '];
    const especiales = ['', 'ONCE ', 'DOCE ', 'TRECE ', 'CATORCE ', 'QUINCE ', 'DIECISEIS ', 'DIECISIETE ', 'DIECIOCHO ', 'DIECINUEVE '];
    const decenas = ['', 'DIEZ ', 'VEINTE ', 'TREINTA ', 'CUARENTA ', 'CINCUENTA ', 'SESENTA ', 'SETENTA ', 'OCHENTA ', 'NOVENTA '];
    const centenas = ['', 'CIENTO ', 'DOSCIENTOS ', 'TRESCIENTOS ', 'CUATROCIENTOS ', 'QUINIENTOS ', 'SEISCIENTOS ', 'SETECIENTOS ', 'OCHOCIENTOS ', 'NOVECIENTOS '];
  
    const convertirUnidades = (numero: number) => {
      return unidades[numero];
    };
  
    const convertirDecenas = (numero: number) => {
      if (numero < 10) {
        return convertirUnidades(numero);
      } else if (numero >= 11 && numero <= 19) {
        return especiales[numero - 10];
      } else {
        const unidad = numero % 10;
        const decena = Math.floor(numero / 10);
        return decenas[decena] + convertirUnidades(unidad);
      }
    };
  
    const convertirCentenas = (numero: number) => {
      if (numero === 100) {
        return 'CIEN ';
      } else {
        const decena = numero % 100;
        const centena = Math.floor(numero / 100);
        return centenas[centena] + convertirDecenas(decena);
      }
    };
  
    const convertirMiles = (numero: number) => {
      if (numero === 1000) {
        return 'MIL ';
      } else if (numero > 1000) {
        const miles = Math.floor(numero / 1000);
        const resto = numero % 1000;
        return convertirCentenas(miles) + 'MIL ' + convertirCentenas(resto);
      } else {
        return convertirCentenas(numero);
      }
    };
  
    const convertirMillones = (numero: number) => {
      if (numero >= 1000000) {
        const millones = Math.floor(numero / 1000000);
        const resto = numero % 1000000;
        return convertirCentenas(millones) + 'MILLON ' + convertirMiles(resto);
      } else {
        return convertirMiles(numero);
      }
    };
  
    if (monto === 0) {
      return 'CERO SOLES';
    } else {
      const parteEntera = Math.floor(monto);
      const parteDecimal = Math.round((monto - parteEntera) * 100);
  
      return convertirMillones(parteEntera) + 'CON ' + (parteDecimal === 0 ? '00' : parteDecimal.toString()) + '/100 SOLES';
    }
  }
