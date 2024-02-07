import React from 'react';
import Login from './pages/login/Login';

function App() {
  const isLoggedIn = sessionStorage.getItem('korisnik')!==null;
  if(isLoggedIn){
    return (
      <div>
        <h1>Ulogovan</h1>
      </div>
    );}
    else{
      return (
        <Login/>
      );
    }




}

export default App;
