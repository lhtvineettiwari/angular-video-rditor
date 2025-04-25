import React from 'react';
import styled from 'styled-components';

const TimelineContainer = styled.div`
  width: 100%;
  margin: 20px 0;
  padding: 10px 0;
`;

const TimelineTrack = styled.div`
  position: relative;
  width: 100%;
  height: 10px;
  background-color: #3a3f4b;
  border-radius: 5px;
  margin-bottom: 10px;
`;

const TimelineCurrent = styled.div`
  position: absolute;
  height: 100%;
  background-color: #61dafb;
  border-radius: 5px;
  width: ${props => (props.position / props.duration) * 100}%;
`;

const TimelineMarker = styled.div`
  position: absolute;
  top: -5px;
  width: 20px;
  height: 20px;
  background-color: #fff;
  border-radius: 50%;
  transform: translateX(-50%);
  cursor: pointer;
  left: ${props => (props.position / props.duration) * 100}%;
  z-index: 2;
`;

const TrimRegion = styled.div`
  position: absolute;
  height: 100%;
  background-color: rgba(97, 218, 251, 0.3);
  border-radius: 5px;
  left: ${props => (props.start / props.duration) * 100}%;
  width: ${props => ((props.end - props.start) / props.duration) * 100}%;
`;

const TimeDisplay = styled.div`
  display: flex;
  justify-content: space-between;
  color: #a0a0a0;
  font-size: 14px;
`;

const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
};

const VideoTimeline = ({
  duration,
  currentTime,
  trimStart,
  trimEnd,
  onTrimStartChange,
  onTrimEndChange
}) => {
  const handleTrackClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const position = (e.clientX - rect.left) / rect.width;
    const newTime = position * duration;
    
    // Determine if we're closer to the start or end trim marker
    const distToStart = Math.abs(newTime - trimStart);
    const distToEnd = Math.abs(newTime - trimEnd);
    
    if (distToStart < distToEnd) {
      onTrimStartChange(Math.max(0, Math.min(newTime, trimEnd - 1)));
    } else {
      onTrimEndChange(Math.min(duration, Math.max(newTime, trimStart + 1)));
    }
  };

  return (
    <TimelineContainer>
      <TimelineTrack onClick={handleTrackClick}>
        <TimelineCurrent position={currentTime} duration={duration} />
        <TrimRegion start={trimStart} end={trimEnd} duration={duration} />
        <TimelineMarker 
          position={trimStart} 
          duration={duration} 
          title="Trim Start"
        />
        <TimelineMarker 
          position={trimEnd} 
          duration={duration} 
          title="Trim End"
        />
      </TimelineTrack>
      <TimeDisplay>
        <span>Trim Start: {formatTime(trimStart)}</span>
        <span>Current: {formatTime(currentTime)}</span>
        <span>Trim End: {formatTime(trimEnd)}</span>
      </TimeDisplay>
    </TimelineContainer>
  );
};

export default VideoTimeline;
