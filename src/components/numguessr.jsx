import { useState } from 'react';
import './NumGuessr.css'

const initialState = {
    secretNumber: Math.floor(Math.random() * 100) + 1,
    eliminatedNumbers: [],
    isEven: null,
    isSmaller: { input: '', result: null },
    isBigger: { input: '', result: null },
    isDivisible: { input: '', result: null },
    modulo: { input: '', result: null },
    isPrime: null,
    solution: { input: '', result: null },
    msg: '',
};

function NumGuessr() {
    const [state, setState] = useState(initialState);

    const handleNumberClick = (number) => {
        setState((prevState) => ({
            ...prevState,
            eliminatedNumbers: prevState.eliminatedNumbers.includes(number)
                ? prevState.eliminatedNumbers.filter((n) => n !== number)
                : [...prevState.eliminatedNumbers, number],
        }));
    };

    const handleInputChange = (field, value) => {
        setState((prevState) => ({
            ...prevState,
            [field]: { ...prevState[field], input: value },
        }));
    };
    
    const handleModuloInputChange = (e) => {
        const value = e.target.value;
        if (value === '' || (/^[1-5]$/.test(value) && value.length === 1)) {
            handleInputChange('modulo', value);
        }
    };

    const checkEven = () => setState((prevState) => ({ ...prevState, isEven: prevState.secretNumber % 2 === 0 }));
    const checkSmaller = () => setState((prevState) => ({ ...prevState, isSmaller: { ...prevState.isSmaller, result: prevState.secretNumber < parseInt(prevState.isSmaller.input) } }));
    const checkBigger = () => setState((prevState) => ({ ...prevState, isBigger: { ...prevState.isBigger, result: prevState.secretNumber > parseInt(prevState.isBigger.input) } }));
    const checkDivisible = () => setState((prevState) => ({ ...prevState, isDivisible: { ...prevState.isDivisible, result: prevState.secretNumber % parseInt(prevState.isDivisible.input) === 0 } }));
    const checkModulo = () => setState((prevState) => ({ ...prevState, modulo: { ...prevState.modulo, result: prevState.secretNumber % parseInt(prevState.modulo.input) } }));
    const checkPrime = () => {
        if (state.secretNumber <= 1) {
            setState((prevState) => ({ ...prevState, isPrime: false }));
            return;
        }
        for (let i = 2; i < state.secretNumber; i++) {
            if (state.secretNumber % i === 0) {
                setState((prevState) => ({ ...prevState, isPrime: false }));
                return;
            }
        }
        setState((prevState) => ({ ...prevState, isPrime: true }));
    };
    const checkSolution = () => {
        if (state.secretNumber == parseInt(state.solution.input)) {
            setState((prevState) => ({ ...prevState, msg: 'You guessed correctly! :D' }));
        } else {
            setState((prevState) => ({ ...prevState, msg: 'You guessed wrong! D:' }));
        }
    };

    const resetGame = () => {
        setState({
            ...initialState,
            secretNumber: Math.floor(Math.random() * 100) + 1,
        });
    };

    return (
        <div className="num-guessr-container">
            <div className="title">
                <h2>NumGuessr</h2>
                <p>Guess the number!</p>
            </div>
            <div className="num-guessr-css">
                <div className="grid-container">
                    {Array.from({ length: 100 }, (_, i) => i + 1).map((number) => (
                        <div
                            key={number}
                            className={`grid-number ${state.eliminatedNumbers.includes(number) ? 'eliminated' : ''}`}
                            onClick={() => handleNumberClick(number)}
                        >
                            <span>{number}</span>
                        </div>
                    ))}
                </div>
                <div className="questions-container">
                    <div className="question">
                        <button onClick={checkEven}>Is the number even or odd?</button>
                        {state.isEven !== null && <p>{state.isEven ? 'Even' : 'Odd'}</p>}
                    </div>
                    <div className="question">
                        <input
                            type="number"
                            value={state.isSmaller.input}
                            onChange={(e) => handleInputChange('isSmaller', e.target.value)}
                            placeholder="Enter a number"
                        />
                        <button onClick={checkSmaller}>Is the number smaller than the input?</button>
                        {state.isSmaller.result !== null && <p>{state.isSmaller.result ? 'Yes' : 'No'}</p>}
                    </div>
                    <div className="question">
                        <input
                            type="number"
                            value={state.isBigger.input}
                            onChange={(e) => handleInputChange('isBigger', e.target.value)}
                            placeholder="Enter a number"
                        />
                        <button onClick={checkBigger}>Is this number bigger than the input?</button>
                        {state.isBigger.result !== null && <p>{state.isBigger.result ? 'Yes' : 'No'}</p>}
                    </div>
                    <div className="question">
                        <input
                            type="number"
                            value={state.isDivisible.input}
                            onChange={(e) => handleInputChange('isDivisible', e.target.value)}
                            placeholder="Enter a number"
                        />
                        <button onClick={checkDivisible}>Is this number divisible by the input?</button>
                        {state.isDivisible.result !== null && <p>{state.isDivisible.result ? 'Yes' : 'No'}</p>}
                    </div>
                    <div className="question">
                        <input
                            type="number"
                            value={state.modulo.input}
                            onChange={handleModuloInputChange}
                            placeholder="Enter a number 1-5"
                        />
                        <button onClick={checkModulo}>What is the rest if the number is modulo'd by the input?</button>
                        {state.modulo.result !== null && <p>{state.modulo.result}</p>}
                    </div>
                    <div className="question">
                        <button onClick={checkPrime}>Is the number a prime number?</button>
                        {state.isPrime !== null && <p>{state.isPrime ? 'Yes' : 'No'}</p>}
                    </div>
                    <div className="question">
                        <input
                            type="number"
                            value={state.solution.input}
                            onChange={(e) => handleInputChange('solution', e.target.value)}
                            placeholder="Enter a number"
                        />
                        <button onClick={checkSolution}>Enter your number</button>
                        {state.msg}
                    </div>
                    <div className="question">
                        <button onClick={resetGame}>New Game</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NumGuessr;