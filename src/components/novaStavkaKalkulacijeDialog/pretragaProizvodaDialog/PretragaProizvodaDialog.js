import { Button, Dialog, DialogContent, TextField ,DialogTitle} from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import React from 'react'
import { findProizvodyBySifraAndNaziv } from '../../../api/apiFunctions/ApiFunctions'

function PretragaProizvodaDialog({setProizvodState}) {
    const [selectionModel, setSelectionModel] = React.useState([]);


    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
        setSelectionModel([]);
    }
    const handleClose = () => {
        setOpen(false);
    }
    const [proizvodi, setProizvodi] = React.useState([]);
    const[flattenedProizvodi, setFlattenedProizvodi] = React.useState([]);

    async function pretraziProizvode(sifra, naziv, opis) {
        const proizvodiResult = await findProizvodyBySifraAndNaziv(sifra, naziv, opis);
        console.log(proizvodiResult);
        setProizvodi(proizvodiResult);
        setFlattenedProizvodi(proizvodiResult.map(proizvod => ({
            ...proizvod,
            ...proizvod.jedinicaMere,
            jedinicaMereId: proizvod.jedinicaMere
        })));
    }

    const handleInputChange = (event) => {
        const sifra = document.getElementsByName("sifraProizvoda")[0].value;
        const naziv = document.getElementsByName("nazivProizvoda")[0].value;
        const opis = document.getElementsByName("opisProizvoda")[0].value;
        if(sifra.length>2 || naziv.length>2){
            pretraziProizvode(sifra, naziv,opis);
        }
    }


  return (
    <>
    <Button sx={{margin:"10px"}} onClick={handleClickOpen} variant="contained" color="primary">Pretraga proizvoda</Button>
    <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Pretraga proizvoda</DialogTitle>
        <DialogContent >
            <TextField
                sx={{ margin: 1}}
                label="Naziv"
                margin="normal"
                name="nazivProizvoda"
                type="text"
                onChange={handleInputChange}
            />
            <TextField
                sx={{ margin: 1}}
                label="Opis"
                margin="normal"
                name="opisProizvoda"
                type="text"
                onChange={handleInputChange}
            />
            <TextField
                sx={{ margin: 1}}
                label="Sifra"
                margin="normal"
                name="sifraProizvoda"
                type="text"
                onChange={handleInputChange}
            />
        </DialogContent>
        <DialogContent>
            <DataGrid
                rows={flattenedProizvodi}
                columns={[
                    { field: 'sifra', headerName: 'Sifra', width: 100 },
                    { field: 'naziv', headerName: 'Naziv', width: 100 },
                    { field: 'opis', headerName: 'Opis', width: 150, flex: 1},
                    { field: 'jedinicaMere', headerName: 'Jedinica mere', width: 100 }
                ]}
                autoHeight
                pageSize={5}
                pagination
                paginationMode='server'
                rowsPerPageOptions={[5]}
                sx={{ width: '100%', height: '100%', margin: '10px'}}
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