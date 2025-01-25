import React, { useState } from "react";
import "./App.css";

function App() {
  const [initialMoney, setInitialMoney] = useState(0);
  const [minutesPerRound, setMinutesPerRound] = useState(1);
  const [bets, setBets] = useState({
    haribot: 0,
    siborg: 0,
    babyBuster: 0,
    honeydroid: 0,
    popstron: 0,
  });
  const [currentBalance, setCurrentBalance] = useState(0); // tracks the current balance (changes every round)
  const [finalBalanceHistory, setFinalBalanceHistory] = useState([]); // store final balances for each round 
  const [currentBalanceHistory, setCurrentBalanceHistory] = useState([]); // store current balance (final from prev round)
  const [rounds, setRounds] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [playTime, setPlayTime] = useState(0);
  const [counter, setCounter] = useState(0);

  const winLoseMatrix = [
    ["WIN", "WIN", "WIN", "WIN", "WIN"],
    ["WIN", "LOSE", "WIN", "WIN", "LOSE"],
    ["LOSE", "LOSE", "LOSE", "WIN", "LOSE"],
    ["WIN", "WIN", "WIN", "LOSE", "LOSE"],
    ["LOSE", "LOSE", "LOSE", "WIN", "WIN"],
    ["WIN", "WIN", "LOSE", "WIN", "LOSE" ],
    ["WIN", "WIN", "WIN", "LOSE", "WIN"],
    ["WIN", "LOSE", "LOSE", "WIN", "WIN"],
    ["LOSE", "WIN", "LOSE", "LOSE", "WIN"],
    ["WIN", "LOSE", "WIN", "WIN", "LOSE"],
    ["LOSE", "LOSE", "LOSE", "LOSE", "WIN"],
    ["WIN", "WIN", "LOSE", "WIN", "LOSE"],
    ["LOSE", "LOSE", "LOSE", "LOSE", "WIN"],
    ["WIN", "LOSE", "WIN", "WIN", "LOSE"],
    ["LOSE", "LOSE", "LOSE", "WIN", "WIN"],
    ["LOSE", "LOSE", "WIN", "LOSE", "LOSE"],
    ["WIN", "WIN", "WIN", "LOSE", "WIN"],
    ["LOSE", "WIN", "LOSE", "WIN", "WIN"],
    ["WIN", "WIN", "WIN", "WIN", "WIN"],
    ["LOSE", "LOSE", "WIN", "LOSE", "LOSE"],
    ["WIN", "WIN", "WIN", "WIN", "LOSE"],
    ["LOSE", "LOSE", "LOSE", "LOSE", "WIN"],
    ["WIN", "WIN", "LOSE", "LOSE", "LOSE"],
    ["LOSE", "LOSE", "WIN", "WIN", "WIN"],
    ["WIN", "LOSE", "LOSE", "LOSE", "WIN"],
    ["LOSE", "WIN", "LOSE", "WIN", "LOSE"],
    ["WIN", "LOSE", "WIN", "WIN", "WIN"],
    ["LOSE", "WIN", "WIN", "LOSE", "WIN"],
    ["LOSE", "WIN", "LOSE", "LOSE", "LOSE"],
    ["LOSE", "WIN", "LOSE", "WIN", "LOSE"],
    ["WIN", "LOSE", "WIN", "LOSE", "WIN"],
    ["LOSE", "WIN", "WIN", "LOSE", "LOSE"],
    ["WIN", "LOSE", "LOSE", "WIN", "LOSE"],
    ["WIN", "WIN", "WIN", "LOSE", "LOSE"],
    ["LOSE", "LOSE", "LOSE", "WIN", "WIN"],
    ["WIN", "WIN", "WIN", "LOSE", "LOSE"],
    ["LOSE", "WIN", "LOSE", "LOSE", "WIN"],
    ["LOSE", "LOSE", "WIN", "WIN", "WIN"],
    ["WIN", "WIN", "WIN", "LOSE", "LOSE"],
    ["WIN", "LOSE", "LOSE", "LOSE", "LOSE"],
    ["LOSE", "WIN", "WIN", "LOSE", "LOSE"],
    ["LOSE", "WIN", "LOSE", "WIN", "LOSE"],
    ["WIN", "LOSE", "WIN", "WIN", "WIN"],
    ["LOSE", "WIN", "WIN", "LOSE", "LOSE"],
    ["WIN", "LOSE", "LOSE", "WIN", "WIN"],
    ["WIN", "WIN", "WIN", "LOSE", "LOSE"],
    ["LOSE", "WIN", "LOSE", "WIN", "WIN"],
    ["WIN", "LOSE", "WIN", "LOSE", "WIN"],
    ["LOSE", "LOSE", "LOSE", "WIN", "LOSE"],
    ["LOSE", "LOSE", "LOSE", "LOSE", "LOSE"]
  ];

  const handleSimulate = () => {
    if (!gameStarted) {

      // Start the game: Set the initial balance and record the first current balance
      setCurrentBalance(initialMoney); // Set initial balance when first simulated
      setCurrentBalanceHistory([initialMoney]); // Store initial balance as the first "current" balance
  
      // Compute outcome for the first round
      let updatedBalance = initialMoney; // Start with the initial balance
      const spin = Math.floor(Math.random() * 50); // Generate a random spin between 1-50
      const results = winLoseMatrix[spin];
  
      let roundOutcome = 0;
      const outcomeArray = results.map((result, index) => {
        const bet = Object.values(bets)[index];
        if (result === "WIN") {
          roundOutcome += bet;
          updatedBalance += bet; // Add the bet to the balance if WIN
        } else {
          roundOutcome -= bet;
          updatedBalance -= bet; // Subtract the bet from the balance if LOSE
        }
        return { result, bet, outcome: result === "WIN" ? bet : -bet };
      });
      setCurrentBalance(updatedBalance);
      // Save the final balance after the first round
      setFinalBalanceHistory([updatedBalance]); // Only set final balance after computing round outcomes
      setRounds((prevRounds) => [
        ...prevRounds,
        {
          round: 1,
          spin: spin + 1,
          outcomes: outcomeArray,
          roundOutcome,
          finalBalance: updatedBalance,
        },
      ]);
  
      // Increment counter for the next round
      setCounter(1);
      setGameStarted(true); // Mark the game as started
    } else {
      // For subsequent rounds, use the last final balance as the current balance
      const previousFinalBalance = finalBalanceHistory[counter - 1];
      setCurrentBalance(previousFinalBalance); // Set the balance for the next round
      setCurrentBalanceHistory((prevCurrentBalanceHistory) => [
        ...prevCurrentBalanceHistory,
        previousFinalBalance,
      ]);
  
      // Compute the outcome for the current round
      let updatedBalance = previousFinalBalance; // Start with the previous round's final balance
      const spin = Math.floor(Math.random() * 50); // Generate a random spin between 1-50
      const results = winLoseMatrix[spin];
  
      let roundOutcome = 0;
      const outcomeArray = results.map((result, index) => {
        const bet = Object.values(bets)[index];
        if (result === "WIN") {
          roundOutcome += bet;
          updatedBalance += bet; // Add the bet to the balance if WIN
        } else {
          roundOutcome -= bet;
          updatedBalance -= bet; // Subtract the bet from the balance if LOSE
        }
        return { result, bet, outcome: result === "WIN" ? bet : -bet };
      });
      setCurrentBalance(updatedBalance);
      // Save the final balance after computing the outcome
      setFinalBalanceHistory((prevBalanceHistory) => [
        ...prevBalanceHistory,
        updatedBalance,
      ]);
      setRounds((prevRounds) => [
        ...prevRounds,
        {
          round: counter + 1,
          spin: spin + 1,
          outcomes: outcomeArray,
          roundOutcome,
          finalBalance: updatedBalance,
        },
      ]);
      
      // Increment counter for the next round
      setCounter(counter + 1);
    }
  
    // Update playtime (assumed to increment based on each round)
    setPlayTime((prevTime) => prevTime + minutesPerRound);
  };
  

  const handleRestart = () => {
    setCurrentBalance(initialMoney);
    setFinalBalanceHistory([initialMoney]); // Reset the final balance history array
    setCurrentBalanceHistory([initialMoney]); // Reset the current balance history
    setRounds([]);
    setPlayTime(0);
    setGameStarted(false); // Reset game state
  };

  return (
    <div className="app-container">
      {/* Left Side */}
      <div className="left-panel">
        {/*<img src="/GDSC-Logo.png" className="game-logo" alt="Game Logo" />*/}
        <img src="/Game-Title.png" className="game-logo" alt="Game Logo" />
        <div className="left-inner-panel">
          <div className="left-left-panel">
            
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

          <div className="left-right-panel">
          <form className="money-time-form">
              <label>
                Initial Money:
                <input
                  type="number"
                  min="0"
                  className="input-field"
                  value={initialMoney}
                  onChange={(e) => {
                    const value = e.target.value;
                    setInitialMoney(value === '' ? 0 : parseInt(value, 10));
                  }}
                  disabled={gameStarted} // Disable input once the game starts
                />
              </label>
              <label>
                Minutes per Round:
                <input
                  type="number"
                  min="1"
                  className="input-field"
                  value={minutesPerRound}
                  onChange={(e) => {
                    const value = e.target.value;
                    setMinutesPerRound(value === '' ? 1 : parseInt(value, 10));
                  }}
                  disabled={gameStarted} // Disable input once the game starts
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
        </div>

        <div className="play-time">
        <h4>Total Play Time: {playTime} minutes</h4>
          <h5>
            You have been {finalBalanceHistory[counter - 1] - initialMoney >= 0 ? "winning" : "losing"}:
            ${Math.abs(finalBalanceHistory[counter - 1] - initialMoney) > 0 && playTime > 0 
              ? (Math.abs(finalBalanceHistory[counter - 1] - initialMoney) / playTime).toFixed(2) 
              : "0.00"} per minute
          </h5>
          <h5>
            You have been {finalBalanceHistory[counter - 1] - initialMoney >= 0 ? "winning" : "losing"}:
            ${counter > 0 
              ? (Math.abs(finalBalanceHistory[counter - 1] - initialMoney) / counter).toFixed(2) 
              : "0.00"} per round
          </h5>
        </div>
      </div>

      {/* Right Side */}
      <div className="right-panel">
        <img src="/Haribots.png" className="haribots-image" alt="Game Illustration" />
        <div className="player-win-details">
          <h3>Starting Balance: {initialMoney}</h3>
          <h3>Current Balance: {gameStarted ? currentBalance : initialMoney}</h3>
          <h3>Won/Lost: {gameStarted ? currentBalance - initialMoney : 0}</h3>
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
                <td>{currentBalanceHistory[index]}</td> {/* Display current dynamic balance */}
                <td>{finalBalanceHistory[index]}</td> {/* Display final balance (fixed) */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
