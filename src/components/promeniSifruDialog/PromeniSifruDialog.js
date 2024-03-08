import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material'
import React from 'react'
import { promeniSifruKorisnika } from '../../api/apiFunctions/ApiFunctions';

function PromeniSifruDialog() {

    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
        setOpen(false);
    }

    const handleOpen = () => {
        setOpen(true);
    }

    const [staraSifra, setStaraSifra] = React.useState('');
    const [novaSifra, setNovaSifra] = React.useState('');
    const [potvrdiNovaSifra, setPotvrdiNovaSifra] = React.useState('');


    async function promeniSifru(){
        if(novaSifra !== potvrdiNovaSifra){
            alert("Nove sifre se ne poklapaju");
            return;
        }
        const response = await promeniSifruKorisnika( staraSifra, novaSifra);
        sessionStorage.setItem('korisnik', JSON.stringify(response));
    }


  return (
    <>
    <Button onClick={handleOpen}>Promeni sifru</Button>
    <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Promeni sifru</DialogTitle>
        <DialogContent>
            <TextField
                fullWidth
                label="Stara sifra"
                margin="normal"
                name="staraSifra"
                type='password'
                onChange={(e) => {
                    setStaraSifra(e.target.value)
                
                }}
            />
            <TextField
                fullWidth
                label="Nova sifra"
                margin="normal"
                name="novaSifra"
                type='password'
                onChange={(e) => {
                    setNovaSifra(e.target.value)
                }}
            />
            <TextField
                fullWidth
                label="Potvrdi novu sifru"
                margin="normal"
                name="potvrdiNovaSifra"
                type='password'
                onChange={(e) => {
                    setPotvrdiNovaSifra(e.target.value)
                }}
            />
        </DialogContent>
        <DialogActions>
            <Button onClick={promeniSifru}>Promeni sifru</Button>
        </DialogActions>
    </Dialog>
    
    </>
   
  )
}

export default PromeniSifruDialog