import { Button, Dialog, DialogContent, DialogTitle, TextField , Paper, Container, DialogActions, Select} from '@mui/material'
import React, { useState } from 'react'
import PretragaProizvodaDialog from './pretragaProizvodaDialog/PretragaProizvodaDialog'
import { proizvodTemplate } from '../../api/josnTemplates/JSONTemplates'


export default function NovaStavkaKalkulacijeDialog({addStavka}) {
    const[proizvod, setProizvod] = useState(proizvodTemplate);
    const [proizvodLoaded, setProizvodLoaded] = useState(false);

    const [jmKomada, setJmKomada] = useState(false);

    const[stavkaKalkulacije, setStavkaKalkulacije] = useState({
        kolicina: 0,
        cena: 0,
        proizvod: proizvod
    });

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
        }
    }


    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setStavkaKalkulacije(prevState => ({
            ...prevState,
            [name]: value
        }));
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
