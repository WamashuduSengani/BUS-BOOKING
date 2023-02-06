import React from 'react'
import './components/styles/Index/Index.css'
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom'
import { Navbar } from './components/Navbar';
import Booking from './components/Booking';
import { BookingsProvider } from './contexts/BookingsProvider';


function App() {
  return (
    <>
      <Router>
        <Navbar />
        <BookingsProvider>
          <Routes>
            <Route exact path='/' element={<Booking />} />
          </Routes>
        </BookingsProvider>
      </Router>
    </>
  )
}

export default App
