import React from 'react';
import Login from './pages/login/Login';
import { BrowserRouter, Routes,Route } from 'react-router-dom';
import Home from './pages/home/Home';
import Sidebar from './components/sidebar/Sidebar';
import './App.css';

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
