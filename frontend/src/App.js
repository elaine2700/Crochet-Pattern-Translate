import { useState, useEffect } from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'

import NavBar from './Components/NavBar/NavBar';
import './App.css';
import Home from './Pages/Home';
import StitchesGallery from './Pages/StitchesGallery';
import PatternsGallery from './Pages/PatternsGallery';
import Contact from './Pages/Contact';
import StitchDetail from './Pages/StitchDetail';
import PatternDetail from './Pages/PatternDetail';
import Create from './Pages/ContentManagement/Stitches/Create';
import SignUp from './Pages/SignUp';
import Login from './Pages/Login';
import Logout from './Pages/Logout';

function App() {

  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/stitches' element={<StitchesGallery/>}/>
        <Route path='/patterns' element={<PatternsGallery/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/stitch-details/:id' element={<StitchDetail/>}/>
        <Route path='/pattern-details' element={<PatternDetail/>}/>
        <Route path='/content-management/stitches/create' element={<Create/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/logout' element={<Logout/>}/>

        <Route path='*' element={<div>Not Found</div>}/>
      </Routes>  
      <footer>
                <p>Crochet Spacecraft</p>
                <p>Contact Us</p>
                <p>Instagram</p>
            </footer>   
    </BrowserRouter>
  );
}

export default App;
