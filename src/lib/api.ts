// ✅ MUST be at the top level (not inside a function)
const BASE = '/api'

async function handleRes(res: Response) {
  if (!res.ok) {
    throw new Error('Request failed')
  }
  return await res.json()
}

function buildUrl(path: string) {
  if (path.startsWith('http')) return path
  return `${BASE}${path.startsWith('/') ? '' : '/'}${path}`
}

export async function get<T = any>(path: string) {
  const res = await fetch(buildUrl(path), {
    credentials: 'include',
  })
  return handleRes(res)
}

export async function post<T = any, B = any>(path: string, body?: B) {
  const res = await fetch(buildUrl(path), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
    credentials: 'include',
  })
  return handleRes(res)
}

export async function put<T = any, B = any>(path: string, body?: B) {
  const res = await fetch(buildUrl(path), {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
    credentials: 'include',
  })
  return handleRes(res)
}

export default {
  get,
  post,
  put,
}
