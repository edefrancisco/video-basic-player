
import './App.css';
import { Video } from './components/Video';
import { VideoControls } from './components/VideoControls';
import { useVideo } from './hooks/useVideo';

function App() {
  const { videoRef, isPlaying, currentTime } = useVideo()

  return (
    <div className="App">
      <Video videoRef={videoRef} />
      <VideoControls 
        videoRef={videoRef} 
        isPlaying={isPlaying} 
        currentTime={currentTime}
      />
    </div>
  );
}

export default App;
