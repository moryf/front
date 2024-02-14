import React from 'react'
import { Paper,Button } from '@mui/material'
import { getPonuda } from '../../api/apiFunctions/ApiFunctions'
import { useEffect, useState } from 'react'

function Ponuda() {
  const id = window.location.pathname.split("/")[2]
  const [ponuda, setPonuda] = useState({})
  async function fetchPonuda() {
    const ponuda = await getPonuda(id)
    setPonuda(ponuda)
  }

  useEffect(() => {
    fetchPonuda()
  }, [])

  if (!ponuda) {
    return <h1>Loading...</h1>
  }

  return (
    <>
    <Paper className='ponuda'>
      <h1>Ponuda</h1>
      <h3>{ponuda.id}</h3>
      
    </Paper>
    <Paper className='kupac'>
    </Paper>

    </>
  )
}

export default Ponuda