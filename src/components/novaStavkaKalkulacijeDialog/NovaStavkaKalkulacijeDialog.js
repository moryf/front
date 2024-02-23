import { Button, Dialog, DialogContent, DialogTitle } from '@mui/material'
import React, { useState } from 'react'
import PretragaProizvodaDialog from './pretragaProizvodaDialog/PretragaProizvodaDialog'
import { proizvodTemplate } from '../../api/josnTemplates/JSONTemplates'


export default function NovaStavkaKalkulacijeDialog() {
    const[proizvod, setProizvod] = useState(proizvodTemplate);
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
        setProizvod(proizvod);
        console.log(proizvod);
        setStavkaKalkulacije(prevState => ({
            ...prevState,
            proizvod: proizvod
        }));
    }





  return (
    <>
    <Button variant="contained" color="primary" onClick={handleClickOpen}>Nova stavka kalkulacije</Button>
    <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Nova Stavka Kalkulacije</DialogTitle>
        <DialogContent>
            <PretragaProizvodaDialog setProizvodState={setProizvodState} />

        </DialogContent>
    </Dialog>
    </>
  )
}
