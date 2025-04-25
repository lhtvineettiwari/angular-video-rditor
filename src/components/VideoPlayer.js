import React, { useEffect, useRef } from 'react';
import ReactPlayer from 'react-player';
import styled from 'styled-components';

const PlayerContainer = styled.div`
  width: 100%;
  margin-bottom: 20px;
  position: relative;
  aspect-ratio: 16/9;
  background-color: #000;
  border-radius: 4px;
  overflow: hidden;
`;

const VideoPlayer = ({ 
  videoUrl, 
  isPlaying, 
  currentTime, 
  onTimeUpdate, 
  onDurationChange 
}) => {
  const playerRef = useRef(null);

  useEffect(() => {
    if (playerRef.current) {
      playerRef.current.seekTo(currentTime);
    }
  }, [currentTime]);

  const handleProgress = (state) => {
    onTimeUpdate(state.playedSeconds);
  };

  const handleDuration = (duration) => {
    onDurationChange(duration);
  };

  return (
    <PlayerContainer>
      <ReactPlayer
        ref={playerRef}
        url={videoUrl}
        width="100%"
        height="100%"
        playing={isPlaying}
        controls={false}
        onProgress={handleProgress}
        onDuration={handleDuration}
        progressInterval={100}
      />
    </PlayerContainer>
  );
};

export default VideoPlayer;
