// src/App.jsx
import React from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Sponsors from './components/Sponsors'
import Categories from './components/Categories'
import Footer from './components/Footer'

function App() {
  return (
    <div className="bg-black min-h-screen">
      <Navbar />
        <Hero />
        <About />
        <Sponsors />
        <Categories />
      <Footer />
    </div>
  )
}

export default App