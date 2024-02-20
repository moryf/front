
// jsonTemplates.js

export const ponudaTemplate = {
    id: null,
    naziv: "",
    kupac: {
      id: null,
      imeIPrezime: "",
      adresa: "",
      brojTelefona: "",
      email: ""
    },
    datumOtvaranja: "",
    rokPonude: "",
    status: "",
    opis: "",
    otvorioPonudu:{
      id: null
    }
  };

  export const kupacTemplate = {
    id: null,
    imeIPrezime: "",
    adresa: "",
    brojTelefona: "",
    email: ""
  };

  export const proizvodPonudaTemplate = {
    id: null,
    ponuda :{
      id: null,
      naziv: "",
      kupac: {
        id: null,
        imeIPrezime: "",
        adresa: "",
        brojTelefona: "",
        email: ""
      },
      datumOtvaranja: "",
      rokPonude: "",
      status: "",
      opis: ""
    },
    tipProizvodaPonuda: {
      id: null,
      naziv: ""
    },
    naziv: "",
    ukupnoMetara: 0.0,
    ukupnoKomada: 0.0,
    duzinaPoKomadu: 0.0,
    visinaPoKomadu: 0.0,
    dubinaPoKomadu: 0.0
  };


 export const kalkulacijaTemplate = {
  id: null,
  naziv: "",
  proizvodPonuda: {
    id: null
  },
  datumOtvaranja: null, // Use null or specify a default date if needed
  poslednjiDatumIzmene: null, // Use null or specify a default date if needed
  kreirao: {
    id: null
  }, // Assuming Kreirao is an object of type Korisnik
  
  cinkovanje: false,
  farbanje: false,
  montaza: false,
  izrada: false,
  materijalPoKg: 0.0,
  cinkovanjePoKg: 0.0,
  farbanjePoM2: 0.0,
  montazaPoKg: 0.0,
  izradaPoKg: 0.0,
  rezijskiTroskoviStepen: 0.0,
  stepenSigurnosti: 0.0,
  koriscenjeCene: "VELEPRODAJNA_CENA"
};

  
  