import { useCallback, useEffect, useState } from 'react'
import { get } from '../lib/api'
import { Model } from '../lib/types'

export function useModels() {
  const [models, setModels] = useState<Model[] | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<any>(null)

  const fetchModels = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await get<Model[]>('/models')
      setModels(res)
    } catch (err) {
      setError(err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchModels()
  }, [fetchModels])

  return { models, loading, error, reload: fetchModels }
}

export default useModels
