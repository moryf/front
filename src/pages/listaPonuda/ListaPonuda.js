import React, { useEffect, useState } from 'react';
import { getAllPonude, nezavrsenePonude } from '../../api/apiFunctions/ApiFunctions';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import NovaPonudaDialog from '../../components/novaPonudaDialog/NovaPonudaDialog';

function ListaPonuda() {
    const [ponude, setPonude] = useState([]);

    async function preuzmiPonude() {
        const ponudeResult = await nezavrsenePonude();
        console.log(ponudeResult);
        // Flatten the structure of the ponude data and parse dates
        const flattenedPonude = ponudeResult.map(ponuda => ({
            ...ponuda.kupac,
            ...ponuda, // Spread the kupac object attributes as top-level attributes
            kupacId: ponuda.kupac.id, // Rename kupac.id to avoid conflicts
            datumOtvaranja: new Date(ponuda.datumOtvaranja).toLocaleDateString(), // Parse date to readable format
            rokPonude: new Date(ponuda.rokPonude).toLocaleDateString() // Parse date to readable format
        }));
        setPonude(flattenedPonude);
    }

    useEffect(() => {
        preuzmiPonude();
    }, []);

    // Define columns manually
    const columns = [
        { field: 'id', headerName: 'Ponuda ID', width:50 },
        { field: 'naziv', headerName: 'Naziv', width:100 },
        { field: 'kupacId', headerName: 'Kupac ID', width:50 },
        { field: 'imeIPrezime', headerName: 'Ime i prezime', width:100 },
        { field: 'adresa', headerName: 'Adresa', width:100 },
        { field: 'brojTelefona', headerName: 'Broj telefona', width:100 },
        { field: 'email', headerName: 'Email', width:100 },
        { field: 'datumOtvaranja', headerName: 'Datum otvaranja', width:100 },
        { field: 'rokPonude', headerName: 'Rok ponude', width:100 },
        { field: 'status', headerName: 'Status', width:150 },
        { field: 'opis', headerName: 'Opis', width:150 }
    ];

    return (
        <>
            <h1>Upiti</h1>
            <div style={{ width: "100%"}}>
                <DataGrid
                onRowDoubleClick={(row) => {
                    window.location.href = `/ponuda/${row.id}`; // Redirect to the ponuda page when a row is double-clicked
                }
                }
                    rows={ponude}
                    columns={columns}
                    components={{
                        Toolbar: GridToolbar // Add toolbar to the DataGrid
                    }}
                    autoHeight
                    pageSize={5}
                    rowsPerPageOptions={[1]}
                    sx={{ width: '100%', height: '100%'}}
                />
            </div>
            <NovaPonudaDialog/>
        </>
    );
}

export default ListaPonuda;
