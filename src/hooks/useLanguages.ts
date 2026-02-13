import { useCallback, useEffect, useState } from 'react'
import { get } from '../lib/api'
import { Language } from '../lib/types'

export function useLanguages() {
  const [languages, setLanguages] = useState<Language[] | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<any>(null)

  const fetchLanguages = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await get<Language[]>('/languages')
      setLanguages(res)
    } catch (err) {
      setError(err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchLanguages()
  }, [fetchLanguages])

  return { languages, loading, error, reload: fetchLanguages }
}

export default useLanguages
