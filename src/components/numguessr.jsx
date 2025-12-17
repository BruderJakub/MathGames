import { useState } from 'react';


function NumGuessr() {
    const [secretNumber, setSecretNumber] = useState(() => Math.floor(Math.random() * 100) + 1);
    const [eliminatedNumbers, setEliminatedNumbers] = useState([]);
    const [isEven, setIsEven] = useState(null);
    const [isSmaller, setIsSmaller] = useState({ input: '', result: null });
    const [isBigger, setIsBigger] = useState({ input: '', result: null });
    const [isDivisible, setIsDivisible] = useState({ input: '', result: null });
    const [modulo, setModulo] = useState({ input: '', result: null });
    const [isPrime, setIsPrime] = useState(null);
    const [solution, setSolution] = useState({ input: '', result: null });
    const [msg, setMsg] = useState('');

    const handleNumberClick = (number) => {
        if (!eliminatedNumbers.includes(number)) {
            setEliminatedNumbers([...eliminatedNumbers, number]);
        } else {
            setEliminatedNumbers(eliminatedNumbers.filter((n) => n !== number));
        }
    };

    const handleModuloInputChange = (e) => {
        const value = e.target.value;
        if (value === '' || (/^[1-5]$/.test(value) && value.length === 1)) {
            setModulo({ ...modulo, input: value });
        }
    };

    const checkEven = () => setIsEven(secretNumber % 2 === 0);
    const checkSmaller = () => setIsSmaller({ ...isSmaller, result: secretNumber < parseInt(isSmaller.input) });
    const checkBigger = () => setIsBigger({ ...isBigger, result: secretNumber > parseInt(isBigger.input) });
    const checkDivisible = () => setIsDivisible({ ...isDivisible, result: secretNumber % parseInt(isDivisible.input) === 0 });
    const checkModulo = () => setModulo({ ...modulo, result: secretNumber % parseInt(modulo.input) });
    const checkPrime = () => {
        if (secretNumber <= 1) {
            setIsPrime(false);
            return;
        }
        for (let i = 2; i < secretNumber; i++) {
            if (secretNumber % i === 0) {
                setIsPrime(false);
                return;
            }
        }
        setIsPrime(true);
    };
    const checkSolution = () => {
        if (secretNumber == parseInt(solution.input)) {
            setMsg('You guessed correctly! :D');
        } else {
            setMsg('You guessed wrong! D:');
        }
    };

    return (
        <div className="num-guessr-container">
            <div className="grid-container">
                {Array.from({ length: 100 }, (_, i) => i + 1).map((number) => (
                    <div
                        key={number}
                        className={`grid-number ${eliminatedNumbers.includes(number) ? 'eliminated' : ''}`}
                        onClick={() => handleNumberClick(number)}
                    >
                        <span>{number}</span>
                    </div>
                ))}
            </div>
            <div className="questions-container">
                <div className="question">
                    <button onClick={checkEven}>Is the number even or odd?</button>
                    {isEven !== null && <p>{isEven ? 'Even' : 'Odd'}</p>}
                </div>
                <div className="question">
                    <input
                        type="number"
                        value={isSmaller.input}
                        onChange={(e) => setIsSmaller({ ...isSmaller, input: e.target.value })}
                        placeholder="Enter a number"
                    />
                    <button onClick={checkSmaller}>Is the number smaller than the input?</button>
                    {isSmaller.result !== null && <p>{isSmaller.result ? 'Yes' : 'No'}</p>}
                </div>
                <div className="question">
                    <input
                        type="number"
                        value={isBigger.input}
                        onChange={(e) => setIsBigger({ ...isBigger, input: e.target.value })}
                        placeholder="Enter a number"
                    />
                    <button onClick={checkBigger}>Is this number bigger than the input?</button>
                    {isBigger.result !== null && <p>{isBigger.result ? 'Yes' : 'No'}</p>}
                </div>
                <div className="question">
                    <input
                        type="number"
                        value={isDivisible.input}
                        onChange={(e) => setIsDivisible({ ...isDivisible, input: e.target.value })}
                        placeholder="Enter a number"
                    />
                    <button onClick={checkDivisible}>Is this number divisible by the input?</button>
                    {isDivisible.result !== null && <p>{isDivisible.result ? 'Yes' : 'No'}</p>}
                </div>
                <div className="question">
                    <input
                        type="number"
                        value={modulo.input}
                        onChange={handleModuloInputChange}
                        placeholder="Enter a number 1-5"
                    />
                    <button onClick={checkModulo}>What is the rest if the number is modulo'd by the input?</button>
                    {modulo.result !== null && <p>{modulo.result}</p>}
                </div>
                <div className="question">
                    <button onClick={checkPrime}>Is the number a prime number?</button>
                    {isPrime !== null && <p>{isPrime ? 'Yes' : 'No'}</p>}
                </div>
                <div className="question">
                    <input
                        type="number"
                        value={solution.input}
                        onChange={(e) => setSolution({ ...solution, input: e.target.value })}
                        placeholder="Enter a number"
                    />
                    <button onClick={checkSolution}>Enter your number</button>
                    {msg}
                </div>
            </div>
        </div>
    );
}

export default NumGuessr;