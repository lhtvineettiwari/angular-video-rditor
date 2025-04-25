import React, { useState, useEffect } from 'react';
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile } from '@ffmpeg/util';
import VideoPlayer from './components/VideoPlayer';
import VideoControls from './components/VideoControls';
import VideoTimeline from './components/VideoTimeline';
import VideoUpload from './components/VideoUpload';
import Header from './components/Header';
import './App.css';

const ffmpeg = new FFmpeg();

function App() {
  const [isFFmpegLoaded, setIsFFmpegLoaded] = useState(false);
  const [videoFile, setVideoFile] = useState(null);
  const [videoUrl, setVideoUrl] = useState('');
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [trimStart, setTrimStart] = useState(0);
  const [trimEnd, setTrimEnd] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const loadFFmpeg = async () => {
      try {
        ffmpeg.on('log', ({ message }) => {
          console.log(message);
        });
        
        await ffmpeg.load();
        setIsFFmpegLoaded(true);
      } catch (error) {
        console.error('Failed to load FFmpeg:', error);
      }
    };
    loadFFmpeg();
  }, []);

  const handleVideoUpload = (file) => {
    const url = URL.createObjectURL(file);
    setVideoFile(file);
    setVideoUrl(url);
    setTrimStart(0);
    setTrimEnd(0);
  };

  const handleDurationChange = (duration) => {
    setDuration(duration);
    setTrimEnd(duration);
  };

  const handleTrim = async () => {
    if (!videoFile || !isFFmpegLoaded) return;

    setIsProcessing(true);
    try {
      await ffmpeg.writeFile('input.mp4', await fetchFile(videoFile));

      await ffmpeg.exec([
        '-i', 'input.mp4',
        '-ss', `${trimStart}`,
        '-to', `${trimEnd}`,
        '-c:v', 'copy',
        '-c:a', 'copy',
        'output.mp4'
      ]);

      const data = await ffmpeg.readFile('output.mp4');
      
      const blob = new Blob([data.buffer], { type: 'video/mp4' });
      const url = URL.createObjectURL(blob);
      
      setVideoUrl(url);
      setVideoFile(new File([blob], 'trimmed_video.mp4', { type: 'video/mp4' }));
      setCurrentTime(0);
      setTrimStart(0);
      setTrimEnd(duration);
    } catch (error) {
      console.error('Error during video trimming:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="App">
      <Header />
      <div className="video-editor-container">
        {!videoFile ? (
          <VideoUpload onVideoUpload={handleVideoUpload} />
        ) : (
          <>
            <VideoPlayer 
              videoUrl={videoUrl} 
              isPlaying={isPlaying}
              currentTime={currentTime}
              onTimeUpdate={setCurrentTime}
              onDurationChange={handleDurationChange}
            />
            <VideoTimeline 
              duration={duration}
              currentTime={currentTime}
              trimStart={trimStart}
              trimEnd={trimEnd}
              onTrimStartChange={setTrimStart}
              onTrimEndChange={setTrimEnd}
            />
            <VideoControls 
              isPlaying={isPlaying}
              onPlayPause={() => setIsPlaying(!isPlaying)}
              onTrim={handleTrim}
              isProcessing={isProcessing}
              onNewVideo={() => {
                setVideoFile(null);
                setVideoUrl('');
              }}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
