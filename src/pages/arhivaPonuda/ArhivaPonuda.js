import React from 'react'
import { prihvacenePonude, odbijenePonude } from '../../api/apiFunctions/ApiFunctions';
import { useEffect, useState } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';


function ArhivaPonuda() {
    const [prihvacene, setPrihvacene] = useState([]);
    const [odbijene, setOdbijene] = useState([]);

    const columns = [
        { field: 'id', headerName: 'Ponuda ID', width:100 },
        { field: 'naziv', headerName: 'Naziv', width:100 },
        { field: 'kupacId', headerName: 'Kupac ID', width:100 },
        { field: 'imeIPrezime', headerName: 'Ime i prezime', width:100 },
        { field: 'adresa', headerName: 'Adresa', width:100 },
        { field: 'brojTelefona', headerName: 'Broj telefona', width:100 },
        { field: 'email', headerName: 'Email', width:100 },
        { field: 'datumOtvaranja', headerName: 'Datum otvaranja', width:100 },
        { field: 'rokPonude', headerName: 'Rok ponude', width:100 },
        { field: 'status', headerName: 'Status', width:100 },
        { field: 'opis', headerName: 'Opis', width:100 }
    ];

    async function fetchData() {
        try {
            const prihvaceneData = await prihvacenePonude();

            const flattenedPonude = prihvaceneData.map(ponuda => ({
                ...ponuda.kupac,
                ...ponuda, // Spread the kupac object attributes as top-level attributes
                kupacId: ponuda.kupac.id, // Rename kupac.id to avoid conflicts
                datumOtvaranja: new Date(ponuda.datumOtvaranja).toLocaleDateString(), // Parse date to readable format
                rokPonude: new Date(ponuda.rokPonude).toLocaleDateString() // Parse date to readable format
            }));


            setPrihvacene(flattenedPonude);
            const odbijeneData = await odbijenePonude();

            const flattenedOdbijene = odbijeneData.map(ponuda => ({
                ...ponuda.kupac,
                ...ponuda, // Spread the kupac object attributes as top-level attributes
                kupacId: ponuda.kupac.id, // Rename kupac.id to avoid conflicts
                datumOtvaranja: new Date(ponuda.datumOtvaranja).toLocaleDateString(), // Parse date to readable format
                rokPonude: new Date(ponuda.rokPonude).toLocaleDateString() // Parse date to readable format
            }));
            setOdbijene(flattenedOdbijene);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchData();
    }
    , []);


  return (
    <>
        <h1>Prihvacene Ponude</h1>
        <div style={{ width: "100%"}}>
                    <DataGrid
                    onRowDoubleClick={(row) => {
                        window.location.href = `/ponuda/${row.id}`; // Redirect to the ponuda page when a row is double-clicked
                    }
                    }
                        rows={prihvacene}
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
        <h1>Odbijene ponude</h1>
        <div style={{ width: "100%"}}>
                    <DataGrid
                    onRowDoubleClick={(row) => {
                        window.location.href = `/ponuda/${row.id}`; // Redirect to the ponuda page when a row is double-clicked
                    }
                    }
                        rows={odbijene}
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
    </>
  )
}

export default ArhivaPonuda