import React from "react"
import './App.css';
import Timer from './componentes/Timer/Timer';
import CountUp from './componentes/CountUp/CountUp'


const horaCapturada={
  seconds:"10",
  minutes:'1',
  hours:'11'
}

const App=()=> {
 
  return (
    <div className="App">
      <CountUp/> 
      
     {/*  <Timer
      timerHours={horaCapturada.hours}
      timerMinutes={horaCapturada.minutes}
      timerSeconds={horaCapturada.seconds}
      />  */}
      <br/>
      
    </div>
  ); 
}

export default App;
