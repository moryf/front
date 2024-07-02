import React from 'react'
import { getAllSabloni } from '../../api/apiFunctions/ApiFunctions'
import { Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'

function Sabloni() {
    const [sabloni, setSabloni] = React.useState([])

    async function fetchSabloni() {
        const response = await getAllSabloni()
        setSabloni(response)
    }

    React.useEffect(() => {
        fetchSabloni()
    }, [])




  return (
    <>
    <Typography variant="h3">Sabloni</Typography>
    <DataGrid
    rows={sabloni}
    columns={[
        {field: 'id', headerName: 'ID', width: 100},
        {field: 'naziv', headerName: 'Naziv', width: 200},
    ]}
    pageSize={10}
    rowsPerPageOptions={[10, 20, 50]}
    onRowDoubleClick={(row) => {
        window.location.href = `/sablon/${row.row.id}`
    }
    }
    />
    </>
  )
}

export default Sabloni