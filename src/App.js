import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Values from 'values.js';
import SingleColor from './SingleColor';
import { FaGithub } from 'react-icons/fa';
import Form from './Form';
import Modal from './Modal';
import { fadeIn } from './Animation';
const App = () => {
  const [colors, setColors] = useState(new Values('#de5648').all(10));
  const [userInput, setUserInput] = useState('');
  const [error, setError] = useState(false);
  const [colorWeight, setColorWeight] = useState(10);
  const [mainColor, setMainColor] = useState('#de5648');
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userInput) {
      return;
    }
    try {
      setError(false);
      const colorsList = new Values(userInput).all(colorWeight);
      setColors(colorsList);
      setMainColor(userInput);
    } catch (error) {
      setError(true);
    }
  };

  const generateRandomColor = () => {
    const randomColor = `#${Math.floor(Math.random() * 2 ** 24)
      .toString(16)
      .padStart(6, '0')}`;
    setColors(new Values(randomColor).all(colorWeight));
    setMainColor(randomColor);
  };

  const handleColorRange = (e) => {
    setColorWeight((oldValue) => {
      let tempValue = Number(e.target.value);
      if (tempValue < 2) {
        return oldValue;
      } else {
        return tempValue;
      }
    });
  };
  // Sets colors when user changes the color weight
  useEffect(() => {
    setColors(new Values(mainColor).all(colorWeight));
  }, [colorWeight, mainColor]);

  // Clean up
  useEffect(() => {
    const cleanUpFunc = setTimeout(() => {
      setError(false);
    }, 3000);

    return () => clearTimeout(cleanUpFunc);
  }, [error]);

  // Prevents from scrolling the page when the modal is open
  useEffect(() => {
    if (modalIsOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [modalIsOpen]);
  return (
    <Wrapper mainColor={mainColor} className="main-container">
      {modalIsOpen && (
        <div
          onClick={() => setModalIsOpen(false)}
          className={`modal-container ${modalIsOpen && 'show-modal'}`}
        >
          <Modal setModalIsOpen={setModalIsOpen} />
        </div>
      )}
      <a
        href="https://github.com/Andantez/color-generator"
        target="_blank"
        rel="noreferrer"
      >
        <FaGithub className="github" />
      </a>
      <header>
        <h1>
          <a href="/">Tint & Shade Generator</a>
        </h1>
      </header>
      <Form
        handleSubmit={handleSubmit}
        error={error}
        mainColor={mainColor}
        userInput={userInput}
        setUserInput={setUserInput}
        generateRandomColor={generateRandomColor}
        colorWeight={colorWeight}
        handleColorRange={handleColorRange}
        setModalIsOpen={setModalIsOpen}
      />
      <section className="container">
        {colors.map((color, index) => {
          return <SingleColor {...color} key={index} hex={color.hex} />;
        })}
      </section>
    </Wrapper>
  );
};
const Wrapper = styled.main`
  height: 100vh;
  width: 80vw;
  margin: 0 auto;
  display: grid;
  position: relative;
  header {
    background: linear-gradient(
      to right,
      #e07034,
      #de5648,
      #d3405c,
      #c0326f,
      #a32f7f
    );
    box-shadow: -6px -6px 10px rgba(255, 255, 255, 0.8),
      6px 6px 10px rgba(0, 0, 0, 0.2);
    border-radius: 5px;
    padding: 0 3rem;
    margin: 3rem auto;
  }
  h1 {
    font-size: 4rem;
    margin: 0;
    text-shadow: 2px 2px #080808;
    font-family: 'Indie Flower', cursive;
    a {
      text-decoration: none;
      color: #fff;
    }
  }

  .container {
    display: grid;
    min-height: calc(100vh - 100px);
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    grid-auto-rows: max-content;
    margin-top: 5rem;
  }
  .github {
    position: absolute;
    right: 0;
    top: 0.5rem;
    font-size: 2rem;
    color: #080808;
    transition: transform 0.5s linear;
    &:hover {
      transform: scale(1.5);
      transition: transform 0.5s linear;
    }
  }

  .modal-container {
    display: grid;
    place-items: center;
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.32);
    z-index: -1;
    visibility: hidden;
    animation: ${fadeIn} 0.25s linear;
    overflow: hidden;
  }

  .show-modal {
    visibility: visible;
    z-index: 10;
  }
  @media screen and (max-width: 353px) {
    header h1 a {
      font-size: 2rem;
    }

    .btn,
    .random-btn {
      padding: 0 10px;
    }
  }
  @media screen and (max-width: 576px) {
    width: 100vw;
    header {
      margin: 0 auto;
      height: auto;
      display: grid;
      place-items: center;
      text-align: center;
    }
    header h1 {
      font-size: 3rem;
    }
    .form-container form label {
      font-size: 1.3rem;
    }
    .form-container {
      width: 95vw;
      margin: 2rem auto;
    }
    .container {
      grid-template-columns: 1fr;
      grid-auto-rows: 7.5rem;
      width: 100vw;

      article {
        position: relative;
      }
      .btn,
      .random-btn {
        padding: 0 10px;
      }
      .fadeIn,
      .copy-container {
        margin-top: 0;
      }
    }
  }

  @media screen and (max-width: 768px) {
    width: 100vw;
    header {
      margin: 0;
      height: auto;
      display: grid;
      place-items: center;
      text-align: center;
    }
    header h1 a {
      font-size: 3rem;
    }
    .container {
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      grid-auto-rows: 10rem;
      width: 95vw;
      margin: 2rem auto;
    }
    .fadeIn,
    .copy-container {
      margin-top: 1rem;
    }
    .btn,
    .random-btn {
      padding: 5px 10px;
    }
  }
  @media screen and (max-width: 320px) {
    header h1 a {
      font-size: 1.4rem;
    }
    .form-container {
      width: 95vw;
      margin: 1.5rem auto;
    }
    .container {
      width: 100vw;
    }
  }
`;
export default App;
