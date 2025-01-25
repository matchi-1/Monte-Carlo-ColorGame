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
  const [gameOver, setGameOver] = useState(false);
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
      // Calculate the total of all bets
    const totalBets = Object.values(bets).reduce((sum, bet) => sum + bet, 0);

    // Check if total bets exceed initial money
    if (totalBets > initialMoney) {
      alert("Total bet amount exceeds your initial balance! Please adjust your bets or initial money.");
      return; // Stop the simulation if the bet amount is invalid
    }
    else if(totalBets == 0){
      alert("Please bet in one or more of the haribons!");
      return;
    }

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
      setTimeout(() => {
        if (updatedBalance <= 0) {
          setGameOver(true);
          alert("Game Over!");
        }
      }, 0);
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
      setTimeout(() => {
        if (updatedBalance <= 0) {
          setGameOver(true);
          alert("Game Over!");
        }
      }, 0);

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
    setGameOver(false);
    setGameStarted(false); // Reset game stat

    setBets({
      haribot: 0,
      siborg: 0,
      babyBuster: 0,
      honeydroid: 0,
      popstron: 0,
    });
  
    setInitialMoney(0);
    setMinutesPerRound(1);
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
              <button className="simulate-button" onClick={handleSimulate}  disabled={gameOver}>
                Simulate
              </button>
              <button className="restart-button" onClick={handleRestart}>
                Restart Game
              </button>
            </div>
          </div>
        </div>

        <div className="play-time">
        <h5>Total Play Time: {playTime} minutes</h5>
          <p>
            You have been {finalBalanceHistory[counter - 1] - initialMoney >= 0 ? "winning" : "losing"}:
            ${Math.abs(finalBalanceHistory[counter - 1] - initialMoney) > 0 && playTime > 0 
              ? (Math.abs(finalBalanceHistory[counter - 1] - initialMoney) / playTime).toFixed(2) 
              : "0.00"} per minute
          </p>
          <p>
            You have been {finalBalanceHistory[counter - 1] - initialMoney >= 0 ? "winning" : "losing"}:
            ${counter > 0 && Math.abs(finalBalanceHistory[counter - 1] - initialMoney) > 0 && playTime > 0
              ? (Math.abs(finalBalanceHistory[counter - 1] - initialMoney) / counter).toFixed(2) 
              : "0.00"} per round
          </p>
        </div>
      </div>

      {/* Right Side */}
      <div className="right-panel">
        <div className="player-win-details">
          <div className="starting_balance_text">
            Starting Balance: ${initialMoney}
          </div>
          <div className="current_balance_text">
  Current Balance: {gameStarted ? (currentBalance < 0 ? `-$${Math.abs(currentBalance)}` : `$${currentBalance}`) : `$${initialMoney}`}
</div>

          <div className="won_lost_text">
            
            {gameStarted
              ? currentBalance - initialMoney >= 0
                ? `Won: $${currentBalance - initialMoney}`
                : `Lost: -$${Math.abs(currentBalance - initialMoney)}`
              : `Won: 0`}
          
          </div>
        </div>

        <div className="haribot-img-wrapper">
          <img src="/Haribots.png" className="haribots-image" alt="Game Illustration" />
        </div>
        
        <div className="table-container">
          <table className="results-table">
            <thead>
              <tr>
                <th>Round</th>
                <th>Spin</th>
                {/* First Row: Bot Names */}
                {Object.keys(bets).map((bot, index) => (
                  <th key={index} className={`color-${index % 5}`}>
                    <div>{bot.charAt(0).toUpperCase() + bot.slice(1)}</div>
                    <div>{bets[bot] > 0 ? `Current Bet: $${bets[bot]}` : "$0"}</div>
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
                  <td>{currentBalanceHistory[index]}</td> 
                  <td>{finalBalanceHistory[index]}</td> 
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
      </div>
    </div>
  );
}

export default App;
