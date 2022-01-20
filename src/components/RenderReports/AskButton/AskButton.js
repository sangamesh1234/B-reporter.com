
import React, { useState } from 'react';
import './AskButton.scss';
import PostFilter from './PostFilter' 
  


const AskButton=()=>{
    const [active, setActive]= useState(false);
    return(<>
     <div className="AskButtonContainer">
        <button onClick={()=>setActive(!active)}>
        Ask Question ?
        </button>
        </div>
        <PostFilter active={active} setActive={()=>setActive(!active)}/>
        </>
    )
}
export default AskButton;