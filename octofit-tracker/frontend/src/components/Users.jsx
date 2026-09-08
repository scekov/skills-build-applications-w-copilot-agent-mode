import { useEffect, useState } from 'react'
import { fetchItems } from '../api.js'
import { ResourceState } from './ResourceState.jsx'

const usersEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/users/`
  : 'http://localhost:8000/api/users/'

function Users() {
  const [users, setUsers] = useState([])
  const [state, setState] = useState({ loading: true, error: '' })

  useEffect(() => {
    fetchItems('users', usersEndpoint)
      .then((items) => setUsers(items))
      .catch((error) => setState({ loading: false, error: error.message }))
      .finally(() => setState((current) => ({ ...current, loading: false })))
  }, [])

  return (
    <section>
      <div className="section-heading"><span className="eyebrow">Community</span><h1>Members</h1><p>People showing up for their next strong day.</p></div>
      <ResourceState {...state} empty={!users.length}>
        <div className="row g-3">{users.map((user) => <article className="col-md-6 col-xl-4" key={user._id || user.email}><div className="data-card"><div className="avatar">{user.avatar || user.name?.slice(0, 2).toUpperCase()}</div><h2>{user.name}</h2><p>{user.email}</p></div></article>)}</div>
      </ResourceState>
    </section>
  )
}

export default Users