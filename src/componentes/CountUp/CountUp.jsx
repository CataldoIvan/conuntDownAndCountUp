import React, { useEffect, useState } from "react";

const CountUp = () => {
  const [timer, setTimer] = useState({
    hour: '00',
    minute: '00',
    second: '00',
    milleS: "00",
  });
  const [interv, setInterv] = useState();
  let [listPause, setListPause] = useState([]);
  const [status, setStatus] = useState(0);
  const [color, setColor] = useState("#06f1f6");
  const [fontSize, setFontSize] = useState("70px");

  const start = () => {
    setStatus(1);
    console.log(`hola`);
    setInterv(setInterval(run, 15));
  };

  let updateMill = timer.milleS;
  let updateSec = timer.second;
  let updateMin = timer.minute;
  let updateHou = timer.hour;

  const run = () => {
    console.log(timer.milleS.toString());
    updateMill++;
    if (updateMill === 60) {
      updateSec++;
      updateMill = 0;
    }
    if (updateSec === 60) {
      updateMin++;
      updateSec = 0;
    }
    if (updateMin === 60) {
      updateHou++;
      updateMin = 0;
    }
    if (updateHou === 24) {
      updateHou = 0;
    }
    setTimer({
      milleS: updateMill.toString(),
      second: updateSec.toString(),
      minute: updateMin.toString(),
      hour: updateHou.toString(),
    });
  };

  const pause = () => {
    clearInterval(interv);
    listPause.push(timer);
    console.log(listPause);
    setStatus(2);
  };
  const reset = () => {
    pause();
    setTimer({ hour: 0, minute: 0, second: 0, milleS: 0 });
    while (listPause.length) {
      listPause.pop();
    }
    setStatus(0);
  };


  return (
    <>
      <div className="container-timer neon" style={{color:color,fontSize:`${fontSize}px`}}>
        <div className="hour">{("0" + timer.hour).slice(-2)}</div>
        <span>:</span>
        <div className="minutes">{("0" + timer.minute).slice(-2)}</div>
        <span>:</span>
        <div className="seconds">{("0" + timer.second).slice(-2)}</div>
        <span>:</span>
        <div className="seconds">{("0" + timer.milleS).slice(-2)}</div>
      </div>
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        {status === 0 ? (
          <button  style={{ color: color }} onClick={start}>Empezar</button>
        ) : (
        <>
            {status === 1 ? (
            <>
                <button  style={{ color: color }} onClick={pause}>Pausar</button>
                <button  style={{ color: color }} onClick={reset}>Reset</button>
            </>
            ) : (
            <>
                <button  style={{ color: color }} onClick={start}>Continuar</button>
                <button   style={{ color: color }} onClick={reset}>Reset</button>
            </>
            )}
        </>
        )}
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

      {listPause
        ? listPause.map((obj) => (
            <ul className="list-group">
              <li className="list-group-item neonLi" style={{color:color}}>
                Pausado en: {("0" + obj.hour).slice(-2) + ":" 
                + ("0" + obj.minute).slice(-2) + ":" 
                + ("0" + obj.second).slice(-2)+ ":"
                +("0" + obj.milleS).slice(-2) }
              </li>
            </ul>
          ))
        : null}
    </>
  );
};

export default CountUp;
