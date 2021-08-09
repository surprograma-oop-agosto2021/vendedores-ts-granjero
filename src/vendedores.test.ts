import {
  Ciudad,
  Provincia,
  VendedorFijo,
  Viajante,
  ComercioCorresponsal,
  CertificacionesVendedor,
  CentroDeDistribucion,
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
  const caba = new Ciudad(buenosAires, "CABA");
  const tafiDelValle = new Ciudad(tucuman, "Tafi del Valle");
  const concepcion = new Ciudad(tucuman, "Concepcion");
  const yerbaBuena = new Ciudad(tucuman, "Yerba Buena");
  const cafayate = new Ciudad(salta, "Cafayate");
  const laMerced = new Ciudad(salta, "La Merced");
  const tartagal = new Ciudad(salta, "Tartagal");
  //Certificaciones
  const certificacionesViajante = new CertificacionesVendedor(3, 9, 1);
  const certificacionesFijo = new CertificacionesVendedor(0, 2, 1);
  const certificacionesPepe = new CertificacionesVendedor(15, 2, 1);

  const certificacionesCorresponsal = new CertificacionesVendedor(0, 0, 0);

  describe("1 - puede trabajar", () => {
    describe("vendedor fijo", () => {
      const vendedorFijo = new VendedorFijo('', sierra, certificacionesFijo);

      it("en la ciudad donde vive", () => {
        expect(vendedorFijo.puedeTrabajarEn(sierra)).toBeTruthy();
      });

      it("en otra ciudad", () => {
        expect(vendedorFijo.puedeTrabajarEn(tafiDelValle)).toBeFalsy();
      });

      it("No es influyente porque no puede serlo por definición", () => {
        expect(vendedorFijo.vendedorInfuyente()).toBeFalsy();
      });

      it("No esVersatil", () => {
        expect(vendedorFijo.vendedorInfuyente()).toBeFalsy();
      });

      it(" NO es Firme", () => {
        expect(vendedorFijo.vendedorVersatil()).toBeFalsy();
      });
    });

    describe("viajante", () => {
      const viajante = new Viajante(
				'Viajante',
        [tucuman, salta, cordoba],
        certificacionesViajante
      );

      it("una ciudad que queda en una provincia donde trabaja", () => {
        expect(viajante.puedeTrabajarEn(tafiDelValle)).toBeTruthy();
      });

      it("una ciudad que queda en una provincia donde no trabaja", () => {
        expect(viajante.puedeTrabajarEn(sierra)).toBeFalsy();
      });

      it("es influyente", () => {
        expect(viajante.vendedorInfuyente()).toBeTruthy();
      });

      it("es versatil", () => {
        expect(viajante.vendedorVersatil()).toBeTruthy();
      });
    });

    describe("comercio corresponsal", () => {
      const corresponsal = new ComercioCorresponsal('',[
        suipacha,
        cafayate,
        laPlata,
      ], certificacionesCorresponsal);

      it("una ciudad que queda en una provincia donde trabaja", () => {
        expect(corresponsal.puedeTrabajarEn(suipacha)).toBeTruthy();
      });

      it("una ciudad que queda en una provincia donde no trabaja", () => {
        expect(corresponsal.puedeTrabajarEn(sierra)).toBeFalsy();
      });

      it("no influyente", () => {
        expect(corresponsal.vendedorInfuyente()).toBeFalsy();
      });
    });

    describe("comercio corresponsal INFLUYENTE", () => {
      const corresponsal = new ComercioCorresponsal('',[
        concepcion,
        suipacha,
        cafayate,
        laPlata,
      ], certificacionesCorresponsal);

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

  describe("Centros de distribucion", () => {
    // Centros de distribucion
    const vendedorPepe = new VendedorFijo('Pepe', caba, certificacionesPepe);
    const vendedorJose = new VendedorFijo('Jose', caba, certificacionesFijo);
    const centroDistribucionBalvanera = new CentroDeDistribucion(
      caba,
      [vendedorPepe]
    );

    it("agrego un vendedor posta", () => {
      expect(centroDistribucionBalvanera.agregarVendedor(vendedorJose)).toBeTruthy();
    });

    it("agrego el mismo vendedor y falla", () => {
      expect(centroDistribucionBalvanera.agregarVendedor(vendedorJose)).toBeFalsy();
    });

    it("Vendedor Estrella", () => {
      expect(centroDistribucionBalvanera.vendedorEstrella()).toBe('Pepe');
    });

    it("Cobertura en ciudad", () => {
      expect(centroDistribucionBalvanera.coberturaEnCiudad()).toBeFalsy();
    });

  });
});
