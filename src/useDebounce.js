import { useCallback, useEffect } from 'react'

export default function useDebounce(effect, delay, deps) {
  let callback = useCallback(effect, deps)

  useEffect(() => {
    let handler = setTimeout(() => {
      callback()
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [callback, delay])
}
