import AxiosConfig from "../axios/AxiosConfig";

export async function postPonuda(ponuda) {
  AxiosConfig.post("/api/ponuda/dodaj", ponuda)
  .then(response =>{
    confirm("Uspesno uneta ponuda")
    console.log(response)
    return response.data;
  })
    .catch(error => {
        alert(error.response.data)
        console.log(error);
        
        return
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
    confirm("Uspesno unet proizvod")
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