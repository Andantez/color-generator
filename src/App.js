import { useState } from 'react';
import styled from 'styled-components';
import Values from 'values.js';
import SingleColor from './SingleColor';

const App = () => {
  const [colors, setColors] = useState(new Values('#4287f5').all(10));
  const [userInput, setUserInput] = useState('');
  const [error, setError] = useState(false);


  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userInput) {
      return;
    }
    try {
      const colorsList = new Values(userInput).all(10);
      console.log(colorsList)
      setColors(colorsList);
    } catch (error) {
      setError(true);
    }
  };
  return (
    <Wrapper>
      <header>
        <h1>
          <a href="/">Color Shades Generator</a>
        </h1>
      </header>
      <section className="form-container">
        <form onSubmit={handleSubmit}>
          <label htmlFor="color">enter hex color</label>
          <input
            type="text"
            id="color"
            placeholder="#4287f5"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
          />
          <button type="submit">Submit</button>
        </form>
      </section>
      <section>
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
      text-transform: capitalize;
      font-size: 2rem;
      font-family: 'RocknRoll One', sans-serif;

      label {
        margin: 0 1rem;
        color: #080808;
      }

      input {
        min-width: 300px;
        font-size: 1.2rem;
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

      button {
        margin-left: 0.2rem;
        width: 150px;
        background: #080808;
        color: #fff;
        border-top-right-radius: 13px;
        border-bottom-right-radius: 13px;
        font-size: 1.1rem;
        border: none;
        font-family: 'RocknRoll One', sans-serif;
        &:hover {
          background: #a32f7f;
        }
      }
    }
  }
`;
export default App;
