import { any } from "ramda";

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
// ??? Qué hace any() ???
	puedeTrabajarEn(ciudad: Ciudad): boolean {
		return any((p) => p == ciudad.provincia, this.provinciasDondeTrabaja);  
	}

	vendedorInfuyente(): boolean {
		return  false;
	}
}

// Clase ComercioCorresponsal: 
export class ComercioCorresponsal extends Vendedor {
	constructor(public provinciasDondeTrabaja: Provincia[]) {
		super();
	}

	puedeTrabajarEn(ciudad: Ciudad): boolean {
		return any((p) => p == ciudad.provincia, this.provinciasDondeTrabaja);
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
