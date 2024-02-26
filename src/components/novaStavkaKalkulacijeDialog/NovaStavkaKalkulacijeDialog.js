import { Button, Dialog, DialogContent, DialogTitle, TextField , Paper, Container, DialogActions, Select} from '@mui/material'
import React, { useState } from 'react'
import PretragaProizvodaDialog from './pretragaProizvodaDialog/PretragaProizvodaDialog'
import { proizvodTemplate, stavkaKalkulacijeTemplate } from '../../api/josnTemplates/JSONTemplates'


export default function NovaStavkaKalkulacijeDialog({addStavka,visinaProizvoda,duzinaProizvoda,dubinaProizvoda}) {
    const[proizvod, setProizvod] = useState(proizvodTemplate);
    const [proizvodLoaded, setProizvodLoaded] = useState(false);

    const [jmKomada, setJmKomada] = useState(false);

    const[stavkaKalkulacije, setStavkaKalkulacije] = useState(stavkaKalkulacijeTemplate);

    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    function setProizvodState(proizvod) {
        setProizvodLoaded(true);
        setProizvod(proizvod);
        console.log(proizvod);
        setStavkaKalkulacije(prevState => ({
            ...prevState,
            proizvod: proizvod
        }));
        if (proizvod.jedinicaMere === "KOMAD") {
            setJmKomada(true);
        } else {
            setJmKomada(false);
            setStavkaKalkulacije(prevState => ({
                ...prevState,
                nacinRacunanjaDuzineKomada: "UPISANO"
            }));
        }
    }


    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setStavkaKalkulacije(prevState => ({
            ...prevState,
            [name]: value
        }));
        console.log(stavkaKalkulacije);
        if(name === "nacinRacunanjaDuzineKomada") {
            preracunajDuzinu(value, stavkaKalkulacije.razlikaDuzine,stavkaKalkulacije.duzina);
        }
        if(name === "duzina") {
            preracunajDuzinu(stavkaKalkulacije.nacinRacunanjaDuzineKomada,stavkaKalkulacije.razlikaDuzine,value);
        }
        if(name === "razlikaDuzine") {
            preracunajDuzinu(stavkaKalkulacije.nacinRacunanjaDuzineKomada,value,stavkaKalkulacije.duzina);
        }
    }

    const preracunajDuzinu = (nacinRacunanjaDuzineKomada, razlikaDuzine,duzina) => {
        console.log(visinaProizvoda + " " + duzinaProizvoda + " " + dubinaProizvoda);
        console.log(nacinRacunanjaDuzineKomada);
        let duzinaKomada = 0;
        if(nacinRacunanjaDuzineKomada === "UPISANO") {
            duzinaKomada = parseFloat(duzina);
        } else if(nacinRacunanjaDuzineKomada === "DUZINA") {
            setStavkaKalkulacije(prevState => ({
                ...prevState,
                duzina: duzinaProizvoda
            }));
            duzinaKomada = duzinaProizvoda + parseFloat(razlikaDuzine);
        } else if(nacinRacunanjaDuzineKomada === "VISINA") {
            setStavkaKalkulacije(prevState => ({
                ...prevState,
                duzina: visinaProizvoda
            }));
            duzinaKomada = visinaProizvoda + parseFloat(razlikaDuzine);
        }
        else if(nacinRacunanjaDuzineKomada === "DUBINA") {
            setStavkaKalkulacije(prevState => ({
                ...prevState,
                duzina: dubinaProizvoda
            }));
            duzinaKomada = dubinaProizvoda + parseFloat(razlikaDuzine);
        }
        setStavkaKalkulacije(prevState => ({
            ...prevState,
            duzinaKomada: duzinaKomada
        }));
        console.log(duzinaKomada);

    }





  return (
    <>
    <Button variant="contained" color="primary" onClick={handleClickOpen}>Nova stavka kalkulacije</Button>
    <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Nova Stavka Kalkulacije</DialogTitle>
        <DialogContent>
            <PretragaProizvodaDialog setProizvodState={setProizvodState} />
            {
                proizvodLoaded ?
                <Container>
                <TextField
                    sx={{ margin: 1}}
                    label="Sifra"
                    margin="normal"
                    name="sifra"
                    type="text"
                    value={proizvod.sifra}
                    disabled
                    fullWidth
                />
                <TextField
                    sx={{ margin: 1}}
                    label="Naziv"
                    margin="normal"
                    name="naziv"
                    type="text"
                    value={proizvod.naziv}
                    disabled
                    fullWidth
                />
                <TextField
                    sx={{ margin: 1}}
                    label="Jedinica mere"
                    margin="normal"
                    name="jedinicaMere"
                    type="text"
                    value={proizvod.jedinicaMere}
                    disabled
                    fullWidth
                />
                {!jmKomada ?
                <Container>
                    <Select
                        native
                        sx={{ margin: 1}}
                        name='nacinRacunanjaDuzineKomada'
                        value={stavkaKalkulacije.nacinRacunanjaDuzineKomada}
                        onChange={handleInputChange}>
                        <option value={"UPISANO"}>Upisati</option>
                        <option value={"DUZINA"}>Duzina + razlika</option>
                        <option value={"VISINA"}>Visina + razlika</option>
                        <option value={"DUBINA"}>Dubina + razlika</option>
                    </Select>
                    <TextField
                        sx={{ margin: 1}}
                        label="Duzina"
                        margin="normal"
                        name="duzina"
                        type="number"
                        value={stavkaKalkulacije.duzina}
                        onChange={handleInputChange}
                        fullWidth
                    />
                    <TextField
                        sx={{ margin: 1}}
                        label="Razlika duzine"
                        margin="normal"
                        name="razlikaDuzine"
                        type="number"
                        value={stavkaKalkulacije.razlikaDuzine}
                        onChange={handleInputChange}
                        fullWidth
                    />
                </Container>
                : null
                }



                <Container elevation={3}>
                    <Select
                        sx={{ margin: 1}}
                        native
                        name='nacinRacunanjaKomada'
                        value={stavkaKalkulacije.nacinRacunanjaKomada}
                        onChange={handleInputChange}>
                        <option value={"KOMAD"}>Komad</option>
                        <option value={"PO_DUZNOM_METRU"}>Po duzini na svakih</option>
                        <option value={"PO_VISINSKOM_METRU"}>Po visini na svakih</option>
                        <option value={"PO_DUBINSKOM_METRU"}>Po dubini na svakih</option>
                    </Select>
                    <TextField
                        sx={{ margin: 1}}
                        label="Multiplikator"
                        margin="normal"
                        name="multiplikator"
                        type="number"
                        value={stavkaKalkulacije.multiplikator}
                        onChange={handleInputChange}
                        fullWidth
                        defaultValue={1}
                    />
                    <TextField
                        sx={{ margin: 1}}
                        label="Rucni dodatak"
                        margin="normal"
                        name="rucniDodatak"
                        type="number"
                        value={stavkaKalkulacije.rucniDodatak}
                        onChange={handleInputChange}
                        fullWidth
                        defaultValue={0}
                    />
                </Container>

                    
                </Container>
                : null

            }


        </DialogContent>

        <DialogActions>
            <Button onClick={handleClose}>Odustani</Button>
            <Button onClick={() => {addStavka(stavkaKalkulacije); handleClose()}}>Dodaj</Button>
        </DialogActions>
    </Dialog>
    </>
  )
}
