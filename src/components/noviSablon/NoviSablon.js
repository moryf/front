import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material'
import React from 'react'
import {noviSablon} from '../../api/apiFunctions/ApiFunctions'

function NoviSablon({idKalkulacije}) {
    const [open, setOpen] = React.useState(false);
    const [naziv, setNaziv] = React.useState('');

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNaziv(value);
    };

    const handleSave = () => {
        console.log(naziv);
        noviSablon(naziv, idKalkulacije);
        setOpen(false);
    };

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }



  return (
    <>
        <Button sx={{ margin: 2 }} variant="contained" color="primary" onClick={handleClickOpen}>Sacuvaj kao sablon</Button>
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Unesite naziv sablona</DialogTitle>
            <DialogContent>
                <TextField
                    sx={{ margin: 1}}
                    label = "Naziv sablona"
                    margin="normal"
                    name="nazivSablona"
                    type="text"
                    value={naziv}
                    onChange={handleInputChange}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Odustani</Button>
                <Button onClick={handleSave}>Sacuvaj</Button>
            </DialogActions>
        </Dialog>   
    </>
  )
}

export default NoviSablon