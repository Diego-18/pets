import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar/Navbar.jsx'
import Home from './components/Home/Home.jsx'

import Categories from './components/Categories/Categories.jsx'
import FormCategories from './components/Categories/FormCategories.jsx'

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

        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
