import React from 'react'

import { useQuery } from 'react-query'

import { Anecdote, AnecdoteForm, getAnecdotes } from '@/features/anecdote'

import { Alert } from '@/features/alert'

const IndexPage = () => {
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

export default IndexPage
