import React from 'react';
import styled from 'styled-components';
import { FaVideo } from 'react-icons/fa';

const HeaderContainer = styled.header`
  width: 100%;
  padding: 20px 0;
  background-color: #1a1d23;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 24px;
  font-weight: bold;
  color: #61dafb;
`;

const Header = () => {
  return (
    <HeaderContainer>
      <Logo>
        <FaVideo />
        <span>React Video Editor</span>
      </Logo>
    </HeaderContainer>
  );
};

export default Header;
