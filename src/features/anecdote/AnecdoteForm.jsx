import { useMutation, useQueryClient } from 'react-query'

import { createAnecdote } from '@/features/anecdote'
import {
  ALERT_TYPES,
  useSetAlert,
  useSetErrorAlert,
  useAlertDispatch,
} from '@/features/alert'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const dispatch = useAlertDispatch()
  const setAlert = useSetAlert()
  const setErrorAlert = useSetErrorAlert()

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
    <article>
      <h4>Create new anecdote</h4>

      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </article>
  )
}

export default AnecdoteForm
