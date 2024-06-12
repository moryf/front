import { Paper } from '@mui/material'
import React from 'react'
import { useState,useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { getPonudeByKupac, getKupacById } from '../../api/apiFunctions/ApiFunctions'

function Kupac() {
    const id = window.location.pathname.split('/')[2]
    console.log(id)

    const[ponude, setPonude] = useState([])
    const[kupac, setKupac] = useState({})

    const [ponudeFlat, setPonudeFlat] = useState([])


    /* flattened fileds     id: null,
    naziv: "",
    kupac: {
      id: null,
      imeIPrezime: "",
      adresa: "",
      brojTelefona: "",
      email: ""
    },
    datumOtvaranja: "",
    rokPonude: "",
    status: "",
    opis: "",
    otvorioPonudu:{
      id: null
    }*/
    const columns = [
        { field: 'id', headerName: 'ID', width: 100 },
        { field: 'naziv', headerName: 'Naziv', width: 250 },
        { field: 'datumOtvaranja', headerName: 'Datum otvaranja', width: 250 },
        { field: 'rokPonude', headerName: 'Rok ponude', width: 250 },
        { field: 'status', headerName: 'Status', width: 250 },
        { field: 'opis', headerName: 'Opis', width: 250 },
        { field: 'otvorioPonudu', headerName: 'Otvorio ponudu', width: 250 },
    ]

    async function fetchPonude(){
        try{
            const response = await getPonudeByKupac(id)
            setPonude(response)
            console.log(response)
            setPonudeFlat(response.map(ponuda => {
                return {
                    id: ponuda.id,
                    naziv: ponuda.naziv,
                    datumOtvaranja: ponuda.datumOtvaranja,
                    rokPonude: ponuda.rokPonude,
                    status: ponuda.status,
                    opis: ponuda.opis,
                    otvorioPonudu: ponuda.otvorioPonudu.ime
                }
            }))
        }catch(error){
            console.error('Došlo je do greške prilikom dohvatanja ponuda:', error)
        }
    }

    async function fetchKupac(){
        try{
            const response = await getKupacById(id)
            setKupac(response)
            console.log(response)
        }catch(error){
            console.error('Došlo je do greške prilikom dohvatanja kupca:', error)
        }
    }

    useEffect(() => {
        fetchPonude()
        fetchKupac()
    }, [])


  return (
    <>
        <Paper elevation={3} style={{padding: '20px', margin: '20px', width:"90%"}}>
            <h1>{kupac.imeIPrezime}</h1>
            <p>Adresa: {kupac.adresa}</p>
            <p>Broj telefona: {kupac.brojTelefona}</p>
            <p>Email: {kupac.email}</p>
        </Paper>
        <h1>Ponude</h1>
        <DataGrid
            rows={ponudeFlat}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            sx={{ width: '90%'}}
        />
    </>
  )
}

export default Kupac