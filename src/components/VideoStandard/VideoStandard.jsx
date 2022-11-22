import { Video } from './Video'
import { VideoControls } from './VideoControls'
import { useVideo } from './useVideo'
import styles from './VideoStandard.module.css'

export function VideoStandard() {
  const { videoRef, isPlaying, currentTime } = useVideo()

  return (
    <div className={styles.VideoStandard}>
      <Video videoRef={videoRef} />
      <VideoControls 
        videoRef={videoRef} 
        isPlaying={isPlaying} 
        currentTime={currentTime}
      />
    </div>
  );
}