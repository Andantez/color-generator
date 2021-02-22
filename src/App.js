import { useState } from 'react';
import styled from 'styled-components';
import Values from 'values.js';

const App = () => {
  const [colors, setColors] = useState('');
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
    <main>
      <h3>Color Shades Generator</h3>
      <section>
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
    </main>
  );
};

export default App;
