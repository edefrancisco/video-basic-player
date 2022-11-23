// @ts-check

import React from "react"
import { useVideoJs } from "./useVideoJs"
import { VideoJs } from "./VideoJs/VideoJs"
import { VideoJsControls } from "./VideoJsControls/VideoJsControls"

export function VideoJsImplement() {
  const { videoJsOptions, handlePlayerReady, playerRef, videoRef } = useVideoJs()
  return (
    <div>
      <VideoJs 
        options={videoJsOptions} 
        onReady={handlePlayerReady} 
        videoRef={videoRef} 
        playerRef={playerRef}
      />
      { playerRef.current && <VideoJsControls player={playerRef.current} /> }
    </div>
  )
}