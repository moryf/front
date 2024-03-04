import { Button, Dialog, DialogActions, DialogContentText, Paper, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'

import { getPonuda,getAllProizvodiPonudeForPonuda,getKalkulacijaByPonudaId } from '../../api/apiFunctions/ApiFunctions'
import { ponudaTemplate } from '../../api/josnTemplates/JSONTemplates'
import { DataGrid } from '@mui/x-data-grid'

function NapraviKompletnuPonudu({ponudaId}) {

    
      


    const [open, setOpen] = React.useState(false);
    const hancleCLickOpen = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    }

    const[ponuda,setPonuda] = React.useState(ponudaTemplate)
    const[proizvodiPonude,setProizvodiPonude] = React.useState([])
    const[kalkulacije,setKalkulacije] = React.useState([])

    const[ukupnaCenaPonudeBezPdv,setUkupnaCenaPonudeBezPdv] = React.useState(0)
    const[ukupnaCenaPonudeSaPdv,setUkupnaCenaPonudeSaPdv] = React.useState(0)

    async function fetchPonuda(){
        const response = await getPonuda(ponudaId)
        setPonuda(response)
    }

    async function fetchProizvodiPonude(){
        const response = await getAllProizvodiPonudeForPonuda(ponudaId)
        setProizvodiPonude(response)
    }

    async function fetchKalkulacije(){
        const kalkulacije = await getKalkulacijaByPonudaId(ponudaId)
        setKalkulacije(kalkulacije)
    }

    useEffect(() => {
        fetchPonuda()
        fetchProizvodiPonude()
        fetchKalkulacije()
    }, [])

    const [rowselectionModels, setRowSelectionModels] = React.useState([]);



    useEffect(() => {

        let ukupnaCenaBezPdv = 0
        let ukupnaCenaSaPdv = 0

        for (const [key, value] of Object.entries(rowselectionModels)) {
            if(value.length>0){
                value.forEach((kalkulacijaId) => {
                    const kalkulacija = kalkulacije.find(kalkulacija => kalkulacija.id === kalkulacijaId)
                    ukupnaCenaBezPdv += kalkulacija.ukupnoBezPdv
                    ukupnaCenaSaPdv += kalkulacija.ukupnoSaPdv
                    setUkupnaCenaPonudeBezPdv(ukupnaCenaBezPdv)
                    setUkupnaCenaPonudeSaPdv(ukupnaCenaSaPdv)
                })
            }
        }
    }, [rowselectionModels])

    const napraviPonudu = () => {
        console.log('Napravi ponudu')
        for (const [key, value] of Object.entries(rowselectionModels)) {
            if(value.length>1){
                alert('Mozete izabrati samo jednu kalkulaciju po proizvodu')
                return;
            }
            if(value.length===0){
                alert('Morate izabrati kalkulaciju za svaki proizvod')
                return;
            }
            
        }

        let kalkulacijeZaPonudu = []
        for (const [key, value] of Object.entries(rowselectionModels)) {
            value.forEach((kalkulacijaId) => {
                kalkulacijeZaPonudu.push(kalkulacijaId)
            })
        }
        


    }







    if(ponuda === ponudaTemplate || proizvodiPonude===null || kalkulacije===null){
        return <div>Loading...</div>
    }

    

  return (
    <>
        <Button onClick={hancleCLickOpen} variant="contained" color="primary" sx={{margin: 2}}>Napravi kompletnu ponudu</Button>
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Napravi kompletnu ponudu</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Izaberite kalkulacije za svaki pproizvod Ponude
                </DialogContentText>
                <Typography variant="h6">Ponuda: {ponuda.naziv}</Typography>
                <Typography variant="h6">Datum: {new Date(ponuda.datumOtvaranja).toLocaleDateString()}</Typography>
                <Typography variant="h6">Klijent: {ponuda.kupac.imeIPrezime}</Typography>
                <Typography variant="h6">Proizvodi:</Typography>
                {proizvodiPonude.map((proizvodPonude) => {
                    return(
                        <Paper elevation={3} sx={{padding: 2, margin: 2}}>
                            <Typography variant="h6">{proizvodPonude.naziv}</Typography>
                            <Typography variant="h6">Ukupno komada: {proizvodPonude.ukupnoKomada}</Typography>
                            <DataGrid
                                rows={kalkulacije.filter(kalkulacija => kalkulacija.proizvodPonuda.id === proizvodPonude.id)}
                                columns={[
                                    {field: 'id', headerName: 'ID', width: 70},
                                    {field: 'naziv', headerName: 'Naziv', width: 200},
                                    {field: 'ukupnoBezPdv', headerName: 'Bez PDV-a', width: 200},
                                    {field: 'ukupnoSaPdv', headerName: 'Sa PDV-om', width: 200},
                                ]}
                                pageSize={5}
                                checkboxSelection
                                rowSelectionModel={rowselectionModels[proizvodPonude.id]}
                                onRowSelectionModelChange={(newSelection) => {
                                    setRowSelectionModels({
                                        ...rowselectionModels,
                                        [proizvodPonude.id]: newSelection,
                                    });

                                
                                }
                                }
                            />
                        </Paper>
                    )
                })}

                <Typography variant="h6">Ukupna cena bez PDV-a: {ukupnaCenaPonudeBezPdv.toFixed(2)}</Typography>
                <Typography variant="h6">Ukupna cena sa PDV-om: {ukupnaCenaPonudeSaPdv.toFixed(2)}</Typography>

                
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">Zatvori</Button>
                <Button onClick={napraviPonudu} color="primary">Napravi ponudu</Button>
            </DialogActions>
        </Dialog>    
    </>
  )
}

export default NapraviKompletnuPonudu