import React from "react";

const ListPause=({objeto})=>{
   objeto.push({})
    return <>
        {objeto?objeto.map(obj=>(
            <ul>
                <li> {obj.hours+":"+obj.minutes+":"+obj.seconds}</li>
          </ul>
        )):null}
    </>


}

export default ListPause