import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import "./CountDown.css";


const CountDown = ({ timerHours, timerMinutes, timerSeconds }) => {
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
  const [error, setError] = useState([]);
  let dateTemporizator = dayjs()
    .add(parseInt(remainigTime.seconds), "second")
    .add(parseInt(remainigTime.minutes), "minute")
    .add(parseInt(remainigTime.hours), "hour");


  const handleChange=(e)=>{
    

     if(e.target.value.length>2){
      e.target.value=e.target.value.slice(-2)
      setError(["no es un horario valido"])

    } else{
      setError([])
      setRemainigTime({...remainigTime,
        ...remainigTime[e.target.id]=e.target.value})
    }
    
  }
  const handleStart = (e) => {
    /* VALIDACION DE HORA
    console.log(e.target.parentNode.hours)
    console.log(e.target.parentNode.minutes)
    console.log(e.target.parentNode.seconds) 
    if(e.target.parentNode.hours<0 || e.target.parentNode.hours>24){
      setError(...error.push("no es un horario valido"))
      console.log(error);
    }*/

    setStatus(1)
    setStart(true);

  };
  const handlePause = () => {
    listPause.push(remainigTime);
  
    setStart(false)
    setStatus(2)
  };

  useEffect(() => {
  

    let intervalId;
    if (start) {
      intervalId = setInterval(() => {
        updateRemainigTime(dayjs(), intervalId);
   
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
        <>
            <form className="row  col-4 mx-auto align-items-center">
              
            <div className="col-4">
              <label className="visually-hidden" for={remainigTime.hours}>Name</label>
              <input type="number" minlength="0"  maxlength="2" className="form-control" id="hours" defaultValue={remainigTime.hours} placeholder="Hora"  onChange={handleChange} />
            </div>
            <div className="col-4">
              <label className="visually-hidden" for={remainigTime.minutes}>Name</label>
              <input type="number" minlength="0"  maxlength="60" className="form-control" id="minutes" defaultValue={remainigTime.minutes} placeholder="Minuto"  onChange={handleChange}/>
            </div>
            <div className="col-4">
              <label className="visually-hidden" for={remainigTime.seconds}>Name</label>
              <input type="number" minlength="0"  maxlength="60" className="form-control" id="seconds" defaultValue={remainigTime.seconds} placeholder="Segundo"  onChange={handleChange}/>
            </div>
            <div>
              {error?error.map((err)=>
                  <li style={{color:"red"}}>{err}</li>
                )
              :null}
           </div>
            <button  style={{ color: color, marginTop:12}} {...error.length===0?`disabled`:`disabled`} onClick={handleStart}>Empezar</button>
          </form>
          
          
          </>)
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
                  Pausado: {("0" + obj.hours).slice(-2) + ":" + ("0" + obj.minutes).slice(-2) + ":" + ("0" + obj.seconds).slice(-2)}
                </li>
              </ul>
            ))
          : null}
      </div>
    </>
  );
};

export default CountDown;
