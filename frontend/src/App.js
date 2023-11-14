import { useState, useEffect } from 'react'
import axios from 'axios'
import {BrowserRouter, Routes, Route} from 'react-router-dom'

import NavBar from './Components/NavBar';
import Catalog from './Pages/Catalog';
import './App.css';
import Home from './Pages/Home';
import StitchesGallery from './Pages/StitchesGallery';
import PatternsGallery from './PatternsGallery';
import Contact from './Contact';

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
