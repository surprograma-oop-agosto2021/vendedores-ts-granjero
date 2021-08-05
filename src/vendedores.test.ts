import {
  Ciudad,
  Provincia,
  VendedorFijo,
  Viajante,
  ComercioCorresponsal,
} from "./vendedores";

describe("Vendedores", () => {
  //Provincias
  const buenosAires = new Provincia(8, "Buenos Aires");
  const tucuman = new Provincia(2, "Tucuman");
  const salta = new Provincia(3, "Salta");
  const cordoba = new Provincia(5, "Cordoba");
  //Ciudades
  const sierra = new Ciudad(buenosAires, "Sierra");
  const suipacha = new Ciudad(buenosAires, "Suipacha");
  const laPlata = new Ciudad(buenosAires, "La Ptata");
  const tafiDelValle = new Ciudad(tucuman, "Tafi del Valle");
  const concepcion = new Ciudad(tucuman, "Concepcion");
  const yerbaBuena = new Ciudad(tucuman, "Yerba Buena");
  const cafayate = new Ciudad(salta, "Cafayate");
  const laMerced = new Ciudad(salta, "La Merced");
  const tartagal = new Ciudad(salta, "Tartagal");

  describe("1 - puede trabajar", () => {
    describe("vendedor fijo", () => {
      const vendedorFijo = new VendedorFijo(sierra);

      it("en la ciudad donde vive", () => {
        expect(vendedorFijo.puedeTrabajarEn(sierra)).toBeTruthy();
      });

      it("en otra ciudad", () => {
        expect(vendedorFijo.puedeTrabajarEn(tafiDelValle)).toBeFalsy();
      });

      it("No es influyente porque no puede serlo por definición", () => {
        expect(vendedorFijo.vendedorInfuyente()).toBeFalsy();
      });
    });

    describe("viajante", () => {
      const viajante = new Viajante([tucuman, salta, cordoba]);

      it("una ciudad que queda en una provincia donde trabaja", () => {
        expect(viajante.puedeTrabajarEn(tafiDelValle)).toBeTruthy();
      });

      it("una ciudad que queda en una provincia donde no trabaja", () => {
        expect(viajante.puedeTrabajarEn(sierra)).toBeFalsy();
      });

      it("es influyente", () => {
        expect(viajante.vendedorInfuyente()).toBeTruthy();
      });
    });

    describe("comercio corresponsal", () => {
      const corresponsal = new ComercioCorresponsal([
        suipacha,
        cafayate,
        laPlata,
      ]);

      it("una ciudad que queda en una provincia donde trabaja", () => {
        expect(corresponsal.puedeTrabajarEn(suipacha)).toBeTruthy();
      });

      it("una ciudad que queda en una provincia donde no trabaja", () => {
        expect(corresponsal.puedeTrabajarEn(sierra)).toBeFalsy();
      });

      it("es influyente", () => {
        expect(corresponsal.vendedorInfuyente()).toBeFalsy();
      });
    });

    describe("comercio corresponsal INFLUYENTE", () => {
      const corresponsal = new ComercioCorresponsal([
        concepcion,
        suipacha,
        cafayate,
        laPlata,
      ]);

      it("una ciudad que queda en una provincia donde trabaja", () => {
        expect(corresponsal.puedeTrabajarEn(suipacha)).toBeTruthy();
      });

      it("una ciudad que queda en una provincia donde no trabaja", () => {
        expect(corresponsal.puedeTrabajarEn(sierra)).toBeFalsy();
      });

      it("es influyente", () => {
        expect(corresponsal.vendedorInfuyente()).toBeTruthy();
      });
    });
  });
});
