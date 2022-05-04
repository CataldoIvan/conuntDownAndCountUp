import React, { useState } from "react"
import './App.css';
import CountDown from './componentes/CountDown/CountDown';
import CountUp from './componentes/CountUp/CountUp'


const horaCapturada={
  seconds:"10",
  minutes:'1',
  hours:'11'
}

const App=()=> {

  const [selector,setSelector]=useState(0)
 
  return (
    
    <div className="App">
      {selector==0?
      (<>
      <button onClick={()=>setSelector(2)}>CountDown</button>
      <button onClick={()=>setSelector(1)}>CountUp</button>
      </>)
      :
      (
      <>
      {selector==1?
        <>
         <button onClick={()=>setSelector(1)}>CountDown</button>
        <CountUp/> 
        </>
        :
       <>
       
        <button onClick={()=>setSelector(2)}>CountUp</button>
           <CountDown
         timerHours={horaCapturada.hours}
         timerMinutes={horaCapturada.minutes}
         timerSeconds={horaCapturada.seconds}
         /> 
       </>
      }
       </>)
        
        
        /*  :
         <>
               <button onClick={setSelector(2)}>CountUp</button>
           <CountDown
         timerHours={horaCapturada.hours}
         timerMinutes={horaCapturada.minutes}
         timerSeconds={horaCapturada.seconds}
         /> 
               </>
       </> */
    }


      
      <br/>
      
    </div>
  ); 
}

export default App;
