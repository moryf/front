import React from 'react'
import Logo from '../../assets/images/logo.png'
import './Sidebar.css'


function Sidebar() {
  return (
    <div className='sidebar'>
      <div className='sidebar-content'>
        <img src={Logo} alt='logo'/>
        <ul>
            <li>Home</li>
            <li>Products</li>
            <li>Categories</li>
            <li>Users</li>
            <li>Orders</li>
        </ul>
      </div>
    </div>
  )
}

export default Sidebar