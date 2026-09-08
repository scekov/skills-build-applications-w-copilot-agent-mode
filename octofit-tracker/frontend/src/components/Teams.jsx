import { useEffect, useState } from 'react'
import { fetchItems } from '../api.js'
import { ResourceState } from './ResourceState.jsx'

function Teams() {
  const [teams, setTeams] = useState([])
  const [state, setState] = useState({ loading: true, error: '' })

  useEffect(() => { fetchItems('teams').then(setTeams).catch((error) => setState({ loading: false, error: error.message })).finally(() => setState((current) => ({ ...current, loading: false }))) }, [])

  return <section><div className="section-heading"><span className="eyebrow">Find your people</span><h1>Teams</h1><p>Small circles, steady momentum.</p></div><ResourceState {...state} empty={!teams.length}><div className="row g-3">{teams.map((team) => <article className="col-md-6" key={team._id || team.name}><div className="data-card" style={{ borderTopColor: team.color }}><h2>{team.name}</h2><p>{team.members?.length || 0} members</p><div className="member-list">{team.members?.map((member) => <span key={member._id}>{member.name}</span>)}</div></div></article>)}</div></ResourceState></section>
}

export default Teams