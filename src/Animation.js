import { keyframes } from 'styled-components';

export const fadeIn = keyframes`
  from {
      transform: scale(0);
    }
    to {
      transform: scale(1);

    }
`;
export const fadeOut = keyframes`
  from {
      transform: scale(1);
      
    }
    to {
      transform: scale(0);
    }
`;
