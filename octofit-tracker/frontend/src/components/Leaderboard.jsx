import { useEffect, useState } from 'react'
import { fetchItems } from '../api.js'
import { ResourceState } from './ResourceState.jsx'

const leaderboardEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`
  : 'http://localhost:8000/api/leaderboard/'

function Leaderboard() {
  const [entries, setEntries] = useState([])
  const [state, setState] = useState({ loading: true, error: '' })

  useEffect(() => { fetchItems('leaderboard', leaderboardEndpoint).then(setEntries).catch((error) => setState({ loading: false, error: error.message })).finally(() => setState((current) => ({ ...current, loading: false }))) }, [])

  return <section><div className="section-heading"><span className="eyebrow">Friendly competition</span><h1>Leaderboard</h1><p>Consistency has a score, too.</p></div><ResourceState {...state} empty={!entries.length}><div className="leaderboard-list">{entries.map((entry) => <div className="leaderboard-row" key={entry._id}><strong>#{entry.rank}</strong><span>{entry.user?.name || entry.user}</span><b>{entry.points} pts</b></div>)}</div></ResourceState></section>
}

export default Leaderboard