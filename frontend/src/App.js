import { useState, useEffect } from 'react'
import axios from 'axios'
import {BrowserRouter, Routes, Route} from 'react-router-dom'

import NavBar from './Components/NavBar';
import './App.css';
import Home from './Pages/Home';
import StitchesGallery from './Pages/StitchesGallery';
import PatternsGallery from './Pages/PatternsGallery';
import Contact from './Pages/Contact';

function App() {

  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/stitches' element={<StitchesGallery/>}/>
        <Route path='/patterns' element={<PatternsGallery/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='*' element={<div>Not Found</div>}/>
      </Routes>     
    </BrowserRouter>
  );
}

export default App;
