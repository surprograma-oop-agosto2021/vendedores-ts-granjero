import { any } from "ramda";

abstract class Vendedor {
  abstract puedeTrabajarEn(ciudad: Ciudad): boolean;
  abstract esInfuyente(): boolean;
}

export class VendedorFijo extends Vendedor {
  constructor(public ciudadOrigen: Ciudad) {
    super();
  }

  puedeTrabajarEn(ciudad: Ciudad): boolean {
    return ciudad == this.ciudadOrigen;
  }

  esInfuyente(): boolean {
    return false;
  }
}

export class Viajante extends Vendedor {
  constructor(public provinciasDondeTrabaja: Provincia[]) {
    super();
  }

  puedeTrabajarEn(ciudad: Ciudad): boolean {
    return any((p) => p == ciudad.provincia, this.provinciasDondeTrabaja);
  }

  esInfuyente(): boolean {
    return false;
  }
}

export class ComercioCorresponsal extends Vendedor {
  constructor(public provinciasDondeTrabaja: Provincia[]) {
    super();
  }

  puedeTrabajarEn(ciudad: Ciudad): boolean {
    return any((p) => p == ciudad.provincia, this.provinciasDondeTrabaja);
  }

  esInfuyente(): boolean {
    return false;
  }
}

export class Provincia {}

export class Ciudad {
  constructor(public provincia: Provincia) {}
}
