import { useCallback, useEffect, useState } from 'react'
import { get } from '../lib/api'
import { Prompt } from '../lib/types'

export function usePrompts() {
  const [prompts, setPrompts] = useState<Prompt[] | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<any>(null)

  const fetchPrompts = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await get<Prompt[]>('/prompts')
      setPrompts(res)
    } catch (err) {
      setError(err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchPrompts()
  }, [fetchPrompts])

  return { prompts, loading, error, reload: fetchPrompts }
}

export default usePrompts
