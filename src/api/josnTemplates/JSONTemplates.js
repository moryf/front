
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
    opis: ""
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
  