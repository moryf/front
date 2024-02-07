import { TextField } from '@mui/material'
import React from 'react'

function Kalkulacija() {
  return (
    <div>
        <h1>Kalkulacija</h1>
        <form>
            <input type="text" placeholder="Unesite naziv artikla" />
            <input type="text" placeholder="Ukupno metara" />
            <input type="text" placeholder="ili broj Komada" />
            <input type="text" placeholder="Duzina po komadu" />
            <input type="text" placeholder="Visina" />
            <input type="text" placeholder="Dubina" />
        </form>
        
    </div>
  )
}

export default Kalkulacija