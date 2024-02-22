import React from 'react'
import './Home.css'
import NovaPonudaDialog from '../../components/novaPonudaDialog/NovaPonudaDialog'

import { dashboard } from '../../api/apiFunctions/ApiFunctions'

import { dashboardTemplate } from '../../api/josnTemplates/JSONTemplates'

import { useEffect, useState } from 'react'
import { Paper } from '@mui/material'

function Home() {

  const [podaci, setPodaci] = useState(dashboardTemplate)

  async function preuzmiPodatke() {
    const podaciResult = await dashboard()
    console.log(podaciResult)
    setPodaci(podaciResult)
  }

  useEffect(() => {
    preuzmiPodatke()
  }, [])



  return (
    <>
      <div className='home-container'>
        <div className='home-tile'>
          <h1>{podaci.nove}</h1>
          <h2>Novih ponuda</h2>
        </div>
        <div className='home-tile'>
          <h1>{podaci.obradjene}</h1>
          <h2>Obradjene ponude</h2>
        </div>
        <div className='home-tile'>
          <h1>{podaci.ponudeSaRokomOveNedelje}</h1>
          <h2>Ponuda sa rokom u sledecih 7 dana</h2>
        </div>
        <div className='home-tile'>
          <h1>{podaci.ponudaSaIsteklimRokom}</h1>
          <h2>Ponuda sa isteklim rokom</h2>
        </div>
        <div className='home-tile'>
          <h1>{podaci.novihPonudaOveNedelje}</h1>
          <h2>Novih ponuda ove nedelje</h2>
        </div>
      </div>
      <NovaPonudaDialog/>
      
    </>
  )
}

export default Home