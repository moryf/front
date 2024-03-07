import { Typography } from '@mui/material'
import React from 'react'
import { useState } from 'react'
import { getAllProizvodi } from '../../api/apiFunctions/ApiFunctions'
import { DataGrid } from '@mui/x-data-grid'

function Proizvodi() {
    const [proizvodi, setProizvodi] = useState([])


    async function preuzmiProizvode() {
        const proizvodiResult = await getAllProizvodi()
        setProizvodi(proizvodiResult)
    }


    if(proizvodi.length === 0) {
        return (
            <div>
                <Typography variant='h1'>Loading...</Typography>
            </div>
        )
    }



  return (
    <>
    <Typography variant='h1'>Proizvodi</Typography>
    <DataGrid
    rows={proizvodi}
    columns={
        [
            {field: 'id', headerName: 'ID', width: 100},
            {field: 'naziv', headerName: 'Naziv', width: 200},
            {field: 'cena', headerName: 'Cena', width: 200},
            {field: 'kolicina', headerName: 'Kolicina', width: 200},
        ]
    }
    pageSize={10}
    rowsPerPageOptions={[10]}
    checkboxSelection
    autoHeight
    />
    
    </>
  )
}

export default Proizvodi