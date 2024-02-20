import React from 'react'
import Logo from '../../assets/images/logo.png'
import './Sidebar.css'


function Sidebar() {
  return (
    <div className='sidebar'>
      <div className='sidebar-content'>
        <img src={Logo} alt='logo'/>
        <ul>
          <li>
            <a href='/'>Home</a>
          </li>
          <li>
            <a href='/ponude'>Ponude</a>
          </li>
          <li>
            <a href='/arhiva-ponuda'>Arhiva Ponuda</a>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Sidebar