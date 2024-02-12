import React, { useEffect, useState } from 'react';
import { getAllPonude } from '../../api/apiFunctions/ApiFunctions';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

function ListaPonuda() {
    const [ponude, setPonude] = useState([]);

    async function preuzmiPonude() {
        const ponudeResult = await getAllPonude();
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
        { field: 'id', headerName: 'Ponuda ID', width: 150 },
        { field: 'naziv', headerName: 'Naziv', width: 150 },
        { field: 'kupacId', headerName: 'Kupac ID', width: 150 },
        { field: 'imeIPrezime', headerName: 'Ime i prezime', width: 150 },
        { field: 'adresa', headerName: 'Adresa', width: 150 },
        { field: 'brojTelefona', headerName: 'Broj telefona', width: 150 },
        { field: 'email', headerName: 'Email', width: 150 },
        { field: 'datumOtvaranja', headerName: 'Datum otvaranja', width: 150 },
        { field: 'rokPonude', headerName: 'Rok ponude', width: 150 },
        { field: 'status', headerName: 'Status', width: 150 },
        { field: 'opis', headerName: 'Opis', width: 150 }
    ];

    return (
        <>
            <h1>Ponude</h1>
            <div style={{ height: 400, width: "100%"}}>
                <DataGrid
                    rows={ponude}
                    columns={columns}
                    components={{
                        Toolbar: GridToolbar // Add toolbar to the DataGrid
                    }}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    autoHeight
                    columnVisibilityModel={{
                        columns: [
                            
                            'naziv',
                            'kupacId',
                            'imeIPrezime',
                            'adresa',
                            'brojTelefona',
                            'email',
                            'datumOtvaranja',
                            'rokPonude',
                            'status'
                        ],
                        // Hide the ID column by default
                        all: false,
                        id: true
                    }
                    }
                />
            </div>
        </>
    );
}

export default ListaPonuda;
