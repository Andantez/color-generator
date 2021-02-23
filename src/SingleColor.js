import { useEffect, useState } from 'react';
import styled from 'styled-components';

const SingleColor = ({ weight, hex, rgb, type }) => {
  const [alert, setAlert] = useState(false);
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
    }, 3000);

    return () => clearTimeout(clearAlert);
  }, [alert]);

  return (
    <Wrapper
      onClick={handleCopy}
      type={type}
      style={{ background: `rgb(${rgbColor})` }}
    >
      <p>{weight}%</p>
      <p>{hexColor}</p>
      {alert && <p>copied to clipboard</p>}
    </Wrapper>
  );
};

const Wrapper = styled.article`
  /* Adapt the text color based on type prop for better Visability and Readability  */

  padding: 1rem 2rem;
  font-family: 'RocknRoll One', sans-serif;
  color: ${(props) => props.type === 'shade' && '#fff'};

  p {
    margin-bottom: 10px;
    letter-spacing: 1.5px;
  }
`;
export default SingleColor;
