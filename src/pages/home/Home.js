import React from 'react'
import './Home.css'

function Home() {
  return (
    <>
      <div className='home-container'>
        <div className='home-tile'>
          <h1></h1>
          <h2>Upita u poslednjih 7 dana</h2>
        </div>
        <div className='home-tile'>
          <h1></h1>
          <h2>Upita sa rokom u sledecih 7 dana</h2>
        </div>
        <div className='home-tile'>
          <h1></h1>
          <h2>Napravljenih kalkulacija u poslednjih 7 dana</h2>
        </div>
        <div className='home-tile'>
        </div>
        <div className='home-tile'>
        </div>
        <div className='home-tile'>
        </div>
      </div>
      <button className='novi-upit'>+</button>
    </>
  )
}

export default Home