

import './App.css';

function App() {
  
  return (
    <div className="App">
      <h1>Hello there!</h1>
      <button onClick={() => (alert("Hello world!"))} data-cy="btn-hello">Click me!</button>
    </div>
  );
}

export default App;
