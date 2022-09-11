import React, { useState } from "react";
import ReactDOM from "react-dom";
import './App.scss';

function addZero(i) {
  if (i < 10) {i = "0" + i}
  return i;
};


function App() {
  const [currentTimer, setCurrentTimer] = useState("Session");
  const [sessionLength, setSessionLength] = useState(25);
  const [breakLength, setBreakLength] = useState(5);
  const [mins, setMins] = useState(addZero(sessionLength));
  const [secs, setSecs] = useState(addZero(0));
  const [counter, setCounter] = useState();
  const [currentMins, setCurrentMins] = useState(sessionLength);
  const [currentSecs, setCurrentSecs] = useState(60)
  const [isRunning, setIsRunning] = useState(false)
  const alarm = document.getElementById('beep')  
  
  function sessionMin() {
    if (sessionLength <= 1 || isRunning) {
      return;
    } else {
      return setSessionLength(sessionLength - 1), setMins(addZero(sessionLength - 1), setCurrentMins(sessionLength - 1));
    }
  };
  function sessionMax() {
    if (sessionLength >= 60 || isRunning) {
      return;
    } else {
      return setSessionLength(sessionLength + 1), setMins(addZero(sessionLength + 1), setCurrentMins(sessionLength + 1));
    }
  };
  function breakMin() {
    if (breakLength <= 1 || isRunning) {
      return;
    } else {
      return setBreakLength(breakLength - 1);
    }
  };
  function breakMax() {
    if (breakLength >= 60 || isRunning) {
      return;
    } else {
      return setBreakLength(breakLength + 1);
    }
  };
  
  let start;
  let nuSecs = currentSecs;
  let nuMins = currentMins;
  let nuTimer = currentTimer;
  function accurateTimer() {
    let delta = Date.now() - start; // milliseconds elapsed since start
    let seconds = (Math.floor(delta / 1000)); // in seconds
    if (seconds == 1) {
      nuSecs -= 1;
      start = Date.now();
      setSecs(addZero(Math.max(0, nuSecs)));
    }
    if (nuSecs == 59 && seconds == 1) {
      nuMins -= 1;
      setMins(addZero(nuMins));
    }
    if (nuSecs == 0 && nuMins != 0) {
      nuSecs = 60;
      setMins(addZero(nuMins));
    } else if (nuSecs == 0 && nuMins == 0) {
      alarm.play();
    }
console.log(nuMins + ":" + nuSecs, currentTimer);
    if (nuSecs == -1 && nuMins == 0) {    
      nuSecs = 60;
      if (nuTimer == "Session") {
        nuMins = breakLength;
        nuTimer = "Break";
        setMins(addZero(nuMins));
        setCurrentTimer(nuTimer);
      } else {
        nuMins = sessionLength;
        nuTimer = "Session";
        setMins(addZero(nuMins));
        setCurrentTimer(nuTimer);
      }
console.log("switchover");
    }
  };
  
  function playPause() {
     if (!counter) {
      start = Date.now();
      return setCounter(setInterval(accurateTimer, 100)), setIsRunning(true);
    } else {
      clearInterval(counter);
      return setCounter(undefined), setCurrentSecs(secs), setCurrentMins(mins), setIsRunning(false);
    }
  };
  
  function reset() {
    clearInterval(counter);
    alarm.pause();
    alarm.currentTime = 0;
    return setCurrentTimer("Session"), setSessionLength(25), setBreakLength(5), setMins(25), setSecs(addZero(0)), setCounter(undefined), setCurrentSecs(60), setCurrentMins(25), setIsRunning(false);
  };
  
  
  return (
    <div id="app-box">
      <div id="clock-box">
        <div id="clock-face">
          <div id="timer-label">{currentTimer}</div>
          <div id="time-left">{mins + ":" + secs}</div>
        </div>
        <div id="session-label">Session Length<br />
          <div id="session-decrement" onClick={sessionMin}><i class="fa-regular fa-circle-play fa-rotate-90"></i></div>&nbsp;&nbsp;
          <div id="session-length">{sessionLength}</div>&nbsp;&nbsp;
          <div id="session-increment" onClick={sessionMax}><i class="fa-regular fa-circle-play fa-rotate-270"></i></div>
        </div>
        <div id="break-label">Break Length<br />
          <div id="break-decrement" onClick={breakMin}><i class="fa-regular fa-circle-play fa-rotate-90"></i></div>&nbsp;&nbsp;
          <div id="break-length">{breakLength}</div>&nbsp;&nbsp;
          <div id="break-increment" onClick={breakMax}><i class="fa-regular fa-circle-play fa-rotate-270"></i></div>
        </div>
        <div id="controls">
          <button id="start_stop" onClick={playPause}><i class="fa-solid fa-play fa-2x"><i class="fa-solid fa-pause"></i></i></button>
          &nbsp;&nbsp;&nbsp;
          <button id="reset" onClick={reset}><i class="fa-solid fa-rotate fa-2x"></i></button>
        </div>
      </div>
      <audio id="beep" preload="auto" src="./churchbells.ogg"></audio>
    </div>
  );
};


ReactDOM.render(<App />, document.getElementById("root"));



export default App;