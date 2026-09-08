import { useEffect, useState } from 'react'
import { fetchItems } from '../api.js'
import { ResourceState } from './ResourceState.jsx'

function Activities() {
  const [activities, setActivities] = useState([])
  const [state, setState] = useState({ loading: true, error: '' })

  useEffect(() => { fetchItems('activities').then(setActivities).catch((error) => setState({ loading: false, error: error.message })).finally(() => setState((current) => ({ ...current, loading: false }))) }, [])

  return <section><div className="section-heading"><span className="eyebrow">The weekly pulse</span><h1>Activities</h1><p>Every session counts toward the bigger picture.</p></div><ResourceState {...state} empty={!activities.length}><div className="table-responsive data-card p-0"><table className="table align-middle mb-0"><thead><tr><th>Athlete</th><th>Session</th><th>Duration</th><th>Calories</th></tr></thead><tbody>{activities.map((activity) => <tr key={activity._id}><td>{activity.user?.name || activity.user}</td><td>{activity.type}</td><td>{activity.durationMinutes} min</td><td>{activity.calories}</td></tr>)}</tbody></table></div></ResourceState></section>
}

export default Activities