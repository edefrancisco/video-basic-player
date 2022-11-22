// @ts-check

import React from "react"

export function Video({ videoRef }) {
  return (
    <div>
      <video
        ref={videoRef}
        width="100%" 
        muted={true}
      >
        <source src="http://distribution.bbb3d.renderfarming.net/video/mp4/bbb_sunflower_1080p_60fps_normal.mp4" />
      </video>
    </div>
  )
}