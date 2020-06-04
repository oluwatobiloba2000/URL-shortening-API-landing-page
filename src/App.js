import React from 'react';
import Nav from './components/nav';
import headerSvg from './images/illustration-working.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="container bg-white">
        <Nav/>
        <div className="mid-header">
          <div className="introductory-text-container">
            <h1>More than just shorter links</h1>
            <h5>Build your brand’s recognition and get detailed insights on how your links are performing.</h5>
            <button>Get Started</button>
          </div>
          <div className="home-svg">
            <img src={headerSvg} alt="working illustration"/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
