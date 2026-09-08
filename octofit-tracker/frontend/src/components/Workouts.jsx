import { useEffect, useState } from 'react'
import { fetchItems } from '../api.js'
import { ResourceState } from './ResourceState.jsx'

const workoutsEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`
  : 'http://localhost:8000/api/workouts/'

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [state, setState] = useState({ loading: true, error: '' })

  useEffect(() => { fetchItems('workouts', workoutsEndpoint).then(setWorkouts).catch((error) => setState({ loading: false, error: error.message })).finally(() => setState((current) => ({ ...current, loading: false }))) }, [])

  return <section><div className="section-heading"><span className="eyebrow">Your next move</span><h1>Workouts</h1><p>Practical sessions for wherever your energy is today.</p></div><ResourceState {...state} empty={!workouts.length}><div className="row g-3">{workouts.map((workout) => <article className="col-md-6" key={workout._id || workout.title}><div className="data-card"><div className="workout-meta"><span>{workout.category}</span><span>{workout.difficulty}</span></div><h2>{workout.title}</h2><p>{workout.durationMinutes} minutes</p><ul>{workout.exercises?.map((exercise) => <li key={exercise}>{exercise}</li>)}</ul></div></article>)}</div></ResourceState></section>
}

export default Workouts