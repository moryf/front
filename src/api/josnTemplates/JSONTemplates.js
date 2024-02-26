
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

export const dashboardTemplate = {
  nove: "",
  obradjene: "",
  ponudeSaRokomOveNedelje: "",
  ponudaSaIsteklimRokom: "",
  novihPonudaOveNedelje: ""
};

export const proizvodTemplate = {
  sifra: "",
  naziv: "",
  opis: "",
  jedinicaMere: "",
  masa: 0.0,
  specificnaPovrsina: 0.0,
  cenaA: 0.0,
  veleprodajnaCena: 0.0
};


export const stavkaKalkulacijeTemplate = {
  id: null,
  kalkulacija: {
    id: null
  },
  proizvod: {
    sifra: "",
    naziv: "",
    opis: "",
    jedinicaMere: "",
    masa: 0.0,
    specificnaPovrsina: 0.0,
    cenaA: 0.0,
    veleprodajnaCena: 0.0
  },
  nacinRacunanjaKomada: "KOMAD", // Replace null with the actual value
  razmak: 0.0,
  multiplikator: 1.0,
  rucniDodatak: 0,
  kolicinaKomada: 0,
  nacinRacunanjaDuzineKomada: null, // Replace null with the actual value
  duzina: 0.0,
  razlikaDuzine: 0.0,
  duzinaKomada: 0.0,
  kolicina: 0.0,
  cinkovanje: false,
  farbanje: false,
  montaza: true,
  izrada: false,
  cena: 0.0
};




  
  