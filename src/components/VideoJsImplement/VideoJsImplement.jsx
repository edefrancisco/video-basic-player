// @ts-check

import React from "react"
import { useVideoJs } from "./useVideoJs"
import { VideoJs } from "./VideoJs/VideoJs"

export function VideoJsImplement() {
  const { videoJsOptions, handlePlayerReady } = useVideoJs()
  return (
    <div>
      <VideoJs options={videoJsOptions} onReady={handlePlayerReady} />
    </div>
  )
}