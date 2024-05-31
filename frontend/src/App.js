import { useState, useEffect } from 'react'
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'

import NavBar from './Components/NavBar/NavBar';
import './App.css';
import Home from './Pages/Home';
import StitchesGallery from './Pages/StitchesGallery';
import PatternsGallery from './Pages/PatternsGallery';
import Contact from './Pages/Contact';
import StitchDetail from './Pages/StitchDetail';
import PatternDetail from './Pages/PatternDetail';
import {default as StitchesUpsert} from './Pages/Admin/ContentManagement/Stitches/Upsert';
import {default as StitchesIndex} from './Pages/Admin/ContentManagement/Stitches/Index';
import AdminLogin from './Pages/Admin/AdminLogin';
import {default as PatternsIndex} from './Pages/Admin/ContentManagement/Patterns/Index';
import {default as PatternsUpsert} from './Pages/Admin/ContentManagement/Patterns/Upsert';
import { ADMIN_AREA, CONTACT, CONTENTMANAGEMENT_PATTERNS, CONTENTMANAGEMENT_STITCHES, HOME, PATTERNS_INDEX, STITCHES_INDEX } from './config/links_path';
import { userIsInRole } from './Pages/Admin/userRolesService';

function App() {

  const [hasAccess, setHasAccess] = useState(false);

  useEffect(()=>{
    const checkUserHasAccess = async () => {
      const allowedRoles = ['admin'];
      try{
        const userHasAccess = await userIsInRole(allowedRoles);
        console.log('hello');
        setHasAccess(userHasAccess);
      }
      catch(err){
        console.log(err);
      }
    }
    checkUserHasAccess();
    //console.log(hasAccess);
  },[])

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
        {/* Authorized only for admin*/} 
        <Route path={CONTENTMANAGEMENT_STITCHES} element={hasAccess? (<StitchesIndex/>) : (<Navigate to={HOME}/>)}/>
        <Route path={`${CONTENTMANAGEMENT_STITCHES}/create`} element={hasAccess?(<StitchesUpsert/>) : (<Navigate to={HOME}/>)}/>
        <Route path={`${CONTENTMANAGEMENT_STITCHES}/edit/:id`} element={hasAccess ? (<StitchesUpsert/>) : (<Navigate to={HOME}/>)}/>
        <Route path={CONTENTMANAGEMENT_PATTERNS} element={hasAccess ? (<PatternsIndex/>) : (<Navigate to={HOME} />)}/>
        <Route path={`${CONTENTMANAGEMENT_PATTERNS}/create`} element={hasAccess ? (<PatternsUpsert/>) : (<Navigate to={HOME} />)}/>
        <Route path={`${CONTENTMANAGEMENT_PATTERNS}/edit/:id`} element={hasAccess ? (<PatternsUpsert/>) : (<Navigate to={HOME}/>)}/>

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
