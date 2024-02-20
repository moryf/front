import React, { useState, useEffect } from 'react';
import { Container, Paper, Typography, TextField, Button, Switch, FormControlLabel, FormGroup } from '@mui/material';
import { kalkulacijaTemplate } from '../../api/josnTemplates/JSONTemplates';
import { getKalkulacija } from '../../api/apiFunctions/ApiFunctions';


export default function Kalkulacija() {

    const id = window.location.pathname.split('/')[2];
    const [kalkulacija, setKalkulacija] = useState(kalkulacijaTemplate);

    async function fetchKalkulacija() {
        try {
            const response = await getKalkulacija(id);
            setKalkulacija(response);
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
    // Submit logic, possibly involving an API call
    console.log(kalkulacija);
    // Implement API call or state update logic here
  };

  if(kalkulacija === kalkulacijaTemplate) {
    return <h1>Loading...</h1>
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
          label="Proizvod Ponuda ID"
          margin="normal"
          name="proizvodPonuda.id"
          value={kalkulacija.proizvodPonuda.id}
          onChange={handleInputChange}
        />

        <TextField
          fullWidth
          label="Kreirao Korisnik ID"
          margin="normal"
          name="kreirao.id"
          value={kalkulacija.kreirao.id}
          onChange={handleInputChange}
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
          {/* Repeat for other boolean fields */}
        </FormGroup>

        {/* Numeric fields */}
        <TextField
          fullWidth
          label="Materijal po Kg"
          margin="normal"
          name="materijalPoKg"
          type="number"
          value={kalkulacija.materijalPoKg}
          onChange={handleInputChange}
        />

        {/* Repeat for other numeric fields */}

        <Button variant="contained" color="primary" sx={{ marginTop: 2 }} onClick={handleSubmit}>
          Save Changes
        </Button>
      </Paper>
    </Container>
  );
}
