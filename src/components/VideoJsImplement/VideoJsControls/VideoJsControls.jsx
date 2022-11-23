// @ts-check

import React, { useEffect, useState } from "react";

/**
 * @typedef {import('video.js').VideoJsPlayer} VideoJsPlayer
 */

/** 
 * @param {Number} secs 
 * */
 function formatTime(secs) {
  const secsInt = Math.floor(secs)
  if (secsInt >= 3600) 
    return new Date(secsInt * 1000).toISOString().substring(11, 16)
  else
    return new Date(secsInt * 1000).toISOString().substring(14, 19)
}

/**
 * @param {Object} props 
 * @param {VideoJsPlayer} props.player
 */
export function VideoJsControls({ player }) {
  const [isPlayerHidden, setIsPlayerHidden] = useState(false)
  const [isPlayerMutted, setIsPlayerMutted] = useState(false)
  const [isPlayerPaused, setIsPlayerPaused] = useState(true)
  const [remainingTime, setRemainingTime] = useState('')

  useEffect(() => {
    function handlePlayerTimeUpdate() {
      setRemainingTime(formatTime(player.remainingTime()))
    }
    player.on('timeupdate', handlePlayerTimeUpdate)
    
    return () => {
      player.off('timeupdate', handlePlayerTimeUpdate)
    }
  }, [player])


  function handleHide() {
    player.hide()
    setIsPlayerHidden(true)
  }

  function handleShow() {
    player.show()
    setIsPlayerHidden(false)
  }

  function handleVolumeUp() {
    const currVol = player.volume()
    const newVol = Math.min(currVol + 0.1, 1)
    player.volume(newVol)
  }

  function handleVolumeDown() {
    const currVol = player.volume()
    const newVol = Math.max(currVol - 0.1, 0)
    player.volume(newVol)
  }

  function handleMute() {
    player.muted(true)
    setIsPlayerMutted(true)
  }

  function handleUnMute() {
    player.muted(false)
    setIsPlayerMutted(false)
  }

  function handleFullScreen() {
    player.requestFullscreen()
  }

  function handlePlay() {
    player.play()
    setIsPlayerPaused(false)
  }

  function handlePause() {
    player.pause()
    setIsPlayerPaused(true)
  }

  function handleStop() {
    handlePause()
    player.currentTime(0)
  }

  function handleFastForward() {
    const currTime = player.currentTime()
    const newTime = Math.min(currTime + 10, player.duration())
    player.currentTime(newTime)
  }

  function handleRewind() {
    const currTime = player.currentTime()
    const newTime = Math.max(currTime - 10, 0)
    player.currentTime(newTime)
  }

  return (
    <div>
      {
        isPlayerHidden
          ? <button onClick={handleShow}>Show</button>
          : <button onClick={handleHide}>Hide</button>
      }
      {
        isPlayerMutted
          ? <button onClick={handleUnMute}>Unmute</button>
          : <button onClick={handleMute}>Mute</button>

      }      
      <button onClick={handleVolumeUp}>VolumeUp</button>
      <button onClick={handleVolumeDown}>VolumeDown</button>
      <button onClick={handleFullScreen}>FullScreen</button>
      {
        isPlayerPaused
          ? <button onClick={handlePlay}>Play</button>
          : <button onClick={handlePause}>Pause</button>
      }  
      <button onClick={handleStop}>Stop</button>
      <button onClick={handleFastForward}>FastForward</button>
      <button onClick={handleRewind}>Rewind</button>
      <span>{ remainingTime }</span>
    </div>
  )
}