import React, { useState } from "react";
import "./App.css";

function App() {
  // Initial state for bets and money
  const [initialMoney, setInitialMoney] = useState(0);
  const [minutesPerRound, setMinutesPerRound] = useState(1);

  // State for bets (using an object for dynamic key-value pairs)
  const [bets, setBets] = useState({
    haribot: 0,
    siborg: 0,
    babyBuster: 0,
    honeydroid: 0,
    popstron: 0,
  });

  const [balance, setBalance] = useState(0);
  const [playTime, setPlayTime] = useState(0);
  const [rounds, setRounds] = useState([]);

  const winLoseMatrix = [
    ["WIN", "WIN", "WIN", "WIN", "WIN"],
    ["WIN", "LOSE", "WIN", "WIN", "LOSE"],
    ["LOSE", "WIN", "LOSE", "WIN", "LOSE"],
    ["WIN", "WIN", "WIN", "LOSE", "LOSE"],
    ["LOSE", "LOSE", "LOSE", "WIN", "WIN"],
  ];

  const handleSimulate = () => {
    // Generate a random spin between 1-5
    const spin = Math.floor(Math.random() * 5);

    // Get results based on the spin
    const results = winLoseMatrix[spin];
    
    // Calculate outcomes and update balance
    let roundOutcome = 0;
    let updatedBalance = balance;
    
    const outcomeArray = results.map((result, index) => {
      const bet = Object.values(bets)[index];
      if (result === "WIN") {
        roundOutcome += bet;
        updatedBalance += bet;
      } else {
        roundOutcome -= bet;
        updatedBalance -= bet;
      }
      return { result, bet, outcome: result === "WIN" ? bet : -bet };
    });

    // Update rounds and balance
    setBalance(updatedBalance);
    setPlayTime((prevTime) => prevTime + minutesPerRound);
    setRounds((prevRounds) => [
      ...prevRounds,
      {
        round: prevRounds.length + 1,
        spin: spin + 1,
        outcomes: outcomeArray,
        roundOutcome,
        finalBalance: updatedBalance,
      },
    ]);
  };

  const handleRestart = () => {
    setBalance(initialMoney);
    setPlayTime(0);
    setRounds([]);
  };

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
                <input
                  type="number"
                  min="0"
                  className="input-field"
                  onChange={(e) => setInitialMoney(parseInt(e.target.value))}
                />
              </label>
              <label>
                Minutes per Round:
                <input
                  type="number"
                  min="1"
                  className="input-field"
                  onChange={(e) => setMinutesPerRound(parseInt(e.target.value))}
                />
              </label>
            </form>

            <div className="buttons">
              <button className="action-button" onClick={handleSimulate}>
                Simulate
              </button>
              <button className="action-button" onClick={handleRestart}>
                Restart Game
              </button>
            </div>
          </div>

          <div className="left-right-panel">
            <form className="betting-form">
              {Object.keys(bets).map((bot, index) => (
                <label key={index}>
                  Bet for {bot.charAt(0).toUpperCase() + bot.slice(1)} ($):
                  <input
                    type="number"
                    min="0"
                    className="input-field"
                    value={bets[bot]}
                    onChange={(e) =>
                      setBets({ ...bets, [bot]: Number(e.target.value) })
                    }
                  />
                </label>
              ))}
            </form>
          </div>
        </div>

        <div className="play-time">
          <h4>Total Play Time: {playTime} minutes</h4> 
          <h4>On average, </h4> 
          <h5>You have been winning/losing: ___ per minute</h5>
          <h5>You have been winning/losing: ___ per round</h5>
        </div>
      </div>

      {/* Right Side */}
      <div className="right-panel">
        <img src="/Haribots.png" className="game-image" alt="Game Illustration" />
        <div className = "player-win-details">
          <h3>Starting Balance: 1000</h3>
          <h3>Current Balance: 500</h3>
          <h3>Won/Lost: -500</h3>
        </div>
        <table className="results-table">
          <thead>
            <tr>
              <th>Round</th>
              <th>Spin</th>
              {/* First Row: Bot Names */}
              {Object.keys(bets).map((bot, index) => (
                <th key={index}>
                  <div>{bot.charAt(0).toUpperCase() + bot.slice(1)}</div> {/* Bot Name */}
                  <div>{bets[bot] > 0 ? `Current Bet: $${bets[bot]}` : "$0"}</div> {/* Current Bet */}
                </th>
              ))}
              <th>Outcome</th>
              <th>Balance</th>
              <th>Final</th>
            </tr>
          </thead>

          <tbody>
            {rounds.map((round, index) => (
              <tr key={index}>
                <td>{round.round}</td>
                <td>#{round.spin}</td>
                {round.outcomes.map((outcome, i) => (
                  <td key={i}>
                    {outcome.result} (${outcome.bet})
                  </td>
                ))}
                <td>{round.roundOutcome}</td>
                <td>{balance}</td>
                <td>{round.finalBalance}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
