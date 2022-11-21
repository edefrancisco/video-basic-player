// @ts-check

import React from "react";

/** 
 * @param {Number} secs 
 * */
function formatTime(secs) {
  if (secs >= 3600) 
    return new Date(secs * 1000).toISOString().substring(11, 16)
  else
    return new Date(secs * 1000).toISOString().substring(14, 19)
}

/** 
 * @param {React.MouseEvent<HTMLProgressElement, MouseEvent>} ev 
 * @param {Number} max
 * */
function getProgressClickedValue(ev, max) {
  return ((ev.clientX - ev.currentTarget.offsetLeft) * max ) / (ev.currentTarget.offsetWidth)
}

/** 
 * @param {Object} props
 * @param {import('react').RefObject<HTMLVideoElement>} props.videoRef
 * @param {boolean} props.isPlaying
 * @param {Number} props.currentTime
 * */
export function VideoControls({ videoRef, isPlaying, currentTime }) {
  const duration = videoRef.current?.duration || 0
  const [isMuted, setIsMuted] = React.useState(videoRef.current?.muted || Boolean(true))

  function handlePlay() {
    videoRef.current?.play()
  }
  
  function handlePause() {
    videoRef.current?.pause()
  }
  
  function handleStop() {
    videoRef.current?.pause()
    if (videoRef.current?.currentTime) 
      videoRef.current.currentTime = 0
  }

  function handleMuteToggle() {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted
      setIsMuted(videoRef.current.muted)
      if (videoRef.current.muted && videoRef.current.volume === 0) {
        videoRef.current.volume = 0.1
      }
    }
  }

  function handleVolumeUp() {
    if (videoRef.current) {
      isMuted && handleMuteToggle()
      videoRef.current.volume = Math.min(videoRef.current.volume + 0.1, 1)
    }
  }

  function handleVolumeDown() {
    if (videoRef.current) {
      videoRef.current.volume = Math.max(videoRef.current.volume - 0.1, 0)
    }
  }

  /** 
   * @param {React.MouseEvent<HTMLProgressElement, MouseEvent>} ev 
   * */
  function handleProgress(ev) {
    if (videoRef.current && duration) {
      const selectedTime = getProgressClickedValue(ev, duration)
      videoRef.current.currentTime = selectedTime
    }
  }

  function handleFullScreen() {
    if (videoRef.current) {
      videoRef.current.requestFullscreen()
    }
  }

  function handleFastForward() {
    if (videoRef.current) {
      videoRef.current.currentTime = Math.min(videoRef.current.currentTime + 10, duration)
    }
  }

  function handleRewind() {
    if (videoRef.current) {
      videoRef.current.currentTime = Math.max(videoRef.current.currentTime - 10, 0)
    }
  }

  return (
    <div>
      <h1>Video Controls</h1>
      <ul>
        <li>
          { 
            isPlaying 
              ? <button onClick={handlePause}>Pause</button>
              : <button onClick={handlePlay}>Play</button>
          }
          
        </li>
        <li>
          <button onClick={handleStop}>Stop</button>
        </li>
        <li>
          <button onClick={handleFastForward}>FF {'>>'}</button>
        </li>
        <li>
          <button onClick={handleRewind}>{'<<'} RW</button>
        </li>
        <li>
          <progress value={currentTime} max={duration} onClick={handleProgress} />
        </li>
        <li>
          {
            isMuted
              ? <button onClick={handleMuteToggle}>UnMute</button>
              : <button onClick={handleMuteToggle}>Mute</button>
          }
        </li>
        <li>
          <button onClick={handleVolumeUp}>Vol+</button>
        </li>
        <li>
          <button onClick={handleVolumeDown}>Vol-</button>
        </li>
        <li>
          <button onClick={handleFullScreen}>Fullscreen</button>
        </li>
        <li>
          <span>{formatTime(currentTime)} / {formatTime(duration)}</span>
        </li>
      </ul>
    </div>
  );
}