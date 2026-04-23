import { useState, useEffect } from 'react'
import anecdoteService from '../services/anecdotes'
import { AnecdoteContext } from './AnecdoteContext'

export const AnecdoteProvider = ({ children }) => {
  const [anecdotes, setAnecdotes] = useState([])

  useEffect(() => {
    anecdoteService.getAll().then(data => setAnecdotes(data))
  }, [])

  const addAnecdote = (anecdote) => {
    anecdoteService.createNew(anecdote).then(data => {
      setAnecdotes(anecdotes.concat(data))
    })
  }

  const deleteAnecdote = (id) => {
    anecdoteService.remove(id).then(() => {
      setAnecdotes(anecdotes.filter(a => a.id !== id))
    })
  }

  return (
    <AnecdoteContext.Provider value={{ anecdotes, addAnecdote, deleteAnecdote }}>
      {children}
    </AnecdoteContext.Provider>
  )
}