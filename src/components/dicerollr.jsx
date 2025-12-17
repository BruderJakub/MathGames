import {useEffect, useState} from "react";
import './DiceRoller.css'

function Dicerollr() {
    const [playerVal, setPlayerVal] = useState(0);
    const [botVal, setBotVal] = useState(0);
    const [rollMsg, setRollMsg] = useState('');
    const [playerorbot, setPlayerorbot] = useState(true);
    const [botTurn,setBotTurn] = useState(0);
    const [playerTurn, setPlayerTurn] = useState(0)
    const [winMsg, setWinMsg] = useState('');

    const rollDice = (diceType) => {
        const maxRollValue = diceType;
        if (playerorbot == true && playerTurn < 7) {
            const newRoll = Math.floor(Math.random() * maxRollValue) + 1;
            setRollMsg('You rolled a '+ newRoll +'!')
            setPlayerVal(playerVal + newRoll);
            setPlayerorbot(false)
            setPlayerTurn(playerTurn + 1);
        }
        if (playerorbot == false && botTurn < 7) {
            const rngDice = Math.floor(Math.random() * 6) + 1;
            let newerBotDice = 0;
            if (rngDice == 1) {
                 newerBotDice = 4;
            }
            else if (rngDice == 2) {
                newerBotDice = 6;
            }
            else if (rngDice == 3) {
                newerBotDice = 8;
            }
            else if (rngDice == 4) {
                newerBotDice = 10;
            }
            else if (rngDice == 5) {
                newerBotDice = 12;
            }
            else if (rngDice == 6) {
                newerBotDice = 20;
            }
            const newRoll = Math.floor(Math.random() * newerBotDice) + 1;
            setRollMsg('The bot rolled a '+ newRoll +'!')
            setBotVal(botVal + newRoll);
            setPlayerorbot(true)
            setBotTurn(botTurn + 1);
        }
    }

    useEffect(() => {
        if (playerTurn >= 7 && botTurn >= 7) {
            const plr = Math.abs(50 - playerVal);
            const bot = Math.abs(50 - botVal)
            if (plr < bot) {
                setWinMsg('You won!')
            } else if (plr > bot) {
                setWinMsg('Bot won!')
            } else {
                setWinMsg('Tie!')
            }
        }
    }, [playerTurn, botTurn, playerVal, botVal]);

    return (
        <>
            <div className="title">
                <h2>DiceRollr</h2>
                <a>Roll different die to get as close to 50 as possible.</a>
            </div>
            <div className="win">
                <a>{winMsg}</a>
            </div>
            <div className="rollers">
                <a>{rollMsg}</a>
                <div className="game-area">
                    <div className="player">
                        <div className="playerDisplay">
                            <a>Your score: {playerVal}</a>
                        </div>
                        <div className="playerButtons">
                            <button className="playerButton" onClick={() => rollDice(4)}>Roll a d4</button>
                            <button className="playerButton" onClick={() => rollDice(6)}>Roll a d6</button>
                            <button className="playerButton" onClick={() => rollDice(8)}>Roll a d8</button>
                            <button className="playerButton" onClick={() => rollDice(10)}>Roll a d10</button>
                            <button className="playerButton" onClick={() => rollDice(12)}>Roll a d12</button>
                            <button className="playerButton" onClick={() => rollDice(20)}>Roll a d20</button>
                        </div>
                    </div>
                    <div className="bot">
                        <a>Bot's score: {botVal}</a>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dicerollr;