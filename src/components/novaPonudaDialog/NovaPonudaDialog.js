import { Dialog } from '@mui/material'
import React from 'react'
import { Button, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material'
import './NovaPonudaDialog.css'
import { postPonuda,postKupac } from '../../api/apiFunctions/ApiFunctions'
import { ponudaTemplate,kupacTemplate } from '../../api/josnTemplates/JSONTemplates'
import PretraziKupceZaPonuduDialog from '../pretraziKupceZaPonuduDialog/PretraziKupceZaPonuduDialog'

function NovaPonudaDialog() {
    const [open, setOpen] = React.useState(false);
    const [kupac,setKupac] = React.useState(kupacTemplate);


    function setKupacState(kupac){
        setKupac(kupac);
        document.getElementById('imeIPrezime').value=kupac.imeIPrezime;
        document.getElementById('adresa').value=kupac.adresa;
        document.getElementById('brojTelefona').value=kupac.brojTelefona;
        document.getElementById('email').value=kupac.email;
    }

    const onClose = () => {
        setOpen(false);
    }

    const onOpen = () => {
        setOpen(true);
    }

   async function handleSubmit(){
        let noviKupac = { ...kupacTemplate };
        if(kupac===kupacTemplate){
            noviKupac.imeIPrezime = document.getElementById('imeIPrezime').value;
            if(noviKupac.imeIPrezime==="" || noviKupac.imeIPrezime===null){
                alert("Ime i prezime mora biti popunjeno")
                return
            }
            noviKupac.adresa = document.getElementById('adresa').value;
            noviKupac.brojTelefona = document.getElementById('brojTelefona').value;
            noviKupac.email = document.getElementById('email').value;
            if(noviKupac.brojTelefona==="" || noviKupac.brojTelefona===null){
                alert("Broj telefona mora biti popunjen")
                return
            }
        }else{
            noviKupac=kupac
        }
        const novaPonuda = { ...ponudaTemplate };

        novaPonuda.status = "NOVA";
        novaPonuda.datumOtvaranja = new Date();
        novaPonuda.kupac = noviKupac;
        novaPonuda.rokPonude = document.getElementById('rokPonude').value;
        novaPonuda.opis = document.getElementById('opis').value;
        console.log(novaPonuda);
        await postPonuda(novaPonuda);
        window.location.reload();

    }


  return (
    <>
    <button onClick={onOpen} className='novi-upit'>+</button>
    <Dialog
        open={open}
        onClose={onClose}
    >
        <DialogTitle id="form-dialog-title">Nova ponuda</DialogTitle>
        <DialogContent>
            <DialogContentText>
                Unesite novu ponudu
            </DialogContentText>
            <PretraziKupceZaPonuduDialog setKupacState={setKupacState}/>
            <TextField
                margin="dense"
                id="imeIPrezime"
                label="Ime i prezime"
                type="text"
                fullWidth
            />
            <TextField
                margin="dense"
                id="adresa"
                label="Adresa"
                type="text"
                fullWidth

            />
            <TextField
                margin="dense"
                id="brojTelefona"
                label="Broj telefona"
                type="text"
                fullWidth
            />
            <TextField
                margin="dense"
                id="email"
                label="Email"
                type="email"
                fullWidth
            />
            <TextField
                margin="dense"
                id="rokPonude"
                label="Rok ponude"
                type="date"
                fullWidth
            />
            <TextField
                margin="dense"
                id="opis"
                label="Opis"
                type="text"
                fullWidth
            />

        </DialogContent>
        <DialogActions>
            <Button onClick={onClose} color="primary">
                Cancel
            </Button>
            <Button onClick={handleSubmit} color="primary">
                Submit
            </Button>
        </DialogActions>
    </Dialog>
    </>
  )
}

export default NovaPonudaDialog