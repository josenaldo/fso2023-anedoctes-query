import React from 'react'

import { useQuery } from 'react-query'
import { useDispatch } from 'react-redux'
import { setAlert, ALERT_TYPES } from '@/reducers/alertReducer'

import Alert from '@/components/Alert'
import AnecdoteForm from '@/components/AnecdoteForm'
import './App.css'

import { getAnecdotes } from '@/requests/anecdotesRequests'

const App = () => {
  const dispatch = useDispatch()

  const handleVote = (anecdote) => {
    console.log('vote: ', anecdote)
    dispatch(
      setAlert({
        type: ALERT_TYPES.INFO,
        message: 'Anecdote voted!',
        details: `You voted for the anecdote '${anecdote.content}' !`,
      })
    )
  }

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

  const anecdotes = result.data

  return (
    <div className="container">
      <main>
        <h3>Anecdote app</h3>

        <Alert />
        <AnecdoteForm />

        {anecdotes.map((anecdote) => (
          <article key={anecdote.id}>
            <div className="anecdote">
              <span>{anecdote.content}</span>
              <button
                className="card small"
                onClick={() => handleVote(anecdote)}
              >
                <span className="material-icons">thumb_up_alt</span>
                <span>Vote</span>
              </button>
            </div>
            <footer>
              <span className="votes">
                <span className="material-icons">thumb_up_alt</span>{' '}
                {anecdote.votes}{' '}
              </span>
            </footer>
          </article>
        ))}
      </main>
    </div>
  )
}

export default App
