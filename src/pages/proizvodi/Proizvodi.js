import { Button, Container, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { getAllProizvodi } from '../../api/apiFunctions/ApiFunctions'
import { DataGrid } from '@mui/x-data-grid'
import IzmeniProizvodDialog from '../../components/izmeniProizvodDialog/IzmeniProizvodDialog'
import { proizvodTemplate } from '../../api/josnTemplates/JSONTemplates'

function Proizvodi() {
    const [proizvodi, setProizvodi] = useState([])

    const [open, setOpen] = useState(false)
    const [proizvod, setProizvod] = useState(proizvodTemplate)
    const handleClose = () => {
        setOpen(false)
    }


    async function preuzmiProizvode() {
        const proizvodiResult = await getAllProizvodi()
        setProizvodi(proizvodiResult)
    }


    

    useEffect(() => {
        preuzmiProizvode()
    }
    , [])

    if(proizvodi.length === 0) {
        return (
            <div>
                <Typography variant='h1'>Loading...</Typography>
            </div>
        )
    }


  return (
    <Container maxWidth="xl">
    <Typography variant='h1'>Proizvodi</Typography>
    <DataGrid
    rows={proizvodi}
    columns={
        [
            {field:'sifra', headerName:'Šifra', width: 100},
            {field:'naziv', headerName:'Naziv', width: 150},
            {field:'opis', headerName:'Opis', width: 200},
            {field:'jedinicaMere', headerName:'Jedinica mere', width: 100},
            {field:'masa', headerName:'Masa', width: 75},
            {field:'specificnaPovrsina', headerName:'Specifična površina', width: 75},
            {field:'cenaA', headerName:'Cena A', width: 100},
            {field:'veleprodajnaCena', headerName:'Veleprodajna cena', width: 100},
            {field:'izmeni', headerName:'Izmeni', width: 150, renderCell: (params) => {
                    return (
                        <Button color='primary' variant='outlined' onClick={
                            () => {
                                setProizvod(params.row)
                                setOpen(true)
                            }
                        }>Izmeni</Button>
                    )
                }
            }
        ]
    }
    initialState={{pagination:{paginationModel:{pageSize: 25}}}}
    pageSize={10}
    pageSizeOptions={[25,50,100]}
    getRowId={(row) => row.sifra}
    />
    <IzmeniProizvodDialog open={open} handleClose={handleClose} proizvod={proizvod}/>
    
    </Container>
  )
}

export default Proizvodi