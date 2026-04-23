import { useContext } from 'react'
import { AnecdoteContext } from '../context/AnecdoteContext'

export const useAnecdotes = () => useContext(AnecdoteContext)