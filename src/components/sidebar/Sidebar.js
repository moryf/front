import React from 'react'
import Logo from '../../assets/images/logo.png'
import './Sidebar.css'
import MenuIcon from '@mui/icons-material/Menu';


function Sidebar() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(!open);
  };



  return (
    <>
    <button className={open? 'sidebar-button':'sidebar-button open'} onClick={handleClickOpen}>
    <MenuIcon/> Meni
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
          <li>
            <a href='/kupci'>Kupci</a>
          </li>
        </ul>
        <select defaultValue={sessionStorage.getItem('trenutnaUloga')} name="trenutnaUloga" id="trenutnaUlogaSelect" className='trenutnaUlogaSelect' onChange={(e) => {
          sessionStorage.setItem('trenutnaUloga', e.target.value)
          window.location.reload()
        }}>
          {JSON.parse(sessionStorage.getItem('korisnik')).uloge.map((uloga) => {
            return <option value={uloga.naziv}>{uloga.naziv}</option>
          }
          )}
        </select>
        <p className='trenutnaUloga'>Trenutna uloga: {sessionStorage.getItem('trenutnaUloga')}</p>
        <p className='version'>v1.0.0</p>

      </div>
    </div>
    </>
  )
}

export default Sidebar