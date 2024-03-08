import React from 'react'
import Logo from '../../assets/images/logo.png'
import './Sidebar.css'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';


function Sidebar() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(!open);
  };



  return (
    <>
    <button className={open? 'sidebar-button':'sidebar-button open'} onClick={handleClickOpen}>
    <KeyboardArrowRightIcon/>
    </button>
    <div className={open?'sidebar':'sidebar closed'}>
      <div className='sidebar-content'>
        <img src={Logo} alt='logo'/>
        <ul>
          <li>
            <a href='/'>Home</a>
          </li>
          <li>
            <a href='/ponude'>Upiti</a>
          </li>
          <li>
            <a href='/arhiva-ponuda'>Arhiva Upita</a>
          </li>
          <li>
            <a href='/podesavanja'>Podesavanja</a>
          </li>
          <li>
            <a href='/proizvodi'>Proizvodi</a>
          </li>
        </ul>
      </div>
    </div>
    </>
  )
}

export default Sidebar