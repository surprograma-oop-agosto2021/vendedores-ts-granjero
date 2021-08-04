import {
  Ciudad,
  Provincia,
  VendedorFijo,
  Viajante,
  ComercioCorresponsal,
} from "./vendedores";

describe("Vendedores", () => {
  //Provincias
  const buenosAires = new Provincia(8);
  const tucuman = new Provincia(2);
  const salta = new Provincia(3);
  const cordoba = new Provincia(5);
  //Ciudades
  const sierra = new Ciudad(buenosAires);
  const suipacha = new Ciudad(buenosAires);
  const laPlata = new Ciudad(buenosAires);
  const tafiDelValle = new Ciudad(tucuman);
  const concepcion = new Ciudad(tucuman);
  const yerbaBuena = new Ciudad(tucuman);
  const cafayate = new Ciudad(salta);
  const laMerced = new Ciudad(salta);
  const tartagal = new Ciudad(salta);

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
      const corresponsal = new ComercioCorresponsal([suipacha, cafayate]);

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
  });
});
