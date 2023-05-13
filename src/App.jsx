import React from 'react'

import { useQuery } from 'react-query'

import { getAnecdotes } from '@/requests/anecdotesRequests'

import Alert from '@/components/Alert'
import AnecdoteForm from '@/components/AnecdoteForm'
import Anecdote from '@/components/Anecdote'

import './App.css'

const App = () => {
  const result = useQuery('anecdotes', getAnecdotes, {
    refetchOnWindowFocus: false,
    retry: 1,
  })

  if (result.isLoading) {
    return <article aria-busy="true">Loading...</article>
  }

  if (result.isError) {
    return (
      <article>
        Anecdote service not available due to problems in server
      </article>
    )
  }

  const anecdotes = result.data.sort((a, b) => b.votes - a.votes)

  return (
    <div className="container">
      <main>
        <h3>Anecdote app</h3>

        <Alert />

        <AnecdoteForm />

        {anecdotes.map((anecdote) => (
          <Anecdote anecdote={anecdote} key={anecdote.id} />
        ))}
      </main>
    </div>
  )
}

export default App
