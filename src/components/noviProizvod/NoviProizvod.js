import { Button, Dialog, DialogActions, DialogContent, DialogTitle,FormControl,FormControlLabel,Select,Switch,TextField } from '@mui/material'
import React from 'react'
import { proizvodTemplate } from '../../api/josnTemplates/JSONTemplates'
import { saveProizvod } from '../../api/apiFunctions/ApiFunctions'

function NoviProizvod({setProizvodState}) {
    const [open, setOpen] = React.useState(false)
    const handleClickOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }

    const [proizvod, setProizvod] = React.useState(proizvodTemplate)

    const[upisatiCenu,setUpisatiCenu]=React.useState(true)

    async function handleSave(){
        const newProizvod = await saveProizvod(proizvod)
        setProizvodState(newProizvod)
        setOpen(false)
    }


  return (
    <>
    <Button sx={{margin:"10px"}} variant="contained" color="primary" onClick={handleClickOpen} >Novi Proizvod</Button>
    <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Novi Proizvod</DialogTitle>
        <DialogContent>
            <TextField
            margin='dense'
                label="Naziv"
                value={proizvod.naziv}
                onChange={(e) => setProizvod({...proizvod, naziv: e.target.value})}
                fullWidth
            />
            <TextField
            margin='dense'
                label="Opis"
                value={proizvod.opis}
                onChange={(e) => setProizvod({...proizvod, opis: e.target.value})}
                fullWidth
            />
            <Select
            margin='dense'
                label="Jedinica mere"
                value={proizvod.jedinicaMere}
                onChange={(e) => setProizvod({...proizvod, jedinicaMere: e.target.value})}
                fullWidth
                native
            >
                <option value="METAR">Metar</option>
                <option value="KOMAD">Komad</option>
            </Select>

            <TextField
            margin='dense'
                label="Masa"
                value={proizvod.masa}
                onChange={(e) => setProizvod({...proizvod, masa: e.target.value})}
                fullWidth
            />
            <TextField
            margin='dense'
                label="Specifična površina"
                value={proizvod.specificnaPovrsina}
                onChange={(e) => setProizvod({...proizvod, specificnaPovrsina: e.target.value})}
                fullWidth
            />

            <FormControlLabel
                control={<Switch checked={upisatiCenu} onChange={(e) => setUpisatiCenu(e.target.checked)} />}
                label="Upisati cenu"
            />

            {upisatiCenu && (
                <>
                <TextField
                    margin='dense'
                        label="Cena A"
                        value={proizvod.cenaA}
                        onChange={(e) => setProizvod({...proizvod, cenaA: e.target.value})}
                        fullWidth
                    />
                    <TextField
                    margin='dense'
                        label="Veleprodajna cena"
                        value={proizvod.veleprodajnaCena}
                        onChange={(e) => setProizvod({...proizvod, veleprodajnaCena: e.target.value})}
                        fullWidth
                    />
                </>
            )}

            
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose}>Otkaži</Button>
            <Button onClick={handleSave}>Sačuvaj</Button>
        </DialogActions>
    </Dialog>
    </>
  )
}

export default NoviProizvod