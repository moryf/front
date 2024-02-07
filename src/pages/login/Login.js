import React from 'react'
import AxiosConfig from '../../api/axios/AxiosConfig'

function Login() {

    const login = () => {
        var username = document.querySelector('input[type="text"]').value
        var password = document.querySelector('input[type="password"]').value

        AxiosConfig.post('/api/korisnik/login', {
            korisnickoIme:username,
            lozinka:password
        }).then((response) => {
            sessionStorage.setItem('korisnik', JSON.stringify(response.data))
            alert('Uspesno ste se ulogovali')
            window.location.reload()
        }).catch((error) => {
            console.log(error)
            alert('Pogresno korisnicko ime ili lozinka')
        })
    }

  return (
    <>
    <h1>Login</h1>
    <form>
      <input type="text" placeholder="Username" />
      <input type="password" placeholder="Password" />
      
    </form>
    <button onClick={()=>login()}>Login</button>
    </>
  )
}

export default Login