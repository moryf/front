import React, { useState, useEffect } from 'react';
import { Container, Paper, Typography, TextField, Button, Switch, FormControlLabel, FormGroup, Select } from '@mui/material';
import { kalkulacijaTemplate } from '../../api/josnTemplates/JSONTemplates';
import { getKalkulacija, updateKalkulacija,getStavkeKalkulacijeByKalkulacijaId, addStavkaKalkulacije } from '../../api/apiFunctions/ApiFunctions';
import NoviSablon from '../../components/noviSablon/NoviSablon';
import { DataGrid } from '@mui/x-data-grid';
import NovaStavkaKalkulacijeDialog from '../../components/novaStavkaKalkulacijeDialog/NovaStavkaKalkulacijeDialog';


export default function Kalkulacija() {

    const id = window.location.pathname.split('/')[2];
    const [kalkulacija, setKalkulacija] = useState(kalkulacijaTemplate);
    const [stavkeKalkulacije, setStavkeKalkulacije] = useState([]);
    const[flatennedStavkeKalkulacije, setFlatennedStavkeKalkulacije] = useState([]);

    async function addStavka(stavka) {
      try {
        const novaStavka = await addStavkaKalkulacije(stavka,id);
        setStavkeKalkulacije(prevState => [...prevState, novaStavka]);
        setFlatennedStavkeKalkulacije(prevState => [...prevState, {
          ...novaStavka,
          ...novaStavka.proizvod,
          ...novaStavka.proizvod.jedinicaMere,
          proizvodId: novaStavka.proizvod.sifra,
          jedinicaMereId: novaStavka.proizvod.jedinicaMere
        }]);
      } catch (error) {
        console.error(error);
      }
    }


    async function fetchKalkulacija() {
        try {
            const response = await getKalkulacija(id);
            setKalkulacija(response);
        } catch (error) {
            console.error(error);
        }
        try {
          const response = await getStavkeKalkulacijeByKalkulacijaId(id);
          setStavkeKalkulacije(response);
          setFlatennedStavkeKalkulacije(response.map(stavka => ({
            ...stavka,
            ...stavka.proizvod,
            ...stavka.proizvod.jedinicaMere,
            proizvodId: stavka.proizvod.sifra,
            jedinicaMereId: stavka.proizvod.jedinicaMere
          })));
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchKalkulacija();
    }, []);

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    setKalkulacija(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async () => {
    kalkulacija.poslednjiDatumIzmene = new Date();
    // Submit logic, possibly involving an API call
    console.log(kalkulacija);
    // Implement API call or state update logic here
    try {
      const novaKalkulacija = await updateKalkulacija(kalkulacija);
      setKalkulacija(novaKalkulacija);
    } catch (error) {
      console.error(error);
    }
  };

  if(kalkulacija === kalkulacijaTemplate) {
    return <h1>Loading...</h1>
  }


  const handleKoriscenjeCeneChange = (event) => {
    const { name, value } = event.target;
    setKalkulacija(prevState => ({
      ...prevState,
      [name]: value
    }));
    setFlatennedStavkeKalkulacije(prevState => prevState.map(stavka => {
      if(value === "VELEPRODAJNA_CENA") {
        stavka.cena = stavka.proizvod.veleprodajnaCena;
      } else {
        stavka.cena = stavka.proizvod.cenaA;
      }
      return stavka;
    }));
    setStavkeKalkulacije(prevState => prevState.map(stavka => {
      if(value === "VELEPRODAJNA_CENA") {
        stavka.cena = stavka.proizvod.veleprodajnaCena;
      } else {
        stavka.cena = stavka.proizvod.cenaA;
      }
      return stavka;
    }
    ));
  }


  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ padding: 2, margin: 2 }}>
        <Typography variant="h5" sx={{ marginBottom: 2 }}>Edit Kalkulacija</Typography>
        
        <TextField
          fullWidth
          label="Naziv Kalkulacije"
          margin="normal"
          name="naziv"
          value={kalkulacija.naziv}
          onChange={handleInputChange}
        />

        {/* Assuming the "id" fields will be dropdowns or auto-complete components. For simplicity, they are text fields here. */}
        <TextField
          fullWidth
          label="Proizvod Ponude"
          margin="normal"
          name="proizvodPonuda.naziv"
          value={kalkulacija.proizvodPonuda.naziv}
          InputProps={
            {
              readOnly: true
            }
          }
        />

        <TextField
          fullWidth
          label="Kreirao Korisnik"
          margin="normal"
          name="kreirao.ime"
          value={kalkulacija.kreirao.ime}
          InputProps={
            {
              readOnly: true
            }
          
          }
        />
        <TextField
          fullWidth
          label="Datum Otvaranja"
          margin="normal"
          name="datumOtvaranja"
          value={new Date(kalkulacija.datumOtvaranja).toLocaleDateString()}
          InputProps={
            {
              readOnly: true
            }
          }
        />
        <TextField
          fullWidth
          label="Poslednji datum izmene"
          margin="normal"
          name="poslednjiDatumIzmene"
          value={new Date(kalkulacija.poslednjiDatumIzmene).toLocaleDateString()}
          InputProps={
            {
              readOnly: true
            }
          }
        />

        {/* Switch components for boolean fields */}
        <FormGroup>
          <FormControlLabel
            control={<Switch checked={kalkulacija.cinkovanje} onChange={handleInputChange} name="cinkovanje" />}
            label="Cinkovanje"
          />
          <FormControlLabel
            control={<Switch checked={kalkulacija.farbanje} onChange={handleInputChange} name="farbanje" />}
            label="Farbanje"
          />
          <FormControlLabel
            control={<Switch checked={kalkulacija.montaza} onChange={handleInputChange} name="montaza" />}
            label="Montaza"
          />
          <FormControlLabel
            control={<Switch checked={kalkulacija.izrada} onChange={handleInputChange} name="izrada" />}
            label="Izrada"
          />
          {/* Repeat for other boolean fields */}
        </FormGroup>

        {/* Numeric fields */}
        <Paper elevation={3} sx={{ padding: 2, margin: 2 }}>
          <TextField
            sx={{ margin: 1}}
            label="Materijal po Kg"
            margin="normal"
            name="materijalPoKg"
            type="number"
            value={kalkulacija.materijalPoKg}
            onChange={handleInputChange}
          />
          <TextField
            sx={{ margin: 1}}
            label = "Cinkovanje po Kg"
            margin="normal"
            name="cinkovanjePoKg"
            type="number"
            value={kalkulacija.cinkovanjePoKg}
            onChange={handleInputChange}
          />
          <TextField
            sx={{ margin: 1}}
            label = "Farbanje po M2"
            margin="normal"
            name="farbanjePoM2"
            type="number"
            value={kalkulacija.farbanjePoM2}
            onChange={handleInputChange}
          />
          <TextField
            sx={{ margin: 1}}
            label = "Montaza po Kg"
            margin="normal"
            name="montazaPoKg"
            type="number"
            value={kalkulacija.montazaPoKg}
            onChange={handleInputChange}
          />
          <TextField
            sx={{ margin: 1}}
            label = "Izrada po Kg"
            margin="normal"
            name="izradaPoKg"
            type="number"
            value={kalkulacija.izradaPoKg}
            onChange={handleInputChange}
          />
          <TextField
            sx={{ margin: 1}}
            label="Rezijski troskovi stepen"
            margin="normal"
            name="rezijskiTroskoviStepen"
            type="number"
            value={kalkulacija.rezijskiTroskoviStepen}
            onChange={handleInputChange}
          />
          <TextField
            sx={{ margin: 1}}
            label="Stepen sigurnosti"
            margin="normal"
            name="stepenSigurnosti"
            type="number"
            value={kalkulacija.stepenSigurnosti}
            onChange={handleInputChange}
          />
          <Select
            sx={{ margin: 1}}
            native
            label="Koriscenje cene"
            name="koriscenjeCene"
            value={kalkulacija.koriscenjeCene}
            onChange={handleKoriscenjeCeneChange}

            >
            <option  value={"VELEPRODAJNA_CENA"}>VELEPRODAJNA_CENA</option>
            <option  value={"CENA_A"}>CENA_A</option>
            </Select>

        </Paper>

        <Paper elevation={3} sx={{ padding: 2, margin: 2 }}>
          <DataGrid
            rows={flatennedStavkeKalkulacije}
            columns={[
              { field: 'id', headerName: 'ID', width: 50 },
              { field: 'naziv', headerName: 'Naziv', width: 150 },
              { field: 'proizvodId', headerName: 'Sifra Proizvoda', width: 150 },
              { field: 'jedinicaMereId', headerName: 'Jedinica Mere', width: 100 },
              { field: 'kolicina', headerName: 'Kolicina', width: 100, editable: true},
              { field: 'cena', headerName: 'Cena', width: 150 },
            ]}
            autoHeight
            pageSize={5}
            rowsPerPageOptions={[5]}
            sx={{ width: '100%', height: '100%' }}
            getRowId={(row) => {
              return row.proizvodId;
            }
            }
          />
          <NovaStavkaKalkulacijeDialog addStavka={addStavka} />

        </Paper>

        {/* Repeat for other numeric fields */}
          {(kalkulacija.proizvodPonuda.ponuda.status !== "ODBIJENA" && kalkulacija.proizvodPonuda.ponuda.status !== "PRIHVACENA") &&
          
          <>
            <Button variant="contained" color="primary" sx={{ margin: 2 }} onClick={handleSubmit}>
              Save Changes
            </Button>
            <NoviSablon idKalkulacije={kalkulacija.id} />
          </>
          }

      </Paper>
    </Container>
  );
}
