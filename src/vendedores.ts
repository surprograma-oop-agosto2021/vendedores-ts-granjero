import { find, any, sum, props } from "ramda";

// ⚡️⚡️Clase Vendedor
abstract class Vendedor {
  abstract puedeTrabajarEn(ciudad: Ciudad): boolean;
  abstract vendedorInfuyente(): boolean; // jm

  vendedorVersatil(): boolean {
    return (
      sum(Object.values(this.certificaciones)) >= 3 && // suma de la cantidad de certificaciones
      this.certificaciones.certProducto >= 1 && // si hay al menos una certificacion de producto
      sum(Object.values(this.certificaciones).slice(1)) >= 1 // si hay al menos otra certificacion
    );
  }

  vendedorFirme(): boolean {
    // Cada certificacion otorga 5 puntos.
    // las certificaciones sumadas multiplicadas por 5 deben llegar a 30
    return sum(Object.values(this.certificaciones)) * 5 >= 30;
  }

  abstract nombre: string;
  abstract certificaciones: CertificacionesVendedor;
}

// ⚡️Clase VendedorFijo: se sabe en qué ciudad vive.
// No puede ser VendedorInfluyente
export class VendedorFijo extends Vendedor {
  constructor(
    public nombre: string,
    public ciudadOrigen: Ciudad,
    public certificaciones: CertificacionesVendedor
  ) {
    super();
  }

  //Metodo puedeTrabajarEn: devuelve V o F
  puedeTrabajarEn(ciudad: Ciudad): boolean {
    return ciudad == this.ciudadOrigen; // this.ciudadOrigen viene del constructor
  }

  vendedorInfuyente(): boolean {
    return false;
  }
}

// ⚡️Clase Viajante: cada viajante está habilitado para trabajar en algunas provincias, se sabe cuáles son.
export class Viajante extends Vendedor {
  constructor(
    public nombre: string,
    public provinciasDondeTrabaja: Provincia[],
    public certificaciones: CertificacionesVendedor
  ) {
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
}

// ⚡️Clase ComercioCorresponsal:
export class ComercioCorresponsal extends Vendedor {
  constructor(
    public nombre: string,
    public tieneSucursalEn: Ciudad[],
    public certificaciones: CertificacionesVendedor
  ) {
    super();
  }

  puedeTrabajarEn(ciudad: Ciudad): boolean {
    return any((p) => p == ciudad, this.tieneSucursalEn);
  }

  vendedorInfuyente(): boolean {
    // acá tambien tiene que haber una forma más elegante de hacer esto.
    const listaPcias: string[] = [];
    for (const sucursal of this.tieneSucursalEn) {
      if (!any((p) => p == sucursal.provincia.nombre, listaPcias)) {
        listaPcias.push(sucursal.provincia.nombre);
      }
    }
    return this.tieneSucursalEn.length >= 5 || listaPcias.length >= 3;
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
  constructor(
    public certProducto: number,
    public certVentas: number,
    public certDescuentos: number
  ) {}
}

// ⚡️⚡️
export class CentroDeDistribucion {
  constructor(public ciudad: Ciudad, public vendedores: Vendedor[]) {}

  agregarVendedor(vendedor: Vendedor): boolean {
    const listaNombres: string[] = [];
    for (const vendedor of this.vendedores) {
      listaNombres.push(vendedor.nombre);
    }
    if (!any((p) => p == vendedor.nombre, listaNombres)) {
      this.vendedores.push(vendedor);
      return true;
    } else {
      // COMO SE RETORNA UN ERROR???
      return false;
    }
  }

  vendedorEstrella(): string {
    // Que pasa si dos vendedores tienen los mismos puntajes???
    // Debería devolver una lista?
    let vendedorEstelar = "";
    let puntajeMax = 0;
    for (const vendedor of this.vendedores) {
      if (sum(Object.values(vendedor.certificaciones)) > puntajeMax) {
        puntajeMax = sum(Object.values(vendedor.certificaciones));
        vendedorEstelar = vendedor.nombre;
      }
    }
    return vendedorEstelar;
  }

  coberturaEnCiudad(): boolean {
    //console.log(this.vendedores.ciudadOrigen));
    return false;
  }

  vendedoresGenéricos(): string[] {
    return ["vendedor1"];
  }
}

// ⚡️⚡️
export class Provincia {
  constructor(public poblacion: number, public nombre: string) {}
}

// ⚡️⚡️
export class Ciudad {
  constructor(public provincia: Provincia, public nombre: string) {}
}
