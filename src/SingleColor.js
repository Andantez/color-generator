import { useEffect, useState } from 'react';
import styled from 'styled-components';

const SingleColor = ({ weight, hex, index, rgb }) => {
  const [alert, setAlert] = useState(false);
  const hexColor = `#${hex}`;
  const rgbColor = rgb.join(',');

  const handleCopy = () => {
    setAlert(true);
    navigator.clipboard.writeText(hexColor);
    console.log(hexColor);
  };

  useEffect(() => {
    const clearAlert = setTimeout(() => {
      setAlert(false);
    }, 3000);

    return () => clearTimeout(clearAlert);
  }, [alert]);
  return (
    <Wrapper
      onClick={handleCopy}
      index={index}
      style={{ background: `rgb(${rgbColor})` }}
    >
      <p>{weight}%</p>
      <p>{hexColor}</p>
      {alert && <p>copied to clipboard</p>}
    </Wrapper>
  );
};

const Wrapper = styled.article`
  /* Adapt the color based on index prop for better Visability and Readability  */

  height: 200px;
  padding: 1rem 2rem;
  font-family: 'RocknRoll One', sans-serif;
  color: ${(props) => props.index > 10 && '#fff'};

  p {
    margin-bottom: 10px;
    letter-spacing: 1.5px;
  }
`;
export default SingleColor;
