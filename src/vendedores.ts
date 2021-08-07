import { find, any, sum, props } from "ramda";

// ⚡️⚡️Clase Vendedor
abstract class Vendedor {
  abstract puedeTrabajarEn(ciudad: Ciudad): boolean;
  abstract vendedorInfuyente(): boolean; // jm
  abstract vendedorVersatil(): boolean; // jm
  abstract vendedorFirme(): boolean; // jm
}

// ⚡️Clase VendedorFijo: se sabe en qué ciudad vive.
// No puede ser VendedorInfluyente
export class VendedorFijo extends Vendedor {
  constructor(public ciudadOrigen: Ciudad) {
    super();
  }

  //Metodo puedeTrabajarEn: devuelve V o F
  puedeTrabajarEn(ciudad: Ciudad): boolean {
    return ciudad == this.ciudadOrigen; // this.ciudadOrigen viene del constructor
  }

  vendedorInfuyente(): boolean {
    return false;
  }
	
  vendedorVersatil(): boolean {
    return false;
  }
	
  vendedorFirme(): boolean {
    return false;
  }
}

// ⚡️Clase Viajante: cada viajante está habilitado para trabajar en algunas provincias, se sabe cuáles son.
export class Viajante extends Vendedor {
  constructor(public provinciasDondeTrabaja: Provincia[], public certificaciones: CertificacionesVendedor) {
    super();
  }

  // any es una funcion de ramda
  puedeTrabajarEn(ciudad: Ciudad): boolean {
    return any((p) => p == ciudad.provincia, this.provinciasDondeTrabaja);
  }

  // true si la población sumanda de las provincias donde está habilitado >= 10 millones.
  vendedorInfuyente(): boolean {
    let poblacionSumada = 0;
    // 🦆?
    this.provinciasDondeTrabaja.forEach(
      (provincia) => (poblacionSumada += provincia.poblacion)
    );
    return poblacionSumada >= 10;
  }
	
  vendedorVersatil(): boolean {
		// me encantaria hacer algo así como:
		// let totalCertificaciones = sum(this.certificaciones)
		// pero no termino de entender como.
		console.log(this.certificaciones);
		const totalCertificaciones = this.certificaciones.certProducto + this.certificaciones.certVentas;


		if (this.certificaciones.certProducto)
			{
				return true;
			}
    return true;
  }
	
	
  vendedorFirme(): boolean {
    return false;
  }
}

// ⚡️Clase ComercioCorresponsal:
export class ComercioCorresponsal extends Vendedor {
  constructor(public tieneSucursalEn: Ciudad[]) {
    super();
  }

  puedeTrabajarEn(ciudad: Ciudad): boolean {
    return any((p) => p == ciudad, this.tieneSucursalEn);
  }

  vendedorInfuyente(): boolean {
    const listaPcias: string[] = [];
    for (const sucursal of this.tieneSucursalEn) {
      if (!any((p) => p == sucursal.provincia.nombre, listaPcias)) {
        listaPcias.push(sucursal.provincia.nombre);
      }
    }
		return (this.tieneSucursalEn.length >= 5 || listaPcias.length >= 3);
  }
	
  vendedorVersatil(): boolean {
    return false;
  }
	

  vendedorFirme(): boolean {
    return false;
  }
}


// ⚡️⚡️
export class CertificacionesVendedor {
	constructor (public certProducto: number, public certVentas: number){}
}

// ⚡️⚡️
export class CentroDeDistribucion {
	constructor (public ciudad: Ciudad, public vendedores: Vendedor[]){}
}

// ⚡️⚡️
export class Provincia {
  constructor(public poblacion: number, public nombre: string) {}
}

// ⚡️⚡️
export class Ciudad {
  constructor(public provincia: Provincia, public nombre: string) {}
}
