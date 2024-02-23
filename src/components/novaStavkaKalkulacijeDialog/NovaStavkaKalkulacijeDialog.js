import { Button, Dialog, DialogContent, DialogTitle, TextField , Paper, Container, DialogActions} from '@mui/material'
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
                {
                    jmKomada ?
                    <TextField
                        sx={{ margin: 1}}
                        label="Kolicina"
                        margin="normal"
                        name="kolicina"
                        type="number"
                        value={stavkaKalkulacije.kolicina}
                        fullWidth
                    />
                    : null
                }
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
