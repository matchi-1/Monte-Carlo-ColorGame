import React from "react";
import "./App.css";
import logo from "./logo.svg"; // Replace with your game logo
//import gameImage from "./game-image.svg"; // Replace with your image for the right side

function App() {
  return (
    <div className="app-container">
      {/* Left Side */}
      <div className="left-panel">
      {/* <img src={logo} className="game-logo" alt="Game Logo" />*/}
        <h1 className="game-title">Monte Carlo Game</h1>

        <form className="betting-form">
          <label>
            Initial Money:
            <input type="number" min="0" className="input-field" />
          </label>
          <label>
            Minutes per Round:
            <input type="number" min="1" className="input-field" />
          </label>
          <label>
            Bet for Haribot:
            <input type="number" min="0" className="input-field" />
          </label>
          <label>
            Bet for Siborg:
            <input type="number" min="0" className="input-field" />
          </label>
          <label>
            Bet for Baby Buster:
            <input type="number" min="0" className="input-field" />
          </label>
          <label>
            Bet for Honeydroid:
            <input type="number" min="0" className="input-field" />
          </label>
          <label>
            Bet for Popstron:
            <input type="number" min="0" className="input-field" />
          </label>
          <label>
            Total Play Time:
            <input type="number" min="1" className="input-field" />
          </label>
        </form>
      </div>

      {/* Right Side */}
      <div className="right-panel">
        {/*<img src={gameImage} className="game-image" alt="Game Illustration" />*/}
        <table className="results-table">
          <thead>
            <tr>
              <th>Round</th>
              <th>Spin</th>
              <th>Haribot [$]</th>
              <th>Siborg [$]</th>
              <th>Baby Buster [$]</th>
              <th>Honeydroid [$]</th>
              <th>Popstron [$]</th>
              <th>Outcome</th>
              <th>Balance</th>
              <th>Final</th>
            </tr>
          </thead>
          <tbody>
            {/* Placeholder for rows */}
            <tr>
              <td>1</td>
              <td>Spin #1</td>
              <td>$50</td>
              <td>$30</td>
              <td>$20</td>
              <td>$10</td>
              <td>$40</td>
              <td>Win</td>
              <td>$150</td>
              <td>Final Balance</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
