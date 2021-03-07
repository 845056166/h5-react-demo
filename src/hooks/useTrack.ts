import { useEffect } from 'react'

export interface PageTrackOptions {
  enterId: number
  leaveId: number
  business: string
  pageName: string
}

const useTrack = (options: PageTrackOptions) => {
  console.log(options);
  
  useEffect(() => {

    return () => {
    }
  }, [])

  useEffect(() => {
  }, [])

  return {}
}

export default useTrack
