import React from 'react';
import styled from 'styled-components';
import { FaPlay, FaPause, FaCut, FaUpload } from 'react-icons/fa';

const ControlsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin: 20px 0;
`;

const ControlButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px 20px;
  background-color: ${props => props.primary ? '#61dafb' : '#2c3e50'};
  color: ${props => props.primary ? '#000' : '#fff'};
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  opacity: ${props => props.disabled ? 0.6 : 1};
  transition: all 0.2s ease;

  &:hover {
    background-color: ${props => props.primary ? '#4db6e5' : '#3a506b'};
    transform: ${props => props.disabled ? 'none' : 'translateY(-2px)'};
  }

  &:active {
    transform: ${props => props.disabled ? 'none' : 'translateY(0)'};
  }
`;

const VideoControls = ({ 
  isPlaying, 
  onPlayPause, 
  onTrim, 
  isProcessing,
  onNewVideo
}) => {
  return (
    <ControlsContainer>
      <ControlButton onClick={onPlayPause}>
        {isPlaying ? <FaPause /> : <FaPlay />}
        {isPlaying ? 'Pause' : 'Play'}
      </ControlButton>
      
      <ControlButton 
        primary 
        onClick={onTrim} 
        disabled={isProcessing}
      >
        <FaCut />
        {isProcessing ? 'Processing...' : 'Trim Video'}
      </ControlButton>
      
      <ControlButton onClick={onNewVideo}>
        <FaUpload />
        Upload New Video
      </ControlButton>
    </ControlsContainer>
  );
};

export default VideoControls;
