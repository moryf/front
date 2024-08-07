import React from 'react';
import Login from './pages/login/Login';
import { BrowserRouter, Routes,Route } from 'react-router-dom';
import Home from './pages/home/Home';
import Sidebar from './components/sidebar/Sidebar';
import './App.css';
import ListaPonuda from './pages/listaPonuda/ListaPonuda';
import Ponuda from './pages/ponuda/Ponuda';
import ProizvodPonuda from './pages/proizvodPonuda/ProizvodPonuda';
import ArhivaPonuda from './pages/arhivaPonuda/ArhivaPonuda';
import Kalkulacija from './pages/kalkulacija/Kalkulacija';
import Podesavanja from './pages/podesavanja/Podesavanja';
import Calculator from './pages/test/calculator/Calculator';
import Proizvodi from './pages/proizvodi/Proizvodi';
import Kupci from './pages/kupci/Kupci';
import Kupac from './pages/kupac/Kupac';
import Sabloni from './pages/sabloni/Sabloni';
import Sablon from './pages/sabloni/sablon/Sablon';

function App() {
  const isLoggedIn = sessionStorage.getItem('korisnik')!==null;



  if(isLoggedIn){
    return (
      <div className='App'>
        <Sidebar/>
        <div className='content'>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path='/ponude' element={<ListaPonuda/>}/>
            <Route path='/ponuda/:id' element={<Ponuda/>}/>
            <Route path='/proizvod-ponuda/:id' element={<ProizvodPonuda/>}/>
            <Route path='/arhiva-ponuda' element={<ArhivaPonuda/>}/>
            <Route path='/kalkulacija/:id' element={<Kalkulacija/>}/>
            <Route path='/podesavanja' element={<Podesavanja/>}/>
            <Route path='/proizvodi' element={<Proizvodi/>}/>
            <Route path='/kupci' element={<Kupci/>}/>
            <Route path='/calculator' element={<Calculator/>}/>
            <Route path='/kupac/:id' element={<Kupac/>}/>
            <Route path='/sabloni' element={<Sabloni/>}/>
            <Route path='/sablon/:id' element={<Sablon/>}/>
          </Routes>
        </BrowserRouter>
        </div>
        
      </div>
    );}
    else{
      return (
        <Login/>
      );
    }




}

export default App;
