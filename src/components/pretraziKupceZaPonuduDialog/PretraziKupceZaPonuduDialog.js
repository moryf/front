import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, TableContainer, Paper } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { findKupacByImeAndBrojTelefona } from '../../api/apiFunctions/ApiFunctions';

function PretraziKupceZaPonuduDialog({ setKupacState }) {
    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'imeIPrezime', headerName: 'Ime i prezime', width: 130 },
        { field: 'brojTelefona', headerName: 'Broj telefona', width: 130 },
        { field: 'adresa', headerName: 'Adresa', width: 130 },
        { field: 'email', headerName: 'Email', width: 130 },
    ];

    const [kupci, setKupci] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedKupac, setSelectedKupac] = useState(null);
    const [rowSelectionModel, setRowSelectionModel] = React.useState([]);

    const onClose = () => {
        setOpen(false);
    }

    const onOpen = () => {
        setOpen(true);
    }

    async function pretraziKupce() {
        const imeIPrezime = document.getElementById('imeIPrezimePretraga').value;
        const brojTelefona = document.getElementById('brojTelefonaPretraga').value;
        if(imeIPrezime.length<3 && brojTelefona.length<3){
            return
        }
        const kupciResult = await findKupacByImeAndBrojTelefona(imeIPrezime, brojTelefona);
        setKupci(kupciResult);
    }

    const handleIzaberi = () =>{
        if(rowSelectionModel.length>1){
            alert("Izabrali ste vise od jednog kupca")
            return
        }
        else{
            setKupacState(kupci.find(kupac => kupac.id === rowSelectionModel[0]))
            onClose();
        }
    }

    return (
        <>
            <Button onClick={onOpen}>
                Postojeci Kupac
            </Button>
            <Dialog
                open={open}
                onClose={onClose}
                sx={{ minWidth: 650 }}
            >
                <DialogTitle>
                    Pretrazi kupce
                </DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        id="imeIPrezimePretraga"
                        label="Ime i prezime"
                        type="text"
                        fullWidth
                        onChange={pretraziKupce}
                    />
                    <TextField
                        margin="dense"
                        id="brojTelefonaPretraga"
                        label="Broj telefona"
                        type="text"
                        fullWidth
                        onChange={pretraziKupce}
                    />
                </DialogContent>
                <TableContainer component={Paper}>
                    <DataGrid
                        rows={kupci}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        autoHeight
                        checkboxSelection
                        onRowSelectionModelChange={(newRowSelectionModel) => {
                            setRowSelectionModel(newRowSelectionModel);
                          }}
                        rowSelectionModel={rowSelectionModel}
                    />
                </TableContainer>
                <DialogActions>
                    <Button onClick={onClose}>Zatvori</Button>
                    <Button
                        onClick={handleIzaberi}
                    >
                        Izaberi
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default PretraziKupceZaPonuduDialog;
