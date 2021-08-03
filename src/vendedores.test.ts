import { Ciudad, Provincia, VendedorFijo, Viajante } from "./vendedores";

describe("Vendedores", () => {
	//Provincias
  const buenosAires = new Provincia(1000);
  const tucuman = new Provincia(3000);
  const salta = new Provincia(5000);
	//Ciudades
  const sierra = new Ciudad(buenosAires);
  const suipacha = new Ciudad(buenosAires);
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
      const viajante = new Viajante([tucuman, salta]);

      it("una ciudad que queda en una provincia donde trabaja", () => {
        expect(viajante.puedeTrabajarEn(tafiDelValle)).toBeTruthy();
      });

      it("una ciudad que queda en una provincia donde no trabaja", () => {
        expect(viajante.puedeTrabajarEn(sierra)).toBeFalsy();
      });
    });
  });
});
