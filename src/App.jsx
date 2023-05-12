import React from 'react'

import { useQuery } from 'react-query'
import { useDispatch } from 'react-redux'
import { setAlert, ALERT_TYPES } from '@/reducers/alertReducer'

import Alert from '@/components/Alert'
import AnecdoteForm from '@/components/AnedoctForm'
import './App.css'

import { getAnedoctes } from '@/requests/anedoctesRequests'

const App = () => {
  const dispatch = useDispatch()

  const handleVote = (anecdote) => {
    console.log('vote: ', anecdote)
    dispatch(
      setAlert({
        type: ALERT_TYPES.INFO,
        message: 'Anedocte voted!',
        details: `You voted for the anedocte '${anecdote.content}' !`,
      })
    )
  }

  const result = useQuery('anedoctes', getAnedoctes, {
    refetchOnWindowFocus: false,
  })

  if (result.isLoading) {
    return <div>Loading...</div>
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
            <div className="anedocte">
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
