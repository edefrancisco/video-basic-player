// @ts-check

import { useRef } from "react"
import videojs from "video.js"

/**
 * @typedef {import('video.js').VideoJsPlayer} VideoJsPlayer
 * @typedef {import('video.js').VideoJsPlayerOptions} VideoJsPlayerOptions
 */

export function useVideoJs() {
  /** @type {React.MutableRefObject<HTMLDivElement | null>} */
  const videoRef = useRef(null)
  
  /** @type {React.MutableRefObject<VideoJsPlayer | null>} */
  const playerRef = useRef(null)

  /** @type {VideoJsPlayerOptions} */
  const videoJsOptions = {
    autoplay: false,
    controls: true,
    responsive: true,
    fluid: true,
    sources: [{
      src: 'http://distribution.bbb3d.renderfarming.net/video/mp4/bbb_sunflower_1080p_60fps_normal.mp4',
      type: 'video/mp4'
    }]
  }

  /** @type {(player: VideoJsPlayer) => void} */
  const handlePlayerReady = (player) => {
    playerRef.current = player

    // You can handle player events here, for example:
    player.on('waiting', () => {
      videojs.log('player is waiting')
    })

    player.on('dispose', () => {
      videojs.log('player will dispose')
    })
  }

  return { 
    videoJsOptions, 
    handlePlayerReady,
    playerRef,
    videoRef
  }
}