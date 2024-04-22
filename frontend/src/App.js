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
import Upsert from './Pages/Admin/ContentManagement/Stitches/Upsert';
import Index from './Pages/Admin/ContentManagement/Stitches/Index';
import SignUp from './Pages/SignUp';
import AdminLogin from './Pages/Admin/AdminLogin';
import Logout from './Pages/Logout';
import { ADMIN_AREA, CONTACT, CONTENTMANAGEMENT_STITCHES, HOME, PATTERNS_INDEX, STITCHES_INDEX } from './config/links_path';

function App() {

  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path={HOME} element={<Home/>}/>
        <Route path={STITCHES_INDEX} element={<StitchesGallery/>}/>
        <Route path={PATTERNS_INDEX} element={<PatternsGallery/>}/>
        <Route path={CONTACT} element={<Contact/>}/>
        <Route path='/stitch-details/:id' element={<StitchDetail/>}/>
        <Route path='/pattern-details' element={<PatternDetail/>}/>

        {/*Content Management */}
        <Route path={CONTENTMANAGEMENT_STITCHES} element={<Index/>}/>
        <Route path='/admin/content-management/stitches/create' element={<Upsert/>}/>
        <Route path='/admin/content-management/stitches/edit/:id' element={<Upsert/>}/>

        {/*Authenticate user */}
        <Route path={ADMIN_AREA} element={<AdminLogin/>}/>

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
