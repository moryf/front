import React, { useState } from 'react';
import { Container, Paper, Typography, TextField, Button, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useEffect } from 'react'
import { findProizvodPonudaById,getKalkulacijeByProizvodPonudaId, novaKalkulacija } from '../../api/apiFunctions/ApiFunctions'
import { DataGrid } from '@mui/x-data-grid';
import KalkulacijaIzSablonaDialog from '../../components/kalkulacijaIzSablonaDialog/KalkulacijaIzSablonaDialog';


function ProizvodPonuda() {
    const id = window.location.pathname.split('/')[2];
    const [proizvodPonuda, setProizvodPonuda] = useState(null);
    const[kalkulacije, setKalkulacije] = useState([])
    var zavrsenaPonuda = false;

    async function fetchProizvodPonuda() {
        const proizvodPonudaResult = await findProizvodPonudaById(id)
        setProizvodPonuda(proizvodPonudaResult)
        const kalkulacijeResult = await getKalkulacijeByProizvodPonudaId(id)
        const flattenedKalkulacije = kalkulacijeResult.map(kalkulacija => {
            return {
                id: kalkulacija.id,
                naziv: kalkulacija.naziv,
                datumOtvaranja: new Date(kalkulacija.datumOtvaranja).toLocaleDateString(),
                poslednjiDatumIzmene: new Date(kalkulacija.poslednjiDatumIzmene).toLocaleDateString(),
                kreirao: kalkulacija.kreirao.ime
            }
        }
        )
        setKalkulacije(flattenedKalkulacije)
    }

    

    useEffect(() => {
        fetchProizvodPonuda()
    }, [])

    if (proizvodPonuda === null) {
        return <h1>Loading...</h1>
    }

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ padding: 2, margin: 2 }}>
        <Typography variant="h5" sx={{ marginBottom: 2 }}>Proizvod Ponuda</Typography>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} onDoubleClick={()=>{window.location.href = `/ponuda/${proizvodPonuda.ponuda.id}`;}}>
            <Typography>Ponuda Details</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <TextField
              fullWidth
              label="Naziv Ponude"
              margin="normal"
              name="ponuda.naziv"
              value={proizvodPonuda.ponuda.naziv}
            />
            {/* Add more fields for the ponuda if needed */}
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Kupac Details</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <TextField
              fullWidth
              label="Ime i Prezime Kupca"
              margin="normal"
              name="ponuda.kupac.imeIPrezime"
              value={proizvodPonuda.ponuda.kupac.imeIPrezime}
            />
            {/* Add more fields for the kupac if needed */}
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Tip Proizvoda Ponuda Details</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <TextField
              fullWidth
              label="Naziv Tipa Proizvoda"
              margin="normal"
              name="tipProizvodaPonuda.naziv"
              value={proizvodPonuda.tipProizvodaPonuda.naziv}
            />
            {/* Add more fields for the tipProizvodaPonuda if needed */}
          </AccordionDetails>
        </Accordion>

        {/* Repeat similar Accordion blocks for other properties like ukupnoMetara, ukupnoKomada, etc. */}
      </Paper>
      <Paper elevation={3} sx={{ padding: 2, margin: 2 }}>
        <Typography variant="h5" sx={{ marginBottom: 2 }}>Proizvod Ponuda</Typography>
        <TextField
            fullWidth
            label="Naziv Proizvoda"
            margin="normal"
            name="naziv"
            value={proizvodPonuda.naziv}
            InputProps={{
                readOnly: true,
              }}
        />
        <TextField
            fullWidth
            label="Ukupno Metara"
            margin="normal"
            name="ukupnoMetara"
            value={proizvodPonuda.ukupnoMetara}
            InputProps={{
                readOnly: true,
              }}
        />
        <TextField
            fullWidth
            label="Ukupno Komada"
            margin="normal"
            name="ukupnoKomada"
            value={proizvodPonuda.ukupnoKomada}
            InputProps={{
                readOnly: true,
              }}
        />
        <TextField
            fullWidth
            label="Duzina Po Komadu"
            margin="normal"
            name="duzinaPoKomadu"
            value={proizvodPonuda.duzinaPoKomadu}
            InputProps={{
                readOnly: true,
              }}
        />
        <TextField
            fullWidth
            label="Visina Po Komadu"
            margin="normal"
            name="visinaPoKomadu"
            value={proizvodPonuda.visinaPoKomadu}
            InputProps={{
                readOnly: true,
              }}
        />
        <TextField
            fullWidth
            label="Dubina Po Komadu"
            margin="normal"
            name="dubinaPoKomadu"
            value={proizvodPonuda.dubinaPoKomadu}
            InputProps={{
                readOnly: true,
              }}
        /> 

        </Paper>
        <Paper elevation={3} sx={{ padding: 2, margin: 2 }}>
        <Typography variant="h5" sx={{ marginBottom: 2 }}>Kalkulacije</Typography>

              {(proizvodPonuda.ponuda.status !== "ODBIJENA" && proizvodPonuda.ponuda.status !== "PRIHVACENA") &&
              <>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {novaKalkulacija(id)}}
                            sx={{ margin: 2 }}
                        > Nova kalkulacija
                        </Button>
                        <KalkulacijaIzSablonaDialog idProizvodaPonude={id} />
              </>}

        <DataGrid
            rows={kalkulacije}
            onRowDoubleClick={(row) => {window.location.href = `/kalkulacija/${row.id}`;} }
            columns={[
                { field: 'id', headerName: 'ID', width: 70 },
                { field: 'naziv', headerName: 'Naziv', width: 130 },
                { field: 'datumOtvaranja', headerName: 'Datum Otvaranja', width: 130 },
                { field: 'poslednjiDatumIzmene', headerName: 'Poslednji Datum Izmene', width: 130 },
                { field: 'kreirao', headerName: 'Kreirao', width: 130 }
            ]}
            pageSize={5}
            rowsPerPageOptions={[5]}
            disableSelectionOnClick
        />
      </Paper>
              
    </Container>
  )
}

export default ProizvodPonuda