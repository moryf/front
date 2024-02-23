import { Button, Dialog, DialogContent, TextField ,DialogTitle} from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import React from 'react'
import { findProizvodyBySifraAndNaziv } from '../../../api/apiFunctions/ApiFunctions'

function PretragaProizvodaDialog({setProizvodState}) {
    const [selectionModel, setSelectionModel] = React.useState([]);


    const [open, setOpen] = React.useState(false);
    const[proizvod, setProizvod] = React.useState({
        sifra: '',
        naziv: ''
    });
    const handleClickOpen = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    }
    const [proizvodi, setProizvodi] = React.useState([]);
    const[flattenedProizvodi, setFlattenedProizvodi] = React.useState([]);

    async function pretraziProizvode() {
        const proizvodiResult = await findProizvodyBySifraAndNaziv(proizvod.sifra, proizvod.naziv);
        console.log(proizvodiResult);
        setProizvodi(proizvodiResult);
        setFlattenedProizvodi(proizvodiResult.map(proizvod => ({
            ...proizvod,
            ...proizvod.jedinicaMere,
            jedinicaMereId: proizvod.jedinicaMere
        })));
    }

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setProizvod(prevState => ({
            ...prevState,
            [name]: value
        }));
        if (proizvod.naziv.length>2 || proizvod.sifra.length>2) {
            pretraziProizvode();
        }
    }


  return (
    <>
    <Button onClick={handleClickOpen} variant="contained" color="primary">Pretraga proizvoda</Button>
    <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Pretraga proizvoda</DialogTitle>
        <DialogContent>
            <TextField
                sx={{ margin: 1}}
                label="Naziv"
                margin="normal"
                name="naziv"
                type="text"
                value={proizvod.naziv}
                onChange={handleInputChange}
            />
            <TextField
                sx={{ margin: 1}}
                label="Sifra"
                margin="normal"
                name="sifra"
                type="text"
                value={proizvod.sifra}
                onChange={handleInputChange}
            />
        </DialogContent>
        <DialogContent>
            <DataGrid
                rows={flattenedProizvodi}
                columns={[
                    { field: 'sifra', headerName: 'Sifra', width: 100 },
                    { field: 'naziv', headerName: 'Naziv', width: 100 },
                    { field: 'tipProizvoda', headerName: 'Tip proizvoda', width: 100 },
                    { field: 'jedinicaMere', headerName: 'Jedinica mere', width: 100 }
                ]}
                autoHeight
                pageSize={5}
                rowsPerPageOptions={[5]}
                sx={{ width: '100%', height: '100%' }}
                getRowId={(row) => {
                    return row.sifra;
                }
                }
                checkboxSelection
                rowSelectionModel={selectionModel}
                onRowSelectionModelChange={(newSelectionModel) => {
                    console.log(newSelectionModel);
                    setSelectionModel(newSelectionModel);
                    setProizvodState(proizvodi.find(proizvod => proizvod.sifra === newSelectionModel[0]));
                    handleClose();
                }}
            />
        </DialogContent>
    </Dialog>
    </>
  )
}

export default PretragaProizvodaDialog