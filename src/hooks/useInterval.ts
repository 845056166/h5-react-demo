import { useEffect, useRef } from 'react'
// import usePrevious from './usePrevious'

const useInterval = (callback: () => void, delay: number | null): void => {
  // const savedCallback = usePrevious(callback)
  const savedCallback = useRef<() => void>()

  useEffect(() => {
    savedCallback.current = callback
  })
  const tick = (): void => {
    savedCallback.current()
  }

  useEffect(() => {
    if (delay !== null) {
      let id = setInterval(tick, delay)

      return () => clearInterval(id)
    }
  }, [delay])
}

export default useInterval
