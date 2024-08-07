import AxiosConfig from "../axios/AxiosConfig";

export async function postPonuda(ponuda) {
  await AxiosConfig.post("/api/ponuda/dodaj", ponuda)
  .then(response =>{
    confirm("Uspesno uneta ponuda")
    console.log(response)
    return response.data;
  })
    .catch(error => {
        alert(error.response.data)
        console.log(error);
        
        return;
    });
}

export async function findKupacByImeAndBrojTelefona(imeIPrezime, brojTelefona) {
  try {
    const response = await AxiosConfig.get(`/api/kupac/pretrazi/imeIPrezime=${imeIPrezime}&brojTelefona=${brojTelefona}`);
    return response.data;
  } catch (error) {
    alert(error.response.data);
    console.error(error);
    // Rethrow the error if you want the calling code to handle it
    throw error;
    // Or return a default value or handle the error in some other way
  }
}

export async function getAllKupci() {
  try {
    const response = await AxiosConfig.get('/api/kupac/svi');
    return response.data;
  } catch (error) {
    alert(error.response.data);
    console.error(error);
    throw error;
  }
}

export async function getKupacById(id){
  try{
    const response = await AxiosConfig.get('/api/kupac/'+id)
    return response.data;
  }
  catch(error){
    alert(error.response.data)
    console.error(error)
    throw error;
  }
}


export async function getAllPonude(){
  try{
    const response = await AxiosConfig.get('/api/ponuda/sve');
    console.log(response)
    return response.data;
  } catch (error) {
    alert(error.response.data);
    console.error(error);
    // Rethrow the error if you want the calling code to handle it
    throw error;
    // Or return a default value or handle the error in some other way
  }
}

export async function getPonuda(id) {
  try {
    const response = await AxiosConfig.get(`/api/ponuda/${id}`);
    return response.data;
  } catch (error) {
    alert(error.response.data);
    console.error(error);
    // Rethrow the error if you want the calling code to handle it
    throw error;
    // Or return a default value or handle the error in some other way
  }
}

export async function getPonudeByKupac(id){
  try {
    const response = await AxiosConfig.get('/api/ponuda/kupac/'+id)
    console.log(response)
    return response.data;
    
  } catch (error) {
    alert(error.response.data)
    console.error(error)
    throw error
  }
}

export async function getAllProizvodiPonudeForPonuda(id) {
  try {
    const response = await AxiosConfig.get(`/api/proizvod-ponuda/ponuda/${id}`);
    return response.data;
  } catch (error) {
    alert(error.response.data);
    console.error(error);
    // Rethrow the error if you want the calling code to handle it
    throw error;
    // Or return a default value or handle the error in some other way
  }
}

export async function getAllTipoviProizvodaPonude() {
  try {
    const response = await AxiosConfig.get('/api/tip-proizvoda-ponuda/svi');
    return response.data;
  } catch (error) {
    alert(error.response.data);
    console.error(error);
    // Rethrow the error if you want the calling code to handle it
    throw error;
    // Or return a default value or handle the error in some other way
  }
}

export async function postProizvodPonuda(proizvodPonuda, ponudaId) {
  try{
    const response = await AxiosConfig.post(`/api/proizvod-ponuda/ponuda/${ponudaId}/dodaj`, proizvodPonuda);
    console.log(response)
    return response.data;
  }
  catch(error){
    alert(error.response.data);
    console.error(error);
    // Rethrow the error if you want the calling code to handle it
    throw error;
    // Or return a default value or handle the error in some other way
  }
}

export async function findProizvodPonudaById(id) {
  try {
    const response = await AxiosConfig.get(`/api/proizvod-ponuda/${id}`);
    return response.data;
  } catch (error) {
    alert(error.response.data);
    console.error(error);
    // Rethrow the error if you want the calling code to handle it
    throw error;
    // Or return a default value or handle the error in some other way
  }
}


export async function prihvatiPonudu(id) {
  try {
    const response = await AxiosConfig.put(`/api/ponuda/prihvati/${id}`);
    return response.data;
  } catch (error) {
    alert(error.response.data);
    console.error(error);
    // Rethrow the error if you want the calling code to handle it
    throw error;
    // Or return a default value or handle the error in some other way
  }
}

export async function odbijPonudu(id) {
  try {
    console.log(id)
    const response = await AxiosConfig.put(`/api/ponuda/odbij/${id}`);
    return response.data;
  } catch (error) {
    alert(error.response.data);
    console.error(error);
    // Rethrow the error if you want the calling code to handle it
    throw error;
    // Or return a default value or handle the error in some other way
  }
}

export async function nezavrsenePonude() {
  try {
    const response = await AxiosConfig.get('/api/ponuda/nezavrsene');
    return response.data;
  } catch (error) {
    alert(error.response.data);
    console.error(error);
    // Rethrow the error if you want the calling code to handle it
    throw error;
    // Or return a default value or handle the error in some other way
  }
}

export async function prihvacenePonude() {
  try {
    const response = await AxiosConfig.get('/api/ponuda/prihvacene');
    return response.data;
  } catch (error) {
    alert(error.response.data);
    console.error(error);
    // Rethrow the error if you want the calling code to handle it
    throw error;
    // Or return a default value or handle the error in some other way
  }
}

export async function odbijenePonude() {
  try {
    const response = await AxiosConfig.get('/api/ponuda/odbijene');
    return response.data;
  } catch (error) {
    alert(error.response.data);
    console.error(error);
    // Rethrow the error if you want the calling code to handle it
    throw error;
    // Or return a default value or handle the error in some other way
  }
}

export async function getKalkulacijeByProizvodPonudaId(id) {
  try {
    const response = await AxiosConfig.get(`/api/kalkulacija/proizvod-ponuda/${id}`);
    return response.data;
  } catch (error) {
    alert(error.response.data);
    console.error(error);
    throw error;
  }
}

export async function getKalkulacija(id) {
  try {
    const response = await AxiosConfig.get(`/api/kalkulacija/${id}`);
    return response.data;
  } catch (error) {
    alert(error.response.data);
    console.error(error);
    throw error;
  }
}


export async function novaKalkulacija(idProizvodaPonude) {
  try {
    const idKorisnika = JSON.parse(sessionStorage.getItem('korisnik')).id;
    const response = await AxiosConfig.get(`/api/kalkulacija/proizvod-ponuda/${idProizvodaPonude}/korisnik/${idKorisnika}/nova`);
    window.location.href = `/kalkulacija/${response.data.id}`;
    return response.data;
  } catch (error) {
    alert(error.response.data);
    console.error(error);
    throw error;
  }
}


export async function updateKalkulacija(kalkulacija) {
  try {
    const response = await AxiosConfig.put(`/api/kalkulacija`, kalkulacija);
    confirm("Uspesno izmenjena kalkulacija")
    return response.data;
  } catch (error) {
    alert(error.response.data);
    console.error(error);
    throw error;
  }
}

export async function noviSablon(naziv, idKalkulacije){
  try {
    const response = await AxiosConfig.post(`/api/sablon-kalkulacija/sacuvaj/${idKalkulacije}/naziv=${naziv}`);
    confirm("Uspesno sacuvan sablon")
    return response.data;
  } catch (error) {
    alert(error.response.data);
    console.error(error);
    throw error;
  }
}

export async function getAllSabloni(){
  try {
    const response = await AxiosConfig.get('/api/sablon-kalkulacija/svi');
    return response.data;
  } catch (error) {
    alert(error.response.data);
    console.error(error);
    throw error;
  }
}

export async function getSablon(id){
  try {
    const response = await AxiosConfig.get(`/api/sablon-kalkulacija/${id}`);
    return response.data;
  } catch (error) {
    alert(error.response.data);
    console.error(error);
    throw error;
  }
}



export async function findSablonByNaziv(naziv){
  try {
    const response = await AxiosConfig.get(`/api/sablon-kalkulacija/naziv=${naziv}`);
    return response.data;
  } catch (error) {
    alert(error.response.data);
    console.error(error);
    throw error;
  }
}

export async function novaKalkulacijaIzSablona(idSablona, idProizvodaPonude){
  try {
    const response = await AxiosConfig.get(`/api/kalkulacija/sablon/${idSablona}/proizvod-ponuda/${idProizvodaPonude}/nova`);
    window.location.href = `/kalkulacija/${response.data.id}`;
    return response.data;
  } catch (error) {
    alert(error.response.data);
    console.error(error);
    throw error;
  }
}


export async function getAllPodrazumevaneVrednosti(){
  try {
    const response = await AxiosConfig.get('/api/podrazumevane-vrednosti/sve');
    return response.data;
  } catch (error) {
    alert(error.response.data);
    console.error(error);
    throw error;
  }
}


export async function updateKorisnik(ime,prezime,korisnickoIme){
  try {
    const id = JSON.parse(sessionStorage.getItem('korisnik')).id;
    const response = await AxiosConfig.put(`/api/korisnik/izmeni/${id}/ime=${ime}/prezime=${prezime}/korisnickoIme=${korisnickoIme}`);
    confirm("Uspesno izmenjen korisnik")
    return response.data;
  } catch (error) {
    alert(error.response.data);
    console.error(error);
    throw error;
  }
}


export async function updatePodrazumevanaVrednost(oznaka, vrednost){
  try {
    const response = await AxiosConfig.put(`/api/podrazumevane-vrednosti/izmeni/oznaka=${oznaka}/vrednost=${vrednost}`);
    return response.data;
  } catch (error) {
    alert(error.response.data);
    console.error(error);
    throw error;
  }
}

export async function dashboard(){
  try {
    const response = await AxiosConfig.get('/api/ponuda/dashboard');
    console.log(response)
    return response.data;
  } catch (error) {
    alert(error.response.data);
    console.error(error);
    throw error;
  }
}

export async function getStavkeKalkulacijeByKalkulacijaId(id){
  try {
    const response = await AxiosConfig.get(`/api/stavka-kalkulacije/kalkulacija/${id}`);
    console.log(response)
    return response.data;
  } catch (error) {
    alert(error.response.data);
    console.error(error);
    throw error;
  }
}

export async function findProizvodyBySifraAndNaziv(sifra, naziv, opis){
  try {
    const response = await AxiosConfig.get(`/api/proizvod/pretrazi/sifra=${sifra}/naziv=${naziv}/opis=${opis}`);
    return response.data;
  } catch (error) {
    alert(error.response.data);
    console.error(error);
    throw error;
  }
}

export async function addStavkaKalkulacije(stavkaKalkulacije, kalkulacijaId){
  try {
    const response = await AxiosConfig.post(`/api/stavka-kalkulacije/dodaj/kalkulacija/${kalkulacijaId}`, stavkaKalkulacije);
    return response.data;
  } catch (error) {
    alert(error.response.data);
    console.error(error);
    throw error;
  }
}

export async function updateStavkeKalkulacije(stavkeKalkulacije){
  try {
    const response = await AxiosConfig.put(`/api/stavka-kalkulacije/izmeni/lista`, stavkeKalkulacije);
    return response.data;
  } catch (error) {
    alert(error.response.data);
    console.error(error);
    throw error;
  }
}

export async function updateStavkaKalkulacije(stavkaKalkulacije){
  try {
    const response = await AxiosConfig.put(`/api/stavka-kalkulacije/izmeni`, stavkaKalkulacije);
    return response.data;
  } catch (error) {
    alert(error.response.data);
    console.error(error);
    throw error;
  }
}


export async function deleteStavkaKalkulacije(id){
  try {
    const response = await AxiosConfig.delete(`/api/stavka-kalkulacije/obrisi/${id}`);
    return response.data;
  } catch (error) {
    alert(error.response.data);
    console.error(error);
    throw error;
  }
}

export async function saveProizvod(proizvod){
  try {
    const response = await AxiosConfig.post('/api/proizvod/sacuvaj', proizvod);
    return response.data;
  } catch (error) {
    alert(error.response.data);
    console.error(error);
    throw error;
  }
}

export async function kopirajKalkulaciju(kalkulacijaId){
  try {
    const response = await AxiosConfig.get(`/api/kalkulacija/kopiraj/${kalkulacijaId}`);
    window.location.href = `/kalkulacija/${response.data.id}`;
    return response.data;
  } catch (error) {
    alert(error.response.data);
    console.error(error);
    throw error;
  }
}

export async function getKalkulacijaByPonudaId(id){
  try {
    const response = await AxiosConfig.get(`/api/kalkulacija/ponuda/${id}`);
    return response.data;
  } catch (error) {
    alert(error.response.data);
    console.error(error);
    throw error;
  }
}

export async function getDokumentiPonudeLinkoviByPonudaId(id){
  try {
    const response = await AxiosConfig.get(`/api/dokumenti-ponude-linkovi/ponuda/${id}`);
    return response.data;
  } catch (error) {
    alert(error.response.data);
    console.error(error);
    throw error;
  }
}

export async function postDokumentPonudeLinkForPonuda(idPonude, dokument){
  try {
    const response = await AxiosConfig.post(`/api/dokumenti-ponude-linkovi/ponuda/${idPonude}`, dokument);
    return response.data;
  } catch (error) {
    alert(error.response.data);
    console.error(error);
    throw error;
  }
}

export async function getAllProizvodi(){
  try {
    const response = await AxiosConfig.get('/api/proizvod/svi');
    return response.data;
  } catch (error) {
    alert(error.response.data);
    console.error(error);
    throw error;
  }
}

export async function updateProizvod(proizvod){
  try {
    const response = await AxiosConfig.put('/api/proizvod/izmeni', proizvod);
    return response.data;
  } catch (error) {
    alert(error.response.data);
    console.error(error);
    throw error;
  }
}

export async function promeniSifruKorisnika(staraSifra, novaSifra){
  try {
    const id = JSON.parse(sessionStorage.getItem('korisnik')).id;
    const response = await AxiosConfig.put(`/api/korisnik/promeni-sifru/${id}`, {staraSifra, novaSifra});
    confirm("Uspesno promenjena sifra")
    return response.data;
  } catch (error) {
    alert(error.response.data);
    console.error(error);
    throw error;
  }
}

export async function registrujKorisnika(korisnik){
  try {
    const response = await AxiosConfig.post('/api/korisnik/register', korisnik);
    confirm("Uspesno registrovan korisnik")
    return response.data;
  } catch (error) {
    alert(error.response.data);
    console.error(error);
    throw error;
  }
}