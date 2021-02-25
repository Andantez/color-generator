import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FaCheck } from 'react-icons/fa';
import { AiOutlineCopy } from 'react-icons/ai';
import { fadeIn, fadeOut } from './Animation';

const SingleColor = ({ weight, hex, rgb, type }) => {
  const [alert, setAlert] = useState(false);
  const [showIcon, setShowIcon] = useState(true)
  const hexColor = `#${hex}`;
  const rgbColor = rgb.join(',');

  // Copy color hex value to clipboard on Click
  const handleCopy = () => {
    setAlert(true);
    navigator.clipboard.writeText(hexColor);
  };

  // Clean up timeout function
  useEffect(() => {
    const clearAlert = setTimeout(() => {
      setAlert(false);
      setShowIcon(true)
    }, 2000);

    return () => clearTimeout(clearAlert);
  }, [alert]);

  return (
    <Wrapper
      onClick={() => {
        handleCopy();
        setShowIcon(false);
      }}
      type={type}
      style={{ background: `rgb(${rgbColor})` }}
    >
      <p>{weight}%</p>
      <p>{hexColor}</p>
      {showIcon && (
        <p className="copy-container">
          <AiOutlineCopy className="copy-icon" />
        </p>
      )}
      {alert && (
        <p className="fadeIn">
          <FaCheck className="check" />
        </p>
      )}
    </Wrapper>
  );
};


const Wrapper = styled.article`
  /* Adapt the text color based on type prop for better Visability and Readability  */

  padding: 1rem 2rem;
  font-family: 'RocknRoll One', sans-serif;
  color: ${(props) => props.type === 'shade' && '#fff'};
  cursor: pointer;
  .check {
    width: 35px;
    height: 35px;
    border-color: transparent;
    border-radius: 50%;
  }

  .fadeIn {
    margin-top: 2rem;
    text-align: center;
    animation: ${fadeIn} 0.5s, ${fadeOut} 0.5s 2.7s;
  }
  .copy-container {
    margin-top: 2rem;
    text-align: center;
    animation: ${fadeIn} 0.5s;
  }
  .copy-icon {
    width: 35px;
    height: 35px;
    color: ${(props) => props.type === 'tint' && '#080808'};
    transform: scaleX(-1);
  }
  p {
    margin-bottom: 10px;
    letter-spacing: 1.5px;
  }
`;
export default SingleColor;
