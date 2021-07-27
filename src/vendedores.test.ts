import { Ciudad, Provincia, VendedorFijo, Viajante } from "./vendedores";

describe("Vendedores", () => {
  const buenosAires = new Provincia();
  const tucuman = new Provincia();
  const sierra = new Ciudad(buenosAires);
  const tafiDelValle = new Ciudad(tucuman);

  describe("1 - puede trabajar", () => {
    describe("vendedor fijo", () => {
      const vendedorFijo = new VendedorFijo(sierra);

      it("en la ciudad donde vive", () => {
        expect(vendedorFijo.puedeTrabajarEn(sierra)).toBeTruthy();
      });

      it("en otra ciudad", () => {
        expect(vendedorFijo.puedeTrabajarEn(tafiDelValle)).toBeFalsy();
      });
    });

    describe("viajante", () => {
      const viajante = new Viajante([tucuman]);

      it("una ciudad que queda en una provincia donde trabaja", () => {
        expect(viajante.puedeTrabajarEn(tafiDelValle)).toBeTruthy();
      });

      it("una ciudad que queda en una provincia donde no trabaja", () => {
        expect(viajante.puedeTrabajarEn(sierra)).toBeFalsy();
      });
    });
  });
});
