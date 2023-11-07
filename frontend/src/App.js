import { useState, useEffect } from 'react'
import axios from 'axios'

import NavBar from './Components/NavBar';
import Catalog from './Pages/Catalog';
import './App.css';

function App() {

  return (
    <div>
      <NavBar />
      <Catalog/>
    </div>
  );
}

export default App;
