import React from 'react';
import Login from './pages/login/Login';
import { BrowserRouter, Routes,Route } from 'react-router-dom';
import Home from './pages/home/Home';
import Sidebar from './components/sidebar/Sidebar';
import './App.css';
import NovaPonudaDialog from './components/novaPonudaDialog/NovaPonudaDialog';
import ListaPonuda from './pages/listaPonuda/ListaPonuda';
import Ponuda from './pages/ponuda/Ponuda';

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
          </Routes>
        </BrowserRouter>
        </div>
        <NovaPonudaDialog/>
      </div>
    );}
    else{
      return (
        <Login/>
      );
    }




}

export default App;
