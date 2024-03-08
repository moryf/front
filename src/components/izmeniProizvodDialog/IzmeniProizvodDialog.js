import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { updateProizvod } from '../../api/apiFunctions/ApiFunctions'
import { proizvodTemplate } from '../../api/josnTemplates/JSONTemplates'

function IzmeniProizvodDialog({open, handleClose,proizvod}) {
    const [proizvodState, setProizvodState] = useState(proizvodTemplate)

    useEffect(() => {
        setProizvodState(proizvod)
    }
    , [proizvod])

    const handleSave = async () => {
        await updateProizvod(proizvodState)
        handleClose()
    }


  return (
    <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Izmeni proizvod</DialogTitle>
        <DialogContent>
            <TextField
            label='Šifra'
            value={proizvodState.sifra}
            fullWidth
            margin='normal'
            disabled
            />
            <TextField
            label='Naziv'
            defaultValue={proizvodState.naziv}
            fullWidth
            margin='normal'
            onChange={(e) => {
                proizvod.naziv = e.target.value
            }}
            />
            <TextField
            label='Opis'
            defaultValue={proizvodState.opis}
            fullWidth
            margin='normal'
            onChange={(e) => {
                proizvod.opis = e.target.value

            }}
            />
            <TextField
            label='Jedinica mere'
            defaultValue={proizvodState.jedinicaMere}
            fullWidth
            margin='normal'
            onChange={(e) => {
                proizvod.jedinicaMere = e.target.value
            }}
            />
            <TextField
            label='Masa'
            defaultValue={proizvodState.masa}
            fullWidth
            margin='normal'
            onChange={(e) => {
                proizvod.masa = e.target.value
            
            }}
            />
            <TextField
            label='Specifična površina'
            defaultValue={proizvodState.specificnaPovrsina}
            fullWidth
            margin='normal'
            onChange={(e) => {
                proizvod.specificnaPovrsina = e.target.value
            
            }}
            />
            <TextField
            label='Cena A'
            defaultValue={proizvodState.cenaA}
            fullWidth
            margin='normal'
            onChange={(e) => {
                proizvod.cenaA = e.target.value
            
            
            }}
            />
            <TextField
            label='Veleprodajna cena'
            defaultValue={proizvodState.veleprodajnaCena}
            fullWidth
            margin='normal'
            onChange={(e) => {
                proizvod.veleprodajnaCena = e.target.value
            }}
            />
        </DialogContent>
        <DialogActions>
            <Button color='secondary' onClick={handleClose}>Odustani</Button>
            <Button color='primary' onClick={handleSave}>Sačuvaj</Button>
        </DialogActions>
            
    </Dialog>
  )
}

export default IzmeniProizvodDialog