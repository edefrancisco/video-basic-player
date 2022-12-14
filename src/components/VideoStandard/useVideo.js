// @ts-check

import { useEffect, useRef, useState } from "react"

export function useVideo() {
  /** @type {React.RefObject<HTMLVideoElement>} */
  const videoRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)

  useEffect(() => {
    const secureVideoRef = videoRef.current
    if (secureVideoRef) {
      secureVideoRef.addEventListener("play", () => {
        setIsPlaying(true)
      })
      secureVideoRef.addEventListener("pause", () => {
        setIsPlaying(false)
      })
      secureVideoRef.addEventListener("ended", () => {
        setIsPlaying(false)
      })
      secureVideoRef.addEventListener("timeupdate", () => {
        setCurrentTime(secureVideoRef.currentTime)
      })
    }
    return () => {
      if (secureVideoRef) {
        secureVideoRef.removeEventListener("play", () => {})
        secureVideoRef.removeEventListener("pause", () => {})
        secureVideoRef.removeEventListener("ended", () => {})
        secureVideoRef.removeEventListener("timeupdate", () => {})
      }
    }
  }, [])

  return {
    videoRef,
    isPlaying,
    currentTime,
  }
}