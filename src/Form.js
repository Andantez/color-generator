import styled from 'styled-components';
import { BiInfoCircle } from 'react-icons/bi';

const Form = ({
  handleSubmit,
  error,
  mainColor,
  userInput,
  setUserInput,
  generateRandomColor,
  colorWeight,
  handleColorRange,
  setModalIsOpen,
}) => {
  return (
    <Wrapper className="form-container" mainColor={mainColor}>
      <form onSubmit={handleSubmit}>
        <BiInfoCircle
          className="showInfo"
          onClick={() => setModalIsOpen(true)}
        />
        <label htmlFor="color">enter valid color value</label>
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
    </Wrapper>
  );
};

export default Form;

const Wrapper = styled.section`
  display: grid;
  margin-top: 0.5rem;
  form {
    position: relative;
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

  .btn,
  .random-btn {
    /* margin-left: 0.2rem; */
    width: 150px;
    background: #080808;
    color: #fff;
    border-radius: 5px;
    font-size: 0.8rem;
    border: none;
    font-family: 'RocknRoll One', sans-serif;
    border: 2px solid #080808;
    padding: 10px 10px;
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
  .showInfo {
    position: absolute;
    right: 0;
    top: 0;
    font-size: 1.4rem;
    color: rgba(0, 0, 0, 0.6);
    background: transparent;
    cursor: pointer;
    border-radius: 50%;
    &:hover {
      background: #fff;
    }
  }
`;
