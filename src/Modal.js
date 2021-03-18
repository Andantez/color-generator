import { BsArrowReturnRight } from 'react-icons/bs';
import { AiOutlineClose } from 'react-icons/ai';
import { FiExternalLink } from 'react-icons/fi';
import styled from 'styled-components';

const Modal = ({ setModalIsOpen }) => {
  return (
    <Wrapper className="info" onClick={(e) => e.stopPropagation()}>
      <AiOutlineClose
        className="close-btn"
        onClick={() => setModalIsOpen(false)}
      />
      <ul className="">
        <li className="info-header">Accepts &lt;color value&gt;: </li>
        <ul>
          <li>
            <BsArrowReturnRight className="arrow-right" />
            #RGB, #RRGGBB, #RGBA #RRGGBBAA
          </li>
          <li>
            <BsArrowReturnRight className="arrow-right" />
            RGB/A
          </li>
          <li>
            <BsArrowReturnRight className="arrow-right" />
            HSL/A
          </li>
          <li>
            <BsArrowReturnRight className="arrow-right" />
            Pre-defined{' '}
            <a
              href="https://www.w3.org/wiki/CSS/Properties/color/keywords"
              target="_blank"
              rel="noreferrer"
            >
              color keywords <FiExternalLink />{' '}
            </a>{' '}
          </li>
        </ul>
        <li className="info-header">
          Accepted percent point value goes from 1 to 50:
        </li>
        <ul>
          <li>
            <BsArrowReturnRight className="arrow-right" /> 1 will produce 100
            tints and 100 shades
          </li>
          <li>
            <BsArrowReturnRight className="arrow-right" /> 50 will produce 2
            tints and 2 shades
          </li>
        </ul>
      </ul>
    </Wrapper>
  );
};

const Wrapper = styled.article`
  /* width: 90vw; */
  width: 90vw;
  /* height: 30vh; */
  max-width: 620px;
  background: white;
  border-radius: 5px;
  display: grid;
  margin: 0 auto;
  position: relative;
  place-content: center;
  padding: 0 1rem;

  ul {
    list-style: none;
    padding: 0 15px;
    font-family: 'Roboto Mono', monospace;
  }

  .info-header {
    font-size: 1.3rem;
    font-weight: bold;
    margin-top: 1rem;
  }

  li > a {
    color: #c0326f;
    font-weight: bold;
  }

  ul > ul > li:nth-child(1) {
    margin-top: 0.5rem;
  }

  li {
    font-size: 1.1rem;
  }
  ul:nth-child(2) {
    margin-bottom: 1rem;
  }
  .arrow-right {
    color: #a32f7f;
  }

  .close-btn {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 1.5rem;
    color: #c0326f;
    background: transparent;
    cursor: pointer;
  }
`;
export default Modal;
