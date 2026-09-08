export function ResourceState({ loading, error, empty, children }) {
  if (loading) return <p className="status-message">Loading data...</p>
  if (error) return <p className="status-message status-error">{error}</p>
  if (empty) return <p className="status-message">No data available yet.</p>
  return children
}