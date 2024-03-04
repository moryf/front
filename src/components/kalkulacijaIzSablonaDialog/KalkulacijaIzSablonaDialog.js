import { Button, Dialog, DialogContent, DialogTitle, TextField, DialogActions } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import React from 'react'
import { findSablonByNaziv,novaKalkulacijaIzSablona } from '../../api/apiFunctions/ApiFunctions';


function KalkulacijaIzSablonaDialog({idProizvodaPonude}) {
    const [open, setOpen] = React.useState(false);
    const [naziv, setNaziv] = React.useState('');
    const [sabloni, setSabloni] = React.useState([]);
    const [rowSelectionModel, setRowSelectionModel] = React.useState([]);

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'naziv', headerName: 'Naziv', width: 130 },
    ];

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNaziv(value);
        findSablonByNaziv(value).then(response => {
            setSabloni(response);
        });

    }

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleSave = () => {
        if(rowSelectionModel.length>1){
            alert("Izabrali ste vise od jednog sablona")
            return
        }
        else{
            console.log(rowSelectionModel[0]);
            novaKalkulacijaIzSablona(rowSelectionModel[0], idProizvodaPonude);
            setOpen(false);
        }
    }

    
  return (
    <>
        <Button sx={{ margin: 2 , backgroundColor:"var(--color-2-light-grey)", color:"black"}} variant="contained" onClick={handleClickOpen}>Kalkulacija iz sablona</Button>
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Odaberite sablon</DialogTitle>
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
            <DataGrid
                rows={sabloni}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
                disableSelectionOnClick
                onRowSelectionModelChange={(newRowSelectionModel) => {
                    setRowSelectionModel(newRowSelectionModel);
                  }}
                rowSelectionModel={rowSelectionModel}
            />
            <DialogActions>
                <Button onClick={handleClose}>Odustani</Button>
                <Button onClick={handleSave}>Sacuvaj</Button>
            </DialogActions>
        </Dialog>    
    </>
  )
}

export default KalkulacijaIzSablonaDialog