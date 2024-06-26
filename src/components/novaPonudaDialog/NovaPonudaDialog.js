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
        novaPonuda.otvorioPonudu.id = JSON.parse(sessionStorage.getItem('korisnik')).id;
        console.log(novaPonuda);
        await postPonuda(novaPonuda)
        onClose()
        

    }


  return (
    <>
    <button onClick={onOpen} className='novi-upit'>+</button>
    <Dialog
        open={open}
        onClose={onClose}
        id='nova-ponuda-dialog'
    >
        <DialogTitle id="form-dialog-title">Novi upit</DialogTitle>
        <DialogContent>
            <PretraziKupceZaPonuduDialog setKupacState={setKupacState}/>
            <TextField
                margin="dense"
                id="imeIPrezime"
                label="Ime i prezime"
                type="text"
                fullWidth
                value={kupac.imeIPrezime}
                onChange={
                    (event) => {
                        const { value } = event.target;
                        setKupac(prevState => ({
                            ...prevState,
                            imeIPrezime: value
                        }));
                    }
                }
            />
            <TextField
                margin="dense"
                id="adresa"
                label="Adresa"
                type="text"
                fullWidth
                value={kupac.adresa}
                onChange={
                    (event) => {
                        const { value } = event.target;
                        setKupac(prevState => ({
                            ...prevState,
                            adresa: value
                        }));
                    }
                }

            />
            <TextField
                margin="dense"
                id="brojTelefona"
                label="Broj telefona"
                type="text"
                fullWidth
                value={kupac.brojTelefona}
                onChange={
                    (event) => {
                        const { value } = event.target;
                        setKupac(prevState => ({
                            ...prevState,
                            brojTelefona: value
                        }));
                    }
                }
            />
            <TextField
                margin="dense"
                id="email"
                label="Email"
                type="email"
                fullWidth
                value={kupac.email}
                onChange={
                    (event) => {
                        const { value } = event.target;
                        setKupac(prevState => ({
                            ...prevState,
                            email: value
                        }));
                    }
                }
            />
            <TextField
                margin="dense"
                id="rokPonude"
                label="Rok ponude"
                type="date"
                defaultValue={new Date().toISOString().split('T')[0]}
                fullWidth
            />
            <TextField
                margin="dense"
                id="opis"
                label="Opis"
                type="text"
                fullWidth
                rows={4}
                multiline
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