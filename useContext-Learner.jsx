// App.jsx
import React, { createContext, useState, useEffect } from "react";
import CompA from "./CompA";

export const myName = createContext();
export const myName1 = createContext();
export const myFun = createContext();

export default function App() {
  const [count, setCount] = useState(0);
  const [timer, setTimer] = useState(0);
  const [timerId, setTimerId] = useState(null);

  useEffect(() => {
    // Start the timer when the component mounts
    const id = setInterval(() => {
      setTimer((prevTimer) => prevTimer + 1);
    }, 1000);

    // Save the timer ID for later cleanup
    setTimerId(id);

    // Cleanup function to stop the timer when the component unmounts
    return () => clearInterval(id);
  }, []);

  const counterObject = {
    value: count,
    increment: () => setCount(count + 1),
    decrement: () => setCount(count - 1),
    timer,
    resetTimer: () => setTimer(0),
    startTimer: () => {
      if (!timerId) {
        const id = setInterval(() => {
          setTimer((prevTimer) => prevTimer + 1);
        }, 1000);
        setTimerId(id);
      }
    },
    stopTimer: () => {
      if (timerId) {
        clearInterval(timerId);
        setTimerId(null);
      }
    },
  };

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <myName.Provider
        value={
          "I am Krishnat Mahajan and I am a front-end developer using React"
        }
      >
        <myName1.Provider
          value={"I want to learn backend technology as a MERN stack developer"}
        >
          <myFun.Provider value={counterObject}>
            <CompA />
          </myFun.Provider>
        </myName1.Provider>
      </myName.Provider>
    </div>
  );
}


// CompC.jsx

import React, { useContext } from "react";
import { myFun, myName, myName1 } from "./App";

function CompC() {
  const myNamed = useContext(myName);
  const myNamed1 = useContext(myName1);
  const {
    value,
    increment,
    decrement,
    timer,
    resetTimer,
    startTimer,
    stopTimer,
  } = useContext(myFun);

  return (
    <>
      <h1>This is Component C </h1>
      <p>{myNamed}</p>
      <p>{myNamed1}</p>
      <p>Timer: {timer} seconds</p>
      <button onClick={resetTimer}>Reset Timer</button>
      <button onClick={startTimer}>Start Timer</button>
      <button onClick={stopTimer}>Stop Timer</button>
      <p>Count: {value} </p>
      <button onClick={increment}> + </button>
      <button onClick={decrement}> - </button>
    </>
  );
}

export default CompC;
