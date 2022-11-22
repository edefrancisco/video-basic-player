import './App.css'
import { VideoJsImplement } from './components/VideoJsImplement/VideoJsImplement'
import { VideoStandard } from './components/VideoStandard'

export default function App() {
  return (
    <div className="App">
      <h2>Video Js</h2>
      <VideoJsImplement />
      <h2>Video Standard</h2>
      <VideoStandard />
      <br />
      <br />
    </div>
  )
}