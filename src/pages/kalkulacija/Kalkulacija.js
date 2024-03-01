import React, { useState, useEffect } from 'react';
import {AccordionSummary,AccordionDetails, Container, Paper, Typography, TextField, Button, Switch, FormControlLabel, FormGroup, Select, Accordion, Divider, TableRow, TableCell, Table, Tab } from '@mui/material';
import { kalkulacijaTemplate } from '../../api/josnTemplates/JSONTemplates';
import {deleteStavkaKalkulacije, getKalkulacija, updateKalkulacija,getStavkeKalkulacijeByKalkulacijaId, addStavkaKalkulacije,updateStavkeKalkulacije, updateStavkaKalkulacije } from '../../api/apiFunctions/ApiFunctions';
import NoviSablon from '../../components/noviSablon/NoviSablon';
import { DataGrid, GridRow } from '@mui/x-data-grid';
import NovaStavkaKalkulacijeDialog from '../../components/novaStavkaKalkulacijeDialog/NovaStavkaKalkulacijeDialog';


export default function Kalkulacija() {

  const [open, setOpen] = React.useState(false);

  const [mode, setMode] = useState("NOVI");
  const[izmenaStavka, setIzmenaStavka] = useState(null);

  const[stavkeIzrada, setStavkeIzrada] = useState([]);
  const[stavkeMontaza, setStavkeMontaza] = useState([]);
  const[stavkeFarbanje, setStavkeFarbanje] = useState([]);
  const[stavkeCinkovanje, setStavkeCinkovanje] = useState([]);

  const[cinkovanjeSuma, setCinkovanjeSuma] = useState(0);
  const[farbanjeSuma, setFarbanjeSuma] = useState(0);
  const[montazaSuma, setMontazaSuma] = useState(0);
  const[izradaSuma, setIzradaSuma] = useState(0);

  const[sumaMaterijal, setSumaMaterijal] = useState(0);

  const[masaProizvoda, setMasaProizvoda] = useState(0);
  const[specificnaPovrsina, setSpecificnaPovrsina] = useState(0);

  const[sumaCenaPoKomadu, setsumaCenaPoKomadu] = useState(0);

  const[sumaCenaUkupno, setSumaCenaUkupno] = useState(0);

  const[povrsinaProizvoda, setPovrsinaProizvoda] = useState(0);




    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
        setIzmenaStavka(null);
        setMode("NOVI");
    };

    const id = window.location.pathname.split('/')[2];
    const [kalkulacija, setKalkulacija] = useState(kalkulacijaTemplate);
    const [stavkeKalkulacije, setStavkeKalkulacije] = useState([]);
    const[flatennedStavkeKalkulacije, setFlatennedStavkeKalkulacije] = useState([]);

    async function addStavka(stavka) {
     if(mode === "NOVI") {
      try {
        const novaStavka = await addStavkaKalkulacije(stavka,id);
         setFlatennedStavkeKalkulacije(prevState => [...prevState, {
           ...novaStavka,
           ...novaStavka.proizvod,
           ...novaStavka.proizvod.jedinicaMere,
           proizvodId: novaStavka.proizvod.sifra,
           jedinicaMereId: novaStavka.proizvod.jedinicaMere,
           ukupno: novaStavka.kolicina * novaStavka.cena
         }]);
         setStavkeKalkulacije(prevState => [...prevState, novaStavka]);
         setMode("NOVI");
       } catch (error) {
         console.error(error);
       }
      } else {
        try {
          const novaStavka = await updateStavkaKalkulacije(stavka);
          setFlatennedStavkeKalkulacije(prevState => prevState.map(stavka => {
            if(stavka.id === novaStavka.id) {
              return {
                ...novaStavka,
                ...novaStavka.proizvod,
                ...novaStavka.proizvod.jedinicaMere,
                proizvodId: novaStavka.proizvod.sifra,
                jedinicaMereId: novaStavka.proizvod.jedinicaMere,
                ukupno: novaStavka.kolicina * novaStavka.cena
              }
            }
            return stavka;
          }));
          setStavkeKalkulacije(prevState => prevState.map(stavka => {
            if(stavka.id === novaStavka.id) {
              return novaStavka;
            }
            return stavka;
          }));
          setMode("NOVI");
        } catch (error) {
          console.error(error);
        }
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
            jedinicaMere: stavka.proizvod.jedinicaMere,
            ukupno: stavka.kolicina * stavka.cena
          })));
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchKalkulacija();
    }, []);

    useEffect(() => {
      const cinkovanjeStavke = stavkeKalkulacije.filter(stavka => stavka.cinkovanje);
      console.log(cinkovanjeStavke);
      const farbanjeStavke = stavkeKalkulacije.filter(stavka => stavka.farbanje);
      const montazaStavke = stavkeKalkulacije.filter(stavka => stavka.montaza);
      const izradaStavke = stavkeKalkulacije.filter(stavka => stavka.izrada);
      setStavkeCinkovanje(cinkovanjeStavke);
      setStavkeFarbanje(farbanjeStavke);
      setStavkeMontaza(montazaStavke);
      setStavkeIzrada(izradaStavke);
      //Calculate cinkovanje as a sum of all cinkovanjeStavke.masa * cinkovanjePoKg
      const cinkovanjeSuma = cinkovanjeStavke.reduce((acc, stavka) => acc + (stavka.proizvod.masa*stavka.kolicina * kalkulacija.cinkovanjePoKg), 0);
      setCinkovanjeSuma(cinkovanjeSuma);
      const farbanjeSuma = farbanjeStavke.reduce((acc, stavka) => acc + (stavka.proizvod.specificnaPovrsina*stavka.kolicina * kalkulacija.farbanjePoM2), 0);
      setFarbanjeSuma(farbanjeSuma);
      const montazaSuma = montazaStavke.reduce((acc, stavka) => acc + (stavka.proizvod.masa*stavka.kolicina * kalkulacija.montazaPoKg), 0);
      setMontazaSuma(montazaSuma);
      const izradaSuma = izradaStavke.reduce((acc, stavka) => acc + (stavka.proizvod.masa*stavka.kolicina * kalkulacija.izradaPoKg), 0);
      setIzradaSuma(izradaSuma);
      const sumaMaterijal = stavkeKalkulacije.reduce((acc, stavka) => acc + (stavka.cena*stavka.kolicina), 0);
      setSumaMaterijal(sumaMaterijal);
      const masaProizvoda = stavkeKalkulacije.reduce((acc, stavka) => acc + (stavka.proizvod.masa*stavka.kolicina), 0);
      setMasaProizvoda(masaProizvoda);
      const specificnaPovrsina = stavkeKalkulacije.reduce((acc, stavka) => acc + (stavka.proizvod.specificnaPovrsina*stavka.kolicina), 0);
      setSpecificnaPovrsina(specificnaPovrsina);
      const sumaCenaPoKomadu = (cinkovanjeSuma + farbanjeSuma + montazaSuma + izradaSuma + sumaMaterijal)*kalkulacija.stepenSigurnosti*kalkulacija.rezijskiTroskoviStepen;
      setsumaCenaPoKomadu(sumaCenaPoKomadu);

      const sumaCenaUkupno = sumaCenaPoKomadu * kalkulacija.proizvodPonuda.ukupnoKomada;
      setSumaCenaUkupno(sumaCenaUkupno);

      const povrsinaProizvoda = kalkulacija.proizvodPonuda.duzinaPoKomadu  * kalkulacija.proizvodPonuda.visinaPoKomadu;
      setPovrsinaProizvoda(povrsinaProizvoda);

    }, [stavkeKalkulacije]);

    

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
    // Implement API call or state update logic here
    try {
      const novaKalkulacija = await updateKalkulacija(kalkulacija);
      setKalkulacija(novaKalkulacija);
      const noveStavke = await updateStavkeKalkulacije(stavkeKalkulacije);
      setStavkeKalkulacije(noveStavke);
      setFlatennedStavkeKalkulacije(noveStavke.map(stavka => ({
        ...stavka,
        ...stavka.proizvod,
        ...stavka.proizvod.jedinicaMere,
        proizvodId: stavka.proizvod.sifra,
        jedinicaMere: stavka.proizvod.jedinicaMere,
        ukupno: stavka.kolicina * stavka.cena
      })));
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
        stavka.ukupno = stavka.kolicina * stavka.proizvod.veleprodajnaCena;
      } else {
        stavka.cena = stavka.proizvod.cenaA;
        stavka.ukupno= stavka.kolicina * stavka.proizvod.cenaA;
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


  const deleteStavka = async (id) => {
    try {
      await deleteStavkaKalkulacije(id);
      setFlatennedStavkeKalkulacije(prevState => prevState.filter(stavka => stavka.id !== id));
      setStavkeKalkulacije(prevState => prevState.filter(stavka => stavka.id !== id));
    } catch (error) {
      console.error(error);
    }
  }



const handleSwitchChange = (event) => {
  const { name, checked } = event.target;
  setKalkulacija(prevState => ({
    ...prevState,
    [name]: checked
  }));
  setFlatennedStavkeKalkulacije(prevState => prevState.map(stavka => {
    if(stavka[name] !== undefined) {
      stavka[name] = checked;
    }
    return stavka;
  }));
  setStavkeKalkulacije(prevState => prevState.map(stavka => {
    if(stavka[name] !== undefined) {
      stavka[name] = checked;
    }
    return stavka;
  }));
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
            control={<Switch checked={kalkulacija.cinkovanje} onChange={handleSwitchChange} name="cinkovanje" />}
            label="Cinkovanje"
          />
          <FormControlLabel
            control={<Switch checked={kalkulacija.farbanje} onChange={handleSwitchChange} name="farbanje" />}
            label="Farbanje"
          />
          <FormControlLabel
            control={<Switch checked={kalkulacija.montaza} onChange={handleSwitchChange} name="montaza" />}
            label="Montaza"
          />
          <FormControlLabel
            control={<Switch checked={kalkulacija.izrada} onChange={handleSwitchChange} name="izrada" />}
            label="Izrada"
          />
          {/* Repeat for other boolean fields */}
        </FormGroup>

        {/* Numeric fields */}

        <Paper elevation={3} sx={{ padding: 2, margin: 2 }}>
          <TextField
            sx={{ margin: 1}}
            label="Duzina po komadu"
            margin="normal"
            name="proizvodPonuda.duzinaPoKomadu"
            type="number"
            value={kalkulacija.proizvodPonuda.duzinaPoKomadu}
            disabled
          />
          <TextField
            sx={{ margin: 1}}
            label="Dubina po komadu"
            margin="normal"
            name="proizvodPonuda.dubinaPoKomadu"
            type="number"
            value={kalkulacija.proizvodPonuda.dubinaPoKomadu}
            disabled
          />
          <TextField
            sx={{ margin: 1}}
            label="Visina po komadu"
            margin="normal"
            name="proizvodPonuda.visinaPoKomadu"
            type="number"
            value={kalkulacija.proizvodPonuda.visinaPoKomadu}
            disabled
          />
        </Paper>

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

        {/* DataGrid for the "stavkeKalkulacije" array */}

        <Paper elevation={3} sx={{ padding: 2, margin: 2 }}>
          <Typography variant="h6">Stavke Kalkulacije po Komadu</Typography>
            <DataGrid
              rows={flatennedStavkeKalkulacije}
              columns={[
                { field: 'id', headerName: 'ID', width: 50 },
                { field: 'naziv', headerName: 'Naziv', width: 100 },
                { field: 'proizvodId', headerName: 'Sifra Proizvoda', width: 100 },
                { field: 'jedinicaMere', headerName: 'Jedinica Mere', width: 100 },
                { field: 'kolicina', headerName: 'Kolicina', width: 100},
                { field: 'cena', headerName: 'Cena', width: 100 },
                { field: 'ukupno', headerName: 'Ukupno', width: 150},
                { field: 'izmeni', headerName: 'Izmeni', width: 100, renderCell: (params) => (
                  <Button variant="contained" color="primary" onClick={() => {
                    setMode("IZMENA");
                    setIzmenaStavka(stavkeKalkulacije.find(stavka => stavka.id === params.row.id));
                    handleClickOpen();
                  }}>Izmeni</Button>
                )
                },
                { field: 'obrisi', headerName: 'Obrisi', width: 100, renderCell: (params) => (
                  <Button variant="contained" color="secondary" onClick={() => deleteStavka(params.row.id)}>Obrisi</Button>
                )
                }
              ]}
              autoHeight
              pageSize={5}
              rowsPerPageOptions={[5]}
              sx={{ width: '100%', height: '100%' }}
                getRowId={(row) => {
                  return row.id;
                }
              }
              
            />
            {mode==="IZMENA" &&
            <NovaStavkaKalkulacijeDialog
            open={open}
            handleClose={handleClose}
            mode="IZMENA"
            izmenaStavka={izmenaStavka}
            addStavka={addStavka}
            duzinaProizvoda={kalkulacija.proizvodPonuda.duzinaPoKomadu}
            dubinaProizvoda={kalkulacija.proizvodPonuda.dubinaPoKomadu}
            visinaProizvoda={kalkulacija.proizvodPonuda.visinaPoKomadu}
            koriscenjeCene={kalkulacija.koriscenjeCene}
            cinkovanje={kalkulacija.cinkovanje}
            farbanje={kalkulacija.farbanje}
            montaza={kalkulacija.montaza}
            izrada={kalkulacija.izrada}
            />
            
            }




            <Button variant="contained" color="primary" onClick={handleClickOpen}>Nova stavka kalkulacije</Button>
          {mode!=="IZMENA" &&
          <NovaStavkaKalkulacijeDialog 
          open={open}
          handleClose={handleClose}
          mode="NOVI"
          izmenaStavka={null}
          addStavka={addStavka}
          duzinaProizvoda={kalkulacija.proizvodPonuda.duzinaPoKomadu}
            dubinaProizvoda={kalkulacija.proizvodPonuda.dubinaPoKomadu}
            visinaProizvoda={kalkulacija.proizvodPonuda.visinaPoKomadu}
            koriscenjeCene={kalkulacija.koriscenjeCene}
            cinkovanje={kalkulacija.cinkovanje}
              farbanje={kalkulacija.farbanje}
              montaza={kalkulacija.montaza}
              izrada={kalkulacija.izrada}
            />
          
          }  

        </Paper>
        {/*Racunanje kalkulacije */}
        <Paper elevation={3} sx={{ padding: 2, margin: 2 }}>
          <Typography variant="h5">Racunanje kalkulacije - po komadu</Typography>
          <Accordion>
            <AccordionSummary>
              <Typography variant="h6">Ukupno cinkovanje - {cinkovanjeSuma.toFixed(2)} rsd</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Table>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Naziv</TableCell>
                <TableCell>Sifra</TableCell>
                <TableCell>Masa * Kolicina</TableCell>
                <TableCell>Ukupno</TableCell>
              </TableRow>
              {stavkeCinkovanje.map(stavka => {
                return (
                  <TableRow>
                    <TableCell>{stavka.id}</TableCell>
                    <TableCell>{stavka.proizvod.naziv}</TableCell>
                    <TableCell>{stavka.proizvod.sifra}</TableCell>
                    <TableCell>{stavka.proizvod.masa} * {stavka.kolicina}</TableCell>
                    <TableCell>{(stavka.proizvod.masa*stavka.kolicina * kalkulacija.cinkovanjePoKg).toFixed(2)} rsd</TableCell>

                  </TableRow>
                )
              }
              )}
              </Table>
            
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary>
              <Typography variant="h6">Ukupno farbanje - {farbanjeSuma.toFixed(2)} rsd</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Table>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Naziv</TableCell>
                <TableCell>Sifra</TableCell>
                <TableCell>Specificna povrsina * Kolicina</TableCell>
                <TableCell>Ukupno</TableCell>
              </TableRow>
              {stavkeFarbanje.map(stavka => {
                return (
                  <TableRow>
                    <TableCell>{stavka.id}</TableCell>
                    <TableCell>{stavka.proizvod.naziv}</TableCell>
                    <TableCell>{stavka.proizvod.sifra}</TableCell>
                    <TableCell>{stavka.proizvod.specificnaPovrsina} * {stavka.kolicina}</TableCell>
                    <TableCell>{(stavka.proizvod.specificnaPovrsina*stavka.kolicina * kalkulacija.farbanjePoM2).toFixed(2)} rsd</TableCell>

                  </TableRow>
                )
              }
              )}
              </Table>
            
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary>
              <Typography variant="h6">Ukupno montaza - {montazaSuma.toFixed(2)} rsd</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Table>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Naziv</TableCell>
                <TableCell>Sifra</TableCell>
                <TableCell>Masa * Kolicina</TableCell>
                <TableCell>Ukupno</TableCell>
              </TableRow>
              {stavkeMontaza.map(stavka => {
                return (
                  <>
                  <TableRow>
                    <TableCell>{stavka.id}</TableCell>
                    <TableCell>{stavka.proizvod.naziv}</TableCell>
                    <TableCell>{stavka.proizvod.sifra}</TableCell>
                    <TableCell>{stavka.proizvod.masa} * {stavka.kolicina}</TableCell>
                    <TableCell>{(stavka.proizvod.masa*stavka.kolicina * kalkulacija.montazaPoKg).toFixed(2)} rsd</TableCell>

                  </TableRow>
                  </>
                )
              })}
              </Table>
            
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary>
              <Typography variant="h6">Ukupno izrada - {izradaSuma.toFixed(2)} rsd</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Table
              sx={{ width: '100%', height: '100%' }}
              >
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Naziv</TableCell>
                <TableCell>Sifra</TableCell>
                <TableCell>Masa * Kolicina</TableCell>
                <TableCell>Ukupno</TableCell>
              </TableRow>
              {stavkeIzrada.map(stavka => {
                return (
                  <>
                  <TableRow>
                    <TableCell>{stavka.id}</TableCell>
                    <TableCell>{stavka.proizvod.naziv}</TableCell>
                    <TableCell>{stavka.proizvod.sifra}</TableCell>
                    <TableCell>{stavka.proizvod.masa} * {stavka.kolicina}</TableCell>
                    <TableCell>{(stavka.proizvod.masa*stavka.kolicina * kalkulacija.izradaPoKg).toFixed(2)} rsd</TableCell>

                  </TableRow>
                  </>
                )
              })}
              </Table>
              
            </AccordionDetails>
          </Accordion>
          <Table>
            <TableRow>
              <TableCell>Suma materijal</TableCell>
              <TableCell>{sumaMaterijal.toFixed(2)} rsd</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Masa proizvoda</TableCell>
              <TableCell>{masaProizvoda.toFixed(2)} kg</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Specificna povrsina</TableCell>
              <TableCell>{specificnaPovrsina.toFixed(2)} m2</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Povrsina proizvoda</TableCell>
              <TableCell>{povrsinaProizvoda.toFixed(2)} m2</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><b>Suma cena po komadu</b></TableCell>
              <TableCell><b>{sumaCenaPoKomadu.toFixed(2)} rsd</b></TableCell>
            </TableRow>
            <TableRow>
                  <TableCell><b>Suma cena ukupno</b></TableCell>
                  <TableCell><b>{sumaCenaUkupno.toFixed(2)} rsd</b></TableCell>
            </TableRow>
            <TableRow>
                  <TableCell><b>Cena sa PDV-om</b></TableCell>
                  <TableCell><b>{(sumaCenaUkupno*1.2).toFixed(2)} rsd</b></TableCell>
            </TableRow>
          </Table>

          <Divider variant='fullWidth' sx={{margin:"10px"}} />
          
          <Accordion>
            <AccordionSummary>
              <Typography variant="h6">Rezultat kalkulacije</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Table>
                <TableRow>
                  <TableCell>Cena po kg</TableCell>
                  <TableCell>{(sumaCenaPoKomadu/masaProizvoda).toFixed(2)} rsd</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Cena po m2</TableCell>
                  <TableCell>{(sumaCenaPoKomadu/povrsinaProizvoda).toFixed(2)} rsd</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Cena po duzini</TableCell>
                  <TableCell>{(sumaCenaPoKomadu/kalkulacija.proizvodPonuda.duzinaPoKomadu).toFixed(2)} rsd</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Cena po komadu</TableCell>
                  <TableCell>{sumaCenaPoKomadu.toFixed(2)} rsd</TableCell>
                </TableRow>

              </Table>
            </AccordionDetails>
          </Accordion>


        </Paper>

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
