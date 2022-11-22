// @ts-check

import React from "react";
import { useEffect, useRef } from "react";

export function Video({ videoRef }) {
  /** @type {React.RefObject<HTMLDivElement>} */
  const videoContinerRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) videoRef.current.play()
  }, [videoRef]);

  return (
    <div ref={videoContinerRef}>
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