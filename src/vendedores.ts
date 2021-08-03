import { any, sum } from "ramda";

// Clase Vendedor
abstract class Vendedor {
	abstract puedeTrabajarEn(ciudad: Ciudad): boolean;
	abstract vendedorInfuyente(): boolean; // jm
}

// Clase VendedorFijo: se sabe en qué ciudad vive. 
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
}

// Clase Viajante: cada viajante está habilitado para trabajar en algunas provincias, se sabe cuáles son.
export class Viajante extends Vendedor {
	constructor(public provinciasDondeTrabaja: Provincia[]) {
		super();
	}
// any es una funcion de ramda
	puedeTrabajarEn(ciudad: Ciudad): boolean {
		return any((p) => p == ciudad.provincia, this.provinciasDondeTrabaja);  
	}

	// true si la población sumanda de las provincias donde está habilitado >= 10 millones.
	vendedorInfuyente(): boolean {
		let poblacionSumada = 0;
		this.provinciasDondeTrabaja.forEach(provincia => poblacionSumada += provincia.poblacion);
		
		return poblacionSumada >= 10 ? true : false;
	}
}

// Clase ComercioCorresponsal: 
export class ComercioCorresponsal extends Vendedor {
	constructor(public tieneSucursalEn: Ciudad[]) {
		super();
	}

	puedeTrabajarEn(ciudad: Ciudad): boolean {
		return any((p) => p == ciudad, this.tieneSucursalEn);
	}

	vendedorInfuyente(): boolean {
		return false;
	}
}

export class Provincia {
	constructor(public poblacion: number) {}
}

export class Ciudad {
	constructor(public provincia: Provincia) {}
}
