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
    return response.data;
  } catch (error) {
    alert(error.response.data);
    console.error(error);
    // Rethrow the error if you want the calling code to handle it
    throw error;
    // Or return a default value or handle the error in some other way
  }
}