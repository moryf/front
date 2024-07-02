import { Typography } from '@mui/material'
import React from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { getSablon, getKalkulacija, getStavkeKalkulacijeByKalkulacijaId } from '../../../api/apiFunctions/ApiFunctions'

function Sablon() {
    const id = parseInt(window.location.href.split('/').pop())
    console.log(id)

    const [sablon, setSablon] = React.useState({})
    const [kalkulacija, setKalkulacija] = React.useState({})
    const [stavke, setStavke] = React.useState([])
    const [flatStavke, setFlatStavke] = React.useState([{}])

    async function fetchSablon() {
        const response = await getSablon(id)
        setSablon(response)
        console.log(response)
        setKalkulacija(response.kalkulacija)
        fetchStavke(response.kalkulacija.id)
    }

    async function fetchStavke(kalkulacijaId) {
        const response = await getStavkeKalkulacijeByKalkulacijaId(kalkulacijaId)
        setStavke(response)
        console.log(response)
        setFlatStavke(response.map(stavka => {
            return {
                ...stavka,
                nazivProizvoda: stavka.proizvod.naziv,
                opisProizvoda: stavka.proizvod.opis
            }
        }
        )
        )

    }

    React.useEffect(() => {
        fetchSablon()
    }, [])

  return (
    <>
    <Typography variant="h1">Sablon</Typography>
    <Typography variant="h3">{sablon.naziv}</Typography>
    <Typography variant="h4">Stavke Sablona</Typography>
    <DataGrid
    sx={{height: 400, width: '100%'}}

    rows={flatStavke}
    columns={[
        {field: 'id', headerName: 'ID', width: 100},
        {field: 'nazivProizvoda', headerName: 'Naziv Proizvoda', width: 200},
        {field: 'opisProizvoda', headerName: 'Opis Proizvoda', width: 200},
        {field: 'nacinRacunanjaKomada', headerName: 'Nacin Racunanja Komada', width: 200},
        {field: 'razmak', headerName: 'Razmak', width: 200},
        {field: 'multiplikator', headerName: 'Multiplikator', width: 200},
        {field: 'rucniDodatak', headerName: 'Rucni Dodatak', width: 200},
        {field: 'nacinRacunanjaDuzineKomada', headerName: 'Nacin Racunanja Duzine Komada', width: 200},
        {field: 'razlikaDuzine', headerName: 'Razlika Duzine', width: 200},
        {field: 'duzinaKomada', headerName: 'Duzina Komada', width: 200},
        {field: 'cinkovanje', headerName: 'Cinkovanje', width: 200},
        {field: 'farbanje', headerName: 'Farbanje', width: 200},
        {field: 'montaza', headerName: 'Montaza', width: 200},
        {field: 'izrada', headerName: 'Izrada', width: 200}
    ]}
    pageSize={10}
    rowsPerPageOptions={[10, 20, 50]}
    />

    </>
    )
}

export default Sablon