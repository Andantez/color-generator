import { useState} from 'react';
import styled from 'styled-components';

const SingleColor = ({ weight, hex, index, rgb }) => {
  const [alert, setAlert] = useState(true);
  const hexColor = `#${hex}`;
  const rgbColor = rgb.join(',')
  return (
    <article style={{background: `rgb(${rgbColor})`}}>
      <p>{weight}</p>
      <p>{hexColor}</p>
      {alert && <p>copied to clipboard</p> }
    </article>
  )
}

export default SingleColor;