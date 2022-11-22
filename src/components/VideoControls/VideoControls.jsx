// @ts-check

import React from "react"
import { 
  IoStopOutline, 
  IoPlayOutline, 
  IoPauseOutline, 
  IoPlayForwardOutline, 
  IoPlayBackOutline,
  IoVolumeOffOutline,
  IoVolumeMuteOutline,
  IoVolumeHighOutline,
  IoVolumeLowOutline
} from "react-icons/io5";
import { AiOutlineFullscreen } from "react-icons/ai";
import styles from './VideoControls.module.css'

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

      <div className={styles.progressContainer}>
        <progress 
          value={currentTime} 
          max={duration} 
          onClick={handleProgress} 
          className={styles.progress}
        />
        <span className={styles.time}>
          {formatTime(currentTime)} / {formatTime(duration)}
        </span>
      </div>
      
      <div className={styles.controls}>

        <div>
          <button onClick={handleRewind} className={styles.playerButton}>
            <IoPlayBackOutline size={'2rem'} />
          </button>
            {
              isPlaying 
                ? <button onClick={handlePause} className={styles.playerButton}>
                    <IoPauseOutline size={'2rem'} />
                  </button>
                : <button onClick={handlePlay} className={styles.playerButton}>
                    <IoPlayOutline size={'2rem'} />
                  </button>
            }
          <button onClick={handleStop} className={styles.playerButton}>
            <IoStopOutline size={'2rem'} />
          </button>
          <button onClick={handleFastForward} className={styles.playerButton}>
            <IoPlayForwardOutline size={'2rem'} />
          </button>
        </div>

        <div>
          <button onClick={handleFullScreen} className={styles.playerButton}>
            <AiOutlineFullscreen size={'2rem'} />
          </button>
          <button onClick={handleMuteToggle} className={styles.playerButton}>
            {
              isMuted 
                ? <IoVolumeMuteOutline size={'2rem'} />
                : <IoVolumeOffOutline size={'2rem'} />
            }
          </button>
          <button onClick={handleVolumeDown} className={styles.playerButton}>
            <IoVolumeLowOutline size={'2rem'} />
          </button>
          <button onClick={handleVolumeUp} className={styles.playerButton}>
            <IoVolumeHighOutline size={'2rem'} />
          </button>
        </div>

      </div>
    </div>
  )
}
