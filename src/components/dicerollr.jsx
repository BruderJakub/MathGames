import { useEffect, useState } from "react";
import './DiceRoller.css'

function Dicerollr() {
    const [playerVal, setPlayerVal] = useState(0);
    const [botVal, setBotVal] = useState(0);
    const [rollMsg, setRollMsg] = useState('');
    const [playerorbot, setPlayerorbot] = useState(true);
    const [botTurn, setBotTurn] = useState(0);
    const [playerTurn, setPlayerTurn] = useState(0);
    const [winMsg, setWinMsg] = useState('');

    const botMove = () => {
        if (botTurn >= 7) return;

        const remainingTurns = 7 - botTurn;
        const targetDistance = 50 - botVal;
        const neededPerTurn = targetDistance / remainingTurns;
        let newerBotDice;

        if (neededPerTurn > 8.5) newerBotDice = 20;
        else if (neededPerTurn > 6.0) newerBotDice = 12;
        else if (neededPerTurn > 5.0) newerBotDice = 10;
        else if (neededPerTurn > 4.0) newerBotDice = 8;
        else if (neededPerTurn > 3.0) newerBotDice = 6;
        else newerBotDice = 4;

        if (remainingTurns === 1 && botVal > playerVal && botVal <= 50) {
            newerBotDice = 4;
        }

        const newRoll = Math.floor(Math.random() * newerBotDice) + 1;

        setRollMsg('The bot rolled a ' + newRoll + '!');
        setBotVal(prev => prev + newRoll);
        setBotTurn(prev => prev + 1);
        setPlayerorbot(true);
    };

    useEffect(() => {
        if (!playerorbot && botTurn < 7 && winMsg === '') {
            const timer = setTimeout(() => {
                botMove();
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [playerorbot]);

    const rollDice = (diceType) => {
        if (playerorbot && playerTurn < 7) {
            const newRoll = Math.floor(Math.random() * diceType) + 1;
            setRollMsg('You rolled a ' + newRoll + '!');
            setPlayerVal(prev => prev + newRoll);
            setPlayerTurn(prev => prev + 1);
            setPlayerorbot(false);
        }
    };

    useEffect(() => {
        if (playerTurn >= 7 && botTurn >= 7) {
            const plr = Math.abs(50 - playerVal);
            const bot = Math.abs(50 - botVal);
            if (plr < bot) setWinMsg('You won!');
            else if (plr > bot) setWinMsg('Bot won!');
            else setWinMsg('Tie!');
        }
    }, [playerTurn, botTurn, playerVal, botVal]);

    const restart = () => {
        setBotTurn(0)
        setBotVal(0)
        setPlayerTurn(0)
        setPlayerVal(0)
        setPlayerorbot(true);
        setRollMsg('')
    }

    return (
        <>
            <div className="title">
                <h2>DiceRollr</h2>
                <p>Roll different die to get as close to 50 as possible.</p>
            </div>
            <div className="win">
                <h3>{winMsg}</h3>
            </div>
            <div className="rollers">
                <p>{rollMsg}</p>
                <div className="game-area">
                    <div className="player">
                        <div className="playerDisplay">
                            <p>Your score: {playerVal} (Turns: {playerTurn}/7)</p>
                        </div>
                        <div className="playerButtons">
                            {[4, 6, 8, 10, 12, 20].map((d) => (
                                <button
                                    key={d}
                                    className="playerButton"
                                    disabled={!playerorbot || playerTurn >= 7}
                                    onClick={() => rollDice(d)}
                                >
                                    Roll a d{d}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="bot">
                        <p>Bot's score: {botVal} (Turns: {botTurn}/7)</p>
                        {!playerorbot && botTurn < 7 && <p><i>Bot is throwing...</i></p>}
                    </div>
                </div>
            </div>
            <div className="rollers">
                <button className="playerButton" onClick={() => restart()}>New Game</button>
            </div>
        </>
    );
}

export default Dicerollr;