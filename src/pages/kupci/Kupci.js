import React, { useEffect } from 'react'
import { getAllKupci } from '../../api/apiFunctions/ApiFunctions'
import { DataGrid } from '@mui/x-data-grid'
import { useState } from 'react'


function Kupci() {
    const [kupci, setKupci] = useState([])

    async function fetchKupci() {
        try {
            const response = await getAllKupci()
            setKupci(response)
            console.log(response)
        } catch (error) {
            console.error('Došlo je do greške prilikom dohvatanja kupaca:', error)
        }
    }

    useEffect(() => {
        fetchKupci()

    }
    , [])


    /* columns     id: null,
    imeIPrezime: "",
    adresa: "",
    brojTelefona: "",
    email: ""*/
    const columns = [
        { field: 'id', headerName: 'ID', width: 100 },
        { field: 'imeIPrezime', headerName: 'Ime i prezime', width: 250 },
        { field: 'adresa', headerName: 'Adresa', width: 250 },
        { field: 'brojTelefona', headerName: 'Broj telefona', width: 250 },
        { field: 'email', headerName: 'Email', width: 250 },
    ]



  return (
    <>
        <h1>Kupci</h1>
        <DataGrid
            rows={kupci}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            sx={{ width: '90%'}}
        />
    </>
  )
}

export default Kupci