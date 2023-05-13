import { useDispatch } from 'react-redux'
import { useMutation, useQueryClient } from 'react-query'
import { setAlert, setErrorAlert } from '@/reducers/alertReducer'
import { ALERT_TYPES } from '@/constants'
import { updateAnecdote } from '@/requests/anecdotesRequests'

const Anedocte = ({ anecdote }) => {
  const dispatch = useDispatch()
  const queryClient = useQueryClient()

  const updateAnecdoteMutation = useMutation(updateAnecdote, {
    onSuccess: (updatedAnecdote) => {
      const anedoctes = queryClient.getQueryData('anecdotes')
      const updatedAnecdotes = anedoctes.map((anecdote) =>
        anecdote.id === updatedAnecdote.id ? updatedAnecdote : anecdote
      )
      queryClient.setQueryData('anecdotes', updatedAnecdotes)
    },
    onError: (error) => {
      dispatch(
        setErrorAlert({
          message: 'Error updating anecdote',
          details: 'An error occurred while updating the anecdote',
          error: error,
        })
      )
    },
  })

  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
    dispatch(
      setAlert({
        type: ALERT_TYPES.INFO,
        message: 'Anecdote voted!',
        details: `You voted for the anecdote '${anecdote.content}' !`,
      })
    )
  }

  return (
    <article key={anecdote.id}>
      <div className="anecdote">
        <span>{anecdote.content}</span>
        <button className="card small" onClick={() => handleVote(anecdote)}>
          <span className="material-icons">thumb_up_alt</span>
          <span>Vote</span>
        </button>
      </div>
      <footer>
        <span className="votes">
          <span className="material-icons">thumb_up_alt</span> {anecdote.votes}
        </span>
      </footer>
    </article>
  )
}

export default Anedocte
