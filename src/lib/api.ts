const BASE = '/api'

async function handleRes<T>(res: Response): Promise<T> {
  if (!res.ok) {
    throw new Error('Request failed')
  }
  return res.json() as Promise<T>
}

function buildUrl(path: string): string {
  if (path.startsWith('http')) return path
  return `${BASE}${path.startsWith('/') ? '' : '/'}${path}`
}

export async function get<T = unknown>(path: string): Promise<T> {
  const res = await fetch(buildUrl(path), {
    credentials: 'include',
  })
  return handleRes<T>(res)
}

export async function post<T = unknown,B extends object | undefined = undefined>(path: string, body?: B): Promise<T> {
  const res = await fetch(buildUrl(path), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
    credentials: 'include',
  })
  return handleRes<T>(res)
}

export async function put<T = unknown,B extends object | undefined = undefined>(path: string, body?: B): Promise<T> {
  const res = await fetch(buildUrl(path), {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
    credentials: 'include',
  })
  return handleRes<T>(res)
}

export default {
  get,
  post,
  put,
}
