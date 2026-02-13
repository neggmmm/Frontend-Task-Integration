import { useCallback, useEffect, useState } from 'react'
import { get } from '../lib/api'
import { Voice } from '../lib/types'

export function useVoices() {
  const [voices, setVoices] = useState<Voice[] | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<any>(null)

  const fetchVoices = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await get<Voice[]>('/voices')
      setVoices(res)
    } catch (err) {
      setError(err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchVoices()
  }, [fetchVoices])

  return { voices, loading, error, reload: fetchVoices }
}

export default useVoices
