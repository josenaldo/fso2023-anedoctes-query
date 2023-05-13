import { useMutation, useQueryClient } from 'react-query'

import { createAnecdote } from '@/requests/anecdotesRequests'
import { useDispatch } from 'react-redux'
import { setAlert, setErrorAlert } from '@/reducers/alertReducer'
import { ALERT_TYPES } from '@/constants'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const dispatch = useDispatch()

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: async (newAnecdote) => {
      const anecdotes = queryClient.getQueryData('anecdotes')
      queryClient.setQueryData('anecdotes', anecdotes.concat(newAnecdote))

      dispatch(
        setAlert({
          type: ALERT_TYPES.SUCCESS,
          message: 'Anecdote created!',
          details: `You created the anecdote '${newAnecdote.content}' !`,
        })
      )
    },
    onError: async (error) => {
      dispatch(
        setErrorAlert({
          message: 'Error creating anecdote',
          details: 'An error occurred while creating the anecdote',
          error: error,
        })
      )
    },
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content, votes: 0 })
  }

  return (
    <div>
      <h3>create new</h3>

      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
