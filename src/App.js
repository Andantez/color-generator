import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Values from 'values.js';
import SingleColor from './SingleColor';

const App = () => {
  const [colors, setColors] = useState(new Values('#4287f5').all(10));
  const [userInput, setUserInput] = useState('');
  const [error, setError] = useState(false);
  // TODO - Find a proper variable name
  const [randomC, setRandomC] = useState('');
  // -----------------------------------
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userInput) {
      return;
    }
    try {
      setError(false);
      const colorsList = new Values(userInput).all(10);
      console.log(colorsList);
      setColors(colorsList);
    } catch (error) {
      setError(true);
    }
  };

  // TODO- Change handleSubmit to handle the random color generation
  // if not to fix generateRandomColor to handle Errors
  const generateRandomColor = () => {
    const randomColor = `#${Math.floor(Math.random() * 2 ** 24)
      .toString(16)
      .padStart(6, '0')}`;
    setRandomC(randomColor);
    setColors(new Values(randomColor).all(10));
  };

  useEffect(() => {
    const cleanUpFunc = setTimeout(() => {
      setError(false);
    }, 3000);

    return () => clearTimeout(cleanUpFunc);
  }, [error]);
  return (
    <Wrapper>
      <header>
        <h1>
          <a href="/">Color Shades Generator</a>
        </h1>
      </header>
      <section className="form-container">
        <form onSubmit={handleSubmit}>
          {error && (
            <p className="error fadeIn">Please Provide Valid Hex Color</p>
          )}
          <label htmlFor="color">enter hex color</label>
          <input
            className={`${error && 'show'}`}
            type="text"
            id="color"
            placeholder="#4287f5"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
          />
          <button type="submit">Submit</button>
        </form>
        {/* Generates Random Coolor On Click
            Functionality working
            TODO- ADD styling 
            --------------------
            <button type="button" onClick={generateRandomColor}> Generate Random Color</button>
            <h3>{randomC}</h3>
            --------------------
        */}
      </section>
      <section className="container">
        {colors.map((color, index) => {
          return (
            <SingleColor {...color} key={index} index={index} hex={color.hex} />
          );
        })}
      </section>
    </Wrapper>
  );
};
const Wrapper = styled.main`
  width: 90vw;
  margin: 0 auto;
  display: grid;

  header {
    background: linear-gradient(
      to right,
      #e07034,
      #de5648,
      #d3405c,
      #c0326f,
      #a32f7f
    );
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
      display: flex;
      position: relative;
      text-transform: capitalize;
      font-family: 'RocknRoll One', sans-serif;

      label {
        margin: 0 1rem;
        color: #080808;
        font-size: 1.5rem;
      }

      input {
        min-width: 300px;
        font-size: 1.1rem;
        padding-left: 0.5rem;
        border: 1px solid #a3a6a3;
        border-top-left-radius: 13px;
        border-bottom-left-radius: 13px;
        font-family: 'RocknRoll One', sans-serif;
        &:focus {
          border-top-left-radius: 13px;
          border-bottom-left-radius: 13px;
          outline: none;
          border: 2px solid #080808;
        }
      }
      .show {
        border: 2px solid #d3405c;
      }
      button {
        margin-left: 0.2rem;
        width: 150px;
        background: #080808;
        color: #fff;
        border-top-right-radius: 13px;
        border-bottom-right-radius: 13px;
        font-size: 1rem;
        border: none;
        font-family: 'RocknRoll One', sans-serif;
        &:hover {
          background: #a32f7f;
        }
        &:focus {
          outline: none;
          border: 2px solid #080808;
        }
      }
    }
  }

  .error {
    position: absolute;
    left: 250px;
    top: -40px;
    font-family: 'RocknRoll One', sans-serif;
    color: #d3405c;
  }

  .fadeIn {
    animation: fadeInAnimation 0.5s, fadeOutAnimation 0.5s 2.7s;
  }

  @keyframes fadeInAnimation {
    from {
      transform: scale(0);
    }
    to {
      transform: scale(1);
    }
  }
  @keyframes fadeOutAnimation {
    from {
      transform: scale(1);
    }
    to {
      transform: scale(0);
    }
  }
  .container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    grid-template-rows: repeat(auto-fit, 1fr);
    margin-top: 3rem;
  }
`;
export default App;
