import React, { useRef } from 'react';
import styled from 'styled-components';
import { FaUpload } from 'react-icons/fa';

const UploadContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
  border: 2px dashed #61dafb;
  border-radius: 8px;
  background-color: rgba(97, 218, 251, 0.05);
  cursor: pointer;
  transition: all 0.3s ease;
  min-height: 300px;

  &:hover {
    background-color: rgba(97, 218, 251, 0.1);
  }
`;

const UploadIcon = styled.div`
  font-size: 48px;
  color: #61dafb;
  margin-bottom: 20px;
`;

const UploadText = styled.p`
  font-size: 18px;
  color: #ffffff;
  margin-bottom: 10px;
`;

const UploadSubtext = styled.p`
  font-size: 14px;
  color: #a0a0a0;
`;

const HiddenInput = styled.input`
  display: none;
`;

const VideoUpload = ({ onVideoUpload }) => {
  const fileInputRef = useRef(null);

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('video/')) {
      onVideoUpload(file);
    } else {
      alert('Please select a valid video file.');
    }
  };

  return (
    <UploadContainer onClick={handleClick}>
      <UploadIcon>
        <FaUpload />
      </UploadIcon>
      <UploadText>Click to upload a video</UploadText>
      <UploadSubtext>or drag and drop a video file here</UploadSubtext>
      <HiddenInput
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="video/*"
      />
    </UploadContainer>
  );
};

export default VideoUpload;
