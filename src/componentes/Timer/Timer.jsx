import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import "./Timer.css";
import listPause from "../ListPause/ListPause";

let defaultTimeRemining = {
  seconds: "00",
  minutes: "00",
  hours: "00",
};
const Timer = ({ timerHours, timerMinutes, timerSeconds }) => {
  const [start, setStart] = useState(false);
  const [remainigTime, setRemainigTime] = useState({
    seconds: timerSeconds,
    minutes: timerMinutes,
    hours: timerHours,
  });
const [listPause, setListPause] = useState([]);

  const [status, setStatus] = useState(0);
  const [color, setColor] = useState("#06f1f6");
  const [fontSize, setFontSize] = useState("70px");
  const [interv, setInterv] = useState();
  let dateTemporizator = dayjs()
    .add(parseInt(remainigTime.seconds), "second")
    .add(parseInt(remainigTime.minutes), "minute")
    .add(parseInt(remainigTime.hours), "hour");

  const handleStart = (bool) => {
    setStatus(1)
    setStart(bool);
    console.log(`me hizo click`);
  };
  const handlePause = () => {
    listPause.push(remainigTime);
    console.log(listPause);
    setStart(false)
    setStatus(2)
  };

  useEffect(() => {
    console.log(remainigTime);

    let intervalId;
    if (start) {
      intervalId = setInterval(() => {
        updateRemainigTime(dayjs(), intervalId);
        console.log(remainigTime.seconds);
      }, 1000);
      return () => clearInterval(intervalId);
    } else {
      clearInterval(intervalId);
    }
  }, [start]);

  const updateRemainigTime = (tiempoActual, intervalId) => {
    const distance = (dateTemporizator - tiempoActual + 1000) / 1000;

    //console.log(Math.floor((distance%(60*1000))/1000));
    if (distance < 1) {
      clearInterval(intervalId);
    } else {
      let actSegundos = Math.floor(distance % 60).toString();
      let actMinutes = Math.floor((distance / 60) % 60).toString();
      let actSHours = Math.floor((distance / 3600) % 24).toString();
      //let actSHours=distance.diff(tiempoActual,"hour")
      console.log(actSegundos);
      setRemainigTime({
        seconds: actSegundos,
        minutes: actMinutes,
        hours: actSHours,
      });
    }
  };
  const reset = () => {
    setStart(false)
    setStatus(0)
    setRemainigTime(
      {seconds: 0,
        minutes: 0,
        hours: 0,
      });
    while (listPause.length) {
      listPause.pop();
    }
   
  };
  return (
    <>
      <div
        className="container-timer neon"
        style={{ color: color, fontSize: `${fontSize}px` }}
      >
        <div className="hour">
          {("0" + remainigTime.hours).slice(-2)}
        </div>
        <span>:</span>
        <div className="minutes">
          {("0" + remainigTime.minutes).slice(-2)}
        </div>
        <span>:</span>
        <div className="seconds">
          {("0" + remainigTime.seconds).slice(-2)}
        </div>
      </div>
      <div style={{ textAlign: "center", marginTop: "50px" }}>
      {status === 0 ? (
          <button  style={{ color: color }} onClick={(e) => {
            handleStart(true)
          }}>Empezar</button>
          )
          :(
            <> 
             {status === 1 ? (
             <>
                
                <button  style={{ color: color }}
                  onClick={handlePause}>
                Pausar
                </button>
              <button style={{ color: color }} onClick={reset}>Reset</button>
            </>
             ):(<>
                <button style={{ color: color }} onClick={(e) => {
                handleStart(true)
              }}>Continuar</button>
              <button style={{ color: color }} onClick={reset}>Resetear</button>
             </>
             )}    
            </>
          )
          
        }
        
        <br />
        <div className="styles">
          <p style={{fontSize:15, color:`#000000`}}>Selecciona Color :  
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
        </p>
        <p style={{fontSize:15, color:`#000000`}}>
          Selecciona el tamaño: 
        <input
          type="range"
          min="50"
          max="70"
          value={fontSize}
          step="5"
          onChange={(e) => setFontSize(e.target.value)}
        />
        </p>
        </div>

      </div>

      <div>
        {listPause? listPause.map((obj) => (
              <ul className="list-group">
                <li className="list-group-item neonLi" style={{ color: color }}>
                  Pausado: {("0" + remainigTime.hours).slice(-2) + ":" + ("0" + remainigTime.minutes).slice(-2) + ":" + ("0" + remainigTime.seconds).slice(-2)}
                </li>
              </ul>
            ))
          : null}
      </div>
    </>
  );
};

export default Timer;
