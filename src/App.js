import React from "react";
import "./App.css";


function App() {
  return (
    <div className="app-container">
      {/* Left Side */}
      <div className="left-panel">

        <img src="/GDSC-Logo.png" className="game-logo" alt="Game Logo" />
        <h1 className="game-title">Monte Carlo Game</h1>

        <div className="left-inner-panel">
          <div className="left-left-panel">
            <form className="money-time-form">
              <label>
                Initial Money:
                <input type="number" min="0" className="input-field" />
              </label>
              <label>
                Minutes per Round:
                <input type="number" min="1" className="input-field" />
              </label>
            </form>

            <div className="buttons">
              <button className="action-button">Simulate</button>
              <button className="action-button">Restart Game</button>
            </div>
          </div>
          
          <div className="left-right-panel">
            <form className="betting-form">
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
            </form>
          </div>
        </div>

        <div className="play-time">
            <strong>Total Play Time:</strong> 30 minutes {/* Replace with dynamic value */}
        </div>
        

        
      </div>

      {/* Right Side */}
      <div className="right-panel">
        <img src="/Haribots.png" className="game-image" alt="Game Illustration" />
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
