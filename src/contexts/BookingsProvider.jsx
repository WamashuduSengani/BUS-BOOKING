import React, { createContext } from 'react'
import { useState, useEffect, useContext } from 'react';

const BookingsContext = createContext()

export function useBookingContext() {
  return useContext(BookingsContext)
}

export function BookingsProvider({ children }) {
  const [error, setError] = useState('')

  const value = {
    error,
    setError
  }

  return (
    <BookingsContext.Provider value={value}>
      {children}
    </BookingsContext.Provider>
  )
}
