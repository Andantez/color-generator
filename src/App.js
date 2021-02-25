import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Values from 'values.js';
import SingleColor from './SingleColor';
import { fadeIn, fadeOut } from './Animation';
import { FaGithub } from 'react-icons/fa';

const App = () => {
  const [colors, setColors] = useState(new Values('#de5648').all(10));
  const [userInput, setUserInput] = useState('');
  const [error, setError] = useState(false);
  const [colorWeight, setColorWeight] = useState(10);
  const [mainColor, setMainColor] = useState('#de5648');

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
  return (
    <Wrapper mainColor={mainColor} className="main-container">
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
      <section className="form-container">
        <form onSubmit={handleSubmit}>
          {error && (
            <p className="error fadeIn">Please Provide Valid Hex Color</p>
          )}
          <label htmlFor="color">enter hex color</label>
          <input
            className={`user-input ${error && 'show'}`}
            type="text"
            id="color"
            placeholder={mainColor}
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
          />
          <button type="submit" className="btn">
            Submit
          </button>
          <button
            type="button"
            onClick={generateRandomColor}
            className="random-btn"
          >
            Generate Random Color
          </button>
          <div className="form-control">
            <h4>Color Weight</h4>
            <div>
              <input
                className="range-input"
                type="range"
                min="2"
                max="50"
                value={colorWeight}
                onChange={handleColorRange}
              />
              <span className="range-value">{colorWeight}%</span>
            </div>
          </div>
        </form>
      </section>
      <section className="container">
        {colors.map((color, index) => {
          return <SingleColor {...color} key={index} hex={color.hex} />;
        })}
      </section>
    </Wrapper>
  );
};
const Wrapper = styled.main`
  width: 90vw;
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
  .form-container {
    display: grid;
    margin-top: 3rem;

    form {
      display: grid;
      gap: 20px;
      grid-template-columns: 1fr 1fr;
      grid-template-areas:
        'label label'
        'input input'
        'submitBtn randomBtn'
        'range range';
      margin: 0 auto;
      position: relative;
      text-transform: capitalize;
      font-family: 'RocknRoll One', sans-serif;
      text-align: center;
      label {
        margin: 0 1rem;
        color: #080808;
        font-size: 1.5rem;
        grid-area: label;
        /* position: relative; */
      }

      .user-input {
        grid-area: input;
        min-width: 300px;
        font-size: 1.1rem;
        padding-left: 0.5rem;
        border: 1px solid #a3a6a3;
        border-radius: 5px;
        font-family: 'RocknRoll One', sans-serif;
        &:focus {
          outline: none;
          border-radius: 5px;
          border: 2px solid #080808;
        }
      }
      .show {
        border: 2px solid #d3405c;
      }
    }
  }
  .btn,
  .random-btn {
    margin-left: 0.2rem;
    width: 150px;
    background: #080808;
    color: #fff;
    border-radius: 5px;
    font-size: 0.8rem;
    border: none;
    font-family: 'RocknRoll One', sans-serif;
    border: 2px solid #080808;
    &:hover {
      background: #a32f7f;
      cursor: pointer;
    }
    &:focus {
      outline: none;
      border: 2px solid #080808;
    }
  }
  .random-btn {
    width: fit-content;
    padding: 0 10px;
    grid-area: randomBtn;
  }
  .btn {
    grid-area: submitBtn;
    min-width: 100%;
  }
  .btn:active,
  .random-btn:active {
    box-shadow: inset -4px -4px 8px rgba(182, 152, 174, 0.5),
      inset 8px 8px 16px rgba(0, 0, 0, 0.1);
  }
  .form-control {
    grid-area: range;
    max-width: 100%;

    h4 {
      font-size: 1.2rem;
      margin: 0.7rem 0;
      color: #080808;
    }
    div {
      display: flex;
    }

    .range-input {
      flex-grow: 1;

      &:focus {
        outline: none;
      }
    }
    /* Input - Range styles */
    input[type='range'] {
      -webkit-appearance: none;
      width: 100%;
      background: transparent;
    }
    input[type='range']::-webkit-slider-thumb {
      -webkit-appearance: none;
      border: 1px solid #080808;
      height: 36px;
      width: 36px;
      border-radius: 50%;
      background: ${(props) => props.mainColor};
      cursor: pointer;

      margin-top: -14px;
      box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
    }

    input[type='range']::-webkit-slider-runnable-track {
      width: 100%;
      height: 8.4px;
      cursor: pointer;
      box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
      background: #080808;
      border-radius: 5px;
      border: 0.2px solid #010101;
    }
    input[type='range']:focus::-webkit-slider-runnable-track {
      background: #080808;
    }
    /* ---------------------------- */
    .range-value {
      background: #fff;
      padding: 10px;
      border-radius: 5px;
      margin-left: 10px;
      min-width: 60px;
      border: 2px solid #080808;
    }
  }
  .error {
    position: absolute;
    left: 18%;
    top: -40px;
    font-family: 'RocknRoll One', sans-serif;
    color: #d3405c;
  }
  .fadeIn {
    animation: ${fadeIn} 0.5s, ${fadeOut} 0.5s 2.7s;
  }
  .container {
    display: grid;
    min-height: calc(100vh - 100px);
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    grid-auto-rows: 15rem;
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
  @media screen and (max-width: 353px) {
    header h1 a {
      font-size: 2rem;
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
