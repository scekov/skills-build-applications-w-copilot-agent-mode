const codespaceName = import.meta.env.VITE_CODESPACE_NAME

export const API_BASE_URL = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : 'http://localhost:8000/api'

export function getItems(payload) {
  if (Array.isArray(payload)) return payload
  if (Array.isArray(payload?.results)) return payload.results
  if (Array.isArray(payload?.data)) return payload.data
  return []
}

export async function fetchItems(resource, endpoint = `${API_BASE_URL}/${resource}/`) {
  const response = await fetch(endpoint)
  if (!response.ok) {
    throw new Error(`Unable to load ${resource}.`)
  }
  return getItems(await response.json())
}