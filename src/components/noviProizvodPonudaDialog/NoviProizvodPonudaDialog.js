import React, { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, DialogContentText, Select , TextField} from '@mui/material';
import './NoviProizvodPonudaDialog.css';
import { postProizvodPonuda,getAllTipoviProizvodaPonude } from '../../api/apiFunctions/ApiFunctions';
import { proizvodPonudaTemplate } from '../../api/josnTemplates/JSONTemplates';


const NoviProizvodPonudaDialog = ({ ponudaId }) => {

    const [open, setOpen] = useState(false);
    const [tipoviProizvodaPonude, setTipoviProizvodaPonude] = useState([]);

    const onClose = () => {
        setOpen(false);
        window.location.reload();
    }

    const onOpen = () => {
        setOpen(true);
    }

    async function handleSubmit(){
        const noviProizvodPonuda = { ...proizvodPonudaTemplate };
        noviProizvodPonuda.ponuda= null;
        noviProizvodPonuda.naziv = document.getElementById('naziv').value;
        
        const tipProizvodaId = document.getElementById('tipProizvodaPonuda').value;

        const tipProizvoda = tipoviProizvodaPonude.find((tipProizvodaPonuda) => tipProizvodaPonuda.id == tipProizvodaId);

        noviProizvodPonuda.tipProizvodaPonuda = tipProizvoda;
        noviProizvodPonuda.ukupnoMetara = document.getElementById('ukupnoMetara').value;
        noviProizvodPonuda.ukupnoKomada = document.getElementById('ukupnoKomada').value;
        noviProizvodPonuda.duzinaPoKomadu = document.getElementById('duzinaPoKomadu').value;
        noviProizvodPonuda.visinaPoKomadu = document.getElementById('visinaPoKomadu').value;
        noviProizvodPonuda.dubinaPoKomadu = document.getElementById('dubinaPoKomadu').value;
       console.log(noviProizvodPonuda);
       
        await postProizvodPonuda(noviProizvodPonuda, ponudaId);
        onClose();
    }

    async function fetchTipoviProizvodaPonude() {
        const data = await getAllTipoviProizvodaPonude();
        setTipoviProizvodaPonude(data);
    }

    useEffect(() => {
        fetchTipoviProizvodaPonude();
    }
    , []);

    if (tipoviProizvodaPonude.length === 0) {
        return <h1>Loading...</h1>
    }

    return (
        <>
    <button onClick={onOpen} className='novi-proizvod-ponuda'>Novi Proizvod</button>
    <Dialog
        open={open}
        onClose={onClose}
    >
        <DialogTitle id="form-dialog-title">Novi Prozvod za Ponudu</DialogTitle>
        <DialogContent>
            <DialogContentText>
                Unesite novi proizvod za ponudu
            </DialogContentText>
            <TextField
                autoFocus
                margin="dense"
                id="naziv"
                label="Naziv"
                type="text"
                fullWidth
            />
            <Select
                native
                id="tipProizvodaPonuda"
                fullWidth
            >
                {tipoviProizvodaPonude.map((tipProizvodaPonuda) => (
                    <option key={tipProizvodaPonuda.id} value={tipProizvodaPonuda.id}>{tipProizvodaPonuda.naziv}</option>
                ))}
            </Select>
            <TextField
                margin="dense"
                id="ukupnoMetara"
                label="Ukupno metara"
                type="number"
                fullWidth
            />
            <TextField
                margin="dense"
                id="ukupnoKomada"
                label="Ukupno komada"
                type="number"
                fullWidth
            />
            <TextField
                margin="dense"
                id="duzinaPoKomadu"
                label="Duzina po komadu"
                type="number"
                fullWidth
            />
            <TextField
                margin="dense"
                id="visinaPoKomadu"
                label="Visina po komadu"
                type="number"
                fullWidth
            />
            <TextField
                margin="dense"
                id="dubinaPoKomadu"
                label="Dubina po komadu"
                type="number"
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
    );
};

export default NoviProizvodPonudaDialog;
