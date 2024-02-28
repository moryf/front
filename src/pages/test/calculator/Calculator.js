import React, { useState } from 'react';

const Calculator = () => {
  const [formula, setFormula] = useState('');
  const [width, setWidth] = useState(0);
  const [length, setLength] = useState(0);
  const [depth, setDepth] = useState(0);
  const [result, setResult] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setFormula(e.target.value);
  };

  const calculateLength = () => {
    try {
        const replacedFormula = formula
        .replace(/w/g, width)
        .replace(/l/g, length)
        .replace(/d/g, depth);
      const calculatedResult = eval(replacedFormula);
      if (isNaN(calculatedResult)) {
        setErrorMessage('Invalid formula');
      } else {
        setResult(calculatedResult);
        setErrorMessage('');
      }
    } catch (error) {
      setErrorMessage('Invalid formula');
    }
  };

  return (
    <div>
      <p>Enter formula using w for width, l for length, and d for depth.</p>
      <input
        type="text"
        value={formula}
        onChange={handleChange}
        placeholder="Example: (w + l) * 2 + d"
      />
      <br />
      <label>Width: </label>
      <input
        type="number"
        value={width}
        onChange={(e) => setWidth(parseFloat(e.target.value))}
      />
      <br />
      <label>Length: </label>
      <input
        type="number"
        value={length}
        onChange={(e) => setLength(parseFloat(e.target.value))}
      />
      <br />
      <label>Depth: </label>
      <input
        type="number"
        value={depth}
        onChange={(e) => setDepth(parseFloat(e.target.value))}
      />
      <br />
      <button onClick={calculateLength}>Calculate Length</button>
      <br />
      {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
      {typeof result === 'number' && !isNaN(result) && (
        <div>Result: {result}</div>
      )}
    </div>
  );
};

export default Calculator;
