import './App.scss';

import Header from './components/header.js';
import Builder from './components/builder.js';

function App() {
  return (
    <div className="app">
      <Header />
      <hr />
      <Builder />
    </div>
  );
}

export default App;
