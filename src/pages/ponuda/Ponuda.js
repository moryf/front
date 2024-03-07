import React from 'react'
import { getPonuda, getAllProizvodiPonudeForPonuda, prihvatiPonudu, odbijPonudu, getDokumentiPonudeLinkoviByPonudaId } from '../../api/apiFunctions/ApiFunctions'
import { Container, Paper, Typography, TextField, Button,Accordion, AccordionSummary, AccordionDetails, Table, TableContainer, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState, useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import NoviProizvodPonudaDialog from '../../components/noviProizvodPonudaDialog/NoviProizvodPonudaDialog';
import './Ponuda.css'
import NapraviKompletnuPonudu from '../../components/napraviKompletnuPonudu/NapraviKompletnuPonudu';
import DodajDokumentLinkDialog from '../../components/dodajDokumentLinkDialog/DodajDokumentLinkDialog';


function Ponuda() {

  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const [proizvodiPonude, setProizvodiPonude] = useState([]);
  const [dokumentiPonude, setDokumentiPonude] = useState([]);



  const id = window.location.pathname.split("/")[2]
  const [ponuda, setPonuda] = useState(null)


  async function fetchPonuda() {
    const ponuda = await getPonuda(id)
    const proizvodiPonude = await getAllProizvodiPonudeForPonuda(id)
    const flattenedProizvodiPonude = proizvodiPonude.map(proizvodPonuda => ({
      tipProizvodaPonuda: proizvodPonuda.tipProizvodaPonuda.naziv,
      naziv: proizvodPonuda.naziv,
      ukupnoMetara: proizvodPonuda.ukupnoMetara,
      ukupnoKomada: proizvodPonuda.ukupnoKomada,
      duzinaPoKomadu: proizvodPonuda.duzinaPoKomadu,
      visinaPoKomadu: proizvodPonuda.visinaPoKomadu,
      dubinaPoKomadu: proizvodPonuda.dubinaPoKomadu,
      id: proizvodPonuda.id
    }));
    const dokumentiPonude = await getDokumentiPonudeLinkoviByPonudaId(id)
    setDokumentiPonude(dokumentiPonude)
    setProizvodiPonude(flattenedProizvodiPonude)
    setPonuda(ponuda)
  }

  async function prihvatiTrenutnuPonudu() {
    await prihvatiPonudu(id).then(window.location.reload())
  }

  async function odbijTrenutnuPonudu() {
    await odbijPonudu(id).then(window.location.reload())
  }




  useEffect(() => {
    fetchPonuda()
  }, [])

  if (ponuda === null) {
    return <h1>Loading...</h1>
  }

  return (
    <>
    <Container maxWidth="xl" sx={{
      backgroundColor: 'var(--background-color)',
      color: 'var(--color-1-dark-grey)',
      paddingTop: 4,
      paddingBottom: 4,
    }}>
    <Paper elevation={3} sx={{
    padding: 4,
    backgroundColor: 'var(--background-color)',
    marginBottom: 4,
  }}>





      <Typography variant="h4" component="h1" sx={{
    color: 'var(--color-5-green)',
    marginBottom: 2,
  }}>
        Upit
      </Typography>

        <NapraviKompletnuPonudu ponudaId={id} />


          {(ponuda.status === "NOVA" || ponuda.status ==="OBRADJENA") &&
          
          <div>
          <Button variant="contained" sx={{
              margin: 1,
              backgroundColor: 'var(--color-5-green)',
              color: '#fff',
              '&:hover': {
                backgroundColor: 'var(--color-4-orange)',
              },
            }}
            onClick={prihvatiTrenutnuPonudu}
          >
            Prihvacena ponuda
          </Button>
          <Button variant="contained" sx={{

              margin: 1,
              backgroundColor: 'var(--color-4-orange)',
              color: '#fff',
              '&:hover': {
                backgroundColor: 'var(--color-5-green)',
              },
            }}
            onClick={odbijTrenutnuPonudu}
          >
            Odbijena ponuda
          </Button>

          </div>

          }


      <TextField
        label="Naziv"
        variant="outlined"
        fullWidth
        margin="dense"
        sx={ {   marginBottom: 3,
          '& .MuiInputBase-root': {
            color: 'var(--color-1-dark-grey)', // Text color
          },
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'var(--color-3-dark-brown)', // Border color
          },
          '& .MuiInputLabel-root': {
            color: 'var(--color-3-dark-brown)', // Label color
          },
        }}
        value={ponuda.naziv || ''}
        InputProps={{
          readOnly: true,
        }}
      />
      <TextField
        label="Datum Otvaranja"
        variant="outlined"
        fullWidth
        margin="dense"
        sx={ {   marginBottom: 3,
          '& .MuiInputBase-root': {
            color: 'var(--color-1-dark-grey)', // Text color
          },
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'var(--color-3-dark-brown)', // Border color
          },
          '& .MuiInputLabel-root': {
            color: 'var(--color-3-dark-brown)', // Label color
          },
        }}
        value={new Date(ponuda.datumOtvaranja).toLocaleDateString() || ''}
        InputProps={{
          readOnly: true,
        }}
      />
      <TextField
        label="Rok Ponude"
        variant="outlined"
        fullWidth
        margin="dense"
        sx={ {   marginBottom: 3,
          '& .MuiInputBase-root': {
            color: 'var(--color-1-dark-grey)', // Text color
          },
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'var(--color-3-dark-brown)', // Border color
          },
          '& .MuiInputLabel-root': {
            color: 'var(--color-3-dark-brown)', // Label color
          },
        }}

        value={new Date(ponuda.rokPonude).toLocaleDateString() || ''}
        InputProps={{
          readOnly: true,
        }}
      />
      <TextField
        label="Status"
        variant="outlined"
        fullWidth
        margin="dense"
        sx={ {   marginBottom: 3,
          '& .MuiInputBase-root': {
            color: 'var(--color-1-dark-grey)', // Text color
          },
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'var(--color-3-dark-brown)', // Border color
          },
          '& .MuiInputLabel-root': {
            color: 'var(--color-3-dark-brown)', // Label color
          },
        }}

        value={ponuda.status || ''}
        InputProps={{
          readOnly: true,
        }}
      />
      <TextField
        label="Opis"
        variant="outlined"
        fullWidth
        multiline
        rows={4}
        margin="dense"
        sx={ {   marginBottom: 3,
          '& .MuiInputBase-root': {
            color: 'var(--color-1-dark-grey)', // Text color
          },
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'var(--color-3-dark-brown)', // Border color
          },
          '& .MuiInputLabel-root': {
            color: 'var(--color-3-dark-brown)', // Label color
          },
        }}

        value={ponuda.opis || ''}
        InputProps={{
          readOnly: true,
        }}
      />
      <TextField
        label="Otvorio Ponudu"
        variant="outlined"
        fullWidth
        margin="dense"
        sx={ {   marginBottom: 3,
          '& .MuiInputBase-root': {
            color: 'var(--color-1-dark-grey)', // Text color
          },
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'var(--color-3-dark-brown)', // Border color
          },
          '& .MuiInputLabel-root': {
            color: 'var(--color-3-dark-brown)', // Label color
          },
        }}
        value={ponuda.otvorioPonudu.ime || ''}
        InputProps={{
          readOnly: true,
        }}
      />
    </Paper>
    <Accordion expanded={expanded} onChange={handleExpandClick} sx={{
        backgroundColor: 'var(--color-4-orange)',
        margin: 4,
        borderRadius: '5px',
      }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{ color: 'var(--color-3-dark-brown)' }} />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          sx={{
            backgroundColor: 'var(--color-4-orange)',
            borderRadius: '5px',
            borderBottom: '1px solid var(--color-3-dark-brown)',
            '& .MuiAccordionSummary-content': {
              margin: 0,
            },
          }}
        >
          <Typography variant="h5" component="h2" sx={{
        color: 'var(--color-3-dark-brown)',
        marginBottom: 2,
      }}>
            Kupac
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{
          flexDirection: 'column',
          backgroundColor: 'var(--background-color)',
        }}>
      <TextField
        label="Ime i Prezime"
        variant="outlined"
        fullWidth
        margin="dense"
        sx={ {   marginBottom: 3,
          '& .MuiInputBase-root': {
            color: 'var(--color-1-dark-grey)', // Text color
          },
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'var(--color-3-dark-brown)', // Border color
          },
          '& .MuiInputLabel-root': {
            color: 'var(--color-3-dark-brown)', // Label color
          },
        }}

        value={ponuda.kupac.imeIPrezime || ''}
        InputProps={{
          readOnly: true,
        }}
      />
      <TextField
        label="Adresa"
        variant="outlined"
        fullWidth
        margin="dense"
        sx={ {   marginBottom: 3,
          '& .MuiInputBase-root': {
            color: 'var(--color-1-dark-grey)', // Text color
          },
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'var(--color-3-dark-brown)', // Border color
          },
          '& .MuiInputLabel-root': {
            color: 'var(--color-3-dark-brown)', // Label color
          },
        }}

        value={ponuda.kupac.adresa || ''}
        InputProps={{
          readOnly: true,
        }}
      />
      <TextField
        label="Broj Telefona"
        variant="outlined"
        fullWidth
        margin="dense"
        sx={ {   marginBottom: 3,
          '& .MuiInputBase-root': {
            color: 'var(--color-1-dark-grey)', // Text color
          },
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'var(--color-3-dark-brown)', // Border color
          },
          '& .MuiInputLabel-root': {
            color: 'var(--color-3-dark-brown)', // Label color
          },
        }}

        value={ponuda.kupac.brojTelefona || ''}
        InputProps={{
          readOnly: true,
        }}
      />
      <TextField
        label="Email"
        variant="outlined"
        fullWidth
        margin="dense"
        sx={ {   marginBottom: 3,
          '& .MuiInputBase-root': {
            color: 'var(--color-1-dark-grey)', // Text color
          },
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'var(--color-3-dark-brown)', // Border color
          },
          '& .MuiInputLabel-root': {
            color: 'var(--color-3-dark-brown)', // Label color
          },
        }}

        value={ponuda.kupac.email || ''}
        InputProps={{
          readOnly: true,
        }}
      />
      </AccordionDetails>
    </Accordion>
    <Paper elevation={3} sx={{
    padding: 4,
    backgroundColor: 'var(--background-color)',
    marginBottom: 4,
  }}>
      <Typography variant="h5" component="h2" sx={{
    color: 'var(--color-5-green)',
    marginBottom: 2,
  }}>
        Proizvodi Ponude
      </Typography>
      {(ponuda.status === "NOVA" || ponuda.status === "OBRADJENA") && <NoviProizvodPonudaDialog ponudaId={id} />}
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={proizvodiPonude}
          columns={[
            { field: 'id', headerName: 'ID', width: 100, headerAlign: 'center',align: 'center',headerClassName: 'datagrid-header'},
            { field: 'tipProizvodaPonuda', headerName: 'Tip Proizvoda Ponude', width:200 ,headerClassName: 'datagrid-header'},
            { field: 'naziv', headerName: 'Naziv', width:250 ,headerClassName: 'datagrid-header'},
            { field: 'ukupnoMetara', headerName: 'Metara', width:120 ,headerClassName: 'datagrid-header'},
            { field: 'ukupnoKomada', headerName: 'Komada', width:120 ,headerClassName: 'datagrid-header'},
            { field: 'duzinaPoKomadu', headerName: 'Duzina Po Komadu', width:120 ,headerClassName: 'datagrid-header'},
            { field: 'visinaPoKomadu', headerName: 'Visina Po Komadu', width:120 ,headerClassName: 'datagrid-header'},
            { field: 'dubinaPoKomadu', headerName: 'Dubina Po Komadu', width:120,headerClassName: 'datagrid-header'},
          ]}
          onRowDoubleClick={(row) => {
            window.location.href = `/proizvod-ponuda/${row.id}`; // Redirect to the ponuda page when a row is double-clicked
        }
        }
          pageSize={5}
        />
      </div>
    </Paper>
    <Paper elevation={3} sx={{marginBottom: 4,
    padding: 4,
    backgroundColor: 'var(--background-color)',
  }}>
    
      <Typography variant="h5" component="h2" sx={{
    color: 'var(--color-5-green)',
    marginBottom: 2,
  }}>
        Dokumenti Ponude
      </Typography>
      <DodajDokumentLinkDialog ponudaId={id} />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="left">Naziv</TableCell>
              <TableCell align="left">Link</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dokumentiPonude.map((dokumentPonude) => (
              <TableRow
                key={dokumentPonude.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {dokumentPonude.id}
                </TableCell>
                <TableCell align="left">{dokumentPonude.naziv}</TableCell>
                <TableCell align="left"><a href={dokumentPonude.link}>{dokumentPonude.link}</a></TableCell>
              </TableRow>
            ))}

          </TableBody>
        </Table>
      </TableContainer>

      </Paper>
    <Button
      variant="contained"
      sx={{
        margin: 1,
        backgroundColor: 'var(--color-5-green)',
        color: '#fff',
        '&:hover': {
          backgroundColor: 'var(--color-4-orange)',
        },
      }}
      onClick={() => window.history.back()}
    >
      Nazad
    </Button>
  </Container>
  
  
  </>
  )
}

export default Ponuda