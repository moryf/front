import React from 'react'
import AxiosConfig from '../../api/axios/AxiosConfig'
import './Login.css'

function Login() {

    const login = () => {
        var username = document.querySelector('input[type="text"]').value
        var password = document.querySelector('input[type="password"]').value

        AxiosConfig.post('/api/korisnik/login', {
            korisnickoIme:username,
            lozinka:password
        }).then((response) => {
            sessionStorage.setItem('korisnik', JSON.stringify(response.data))
            sessionStorage.setItem('trenutnaUloga', response.data.uloge[0].naziv)
            alert('Uspesno ste se ulogovali')
            window.location.reload()
        }).catch((error) => {
            console.log(error)
            alert('Pogresno korisnicko ime ili lozinka')
        })
    }

  return (
    <div className='login'>
      <h1>Login</h1>
      <form>
        <label htmlFor="korisnickoIme">Korisnicko Ime</label>
        <input  type="text" placeholder="Korisnicko Ime" />
        <label htmlFor="lozinka">Lozinka</label>
        <input  type="password" placeholder="Lozinka" />
        
      </form>
      <button onClick={()=>login()}>Login</button>
    </div>
  )
}

export default Login