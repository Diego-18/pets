import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar/Navbar.jsx'
import Home from './components/Home/Home.jsx'

import Categories from './components/Categories/Categories.jsx'
import FormCategories from './components/Categories/FormCategories.jsx'

import Tags from './components/Tags/Tags.jsx'
import FormTags from './components/Tags/FormTags.jsx'

import Pets from './components/Pets/Pets.jsx'
import FormPets from './components/Pets/FormPets.jsx'


import './App.css'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/categories" element={<Categories />} />
          <Route exact path="/category" element={<FormCategories opc="add" />} />
          <Route exact path="/category/:id" element={<FormCategories opc="edit"/>} />

          <Route exact path="/tags" element={<Tags />} />
          <Route exact path="/tag" element={<FormTags opc="add" />} />
          <Route exact path="/tag/:id" element={<FormTags opc="edit"/>} />

          <Route exact path="/pets" element={<Pets />} />
          <Route exact path="/pet" element={<FormPets opc="add" />} />
          <Route exact path="/pet/:id" element={<FormPets opc="edit"/>} />

        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
