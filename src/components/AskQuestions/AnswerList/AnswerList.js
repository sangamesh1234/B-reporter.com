import React from 'react';
import { AiFillLike } from 'react-icons/ai';
import { IconContext } from 'react-icons';
import { FaUserTie } from 'react-icons/fa';
import './AnswerList.css'
const AnswerList=(props)=>{
    let AnswerData = props.Ref.state.AnswersData;
   AnswerData.filter(function(answer){
        return answer.Quesno === props.question.QuesID
    })

    return <section className="Answers">
    <div className="Answerlist">
    {AnswerData.map((answer)=>
                 <div  key ={answer.id}  className="Answer">
                    <div className="Username">
                     <IconContext.Provider value={{ className: 'AnswerUserIcon' }}>
                         <FaUserTie />
                     </IconContext.Provider>
                     <div>
                     <h5>{answer.AnsName}</h5>
                     <h6>Location</h6>
                    </div>
                 </div>
                 <div className="AnswerBox">
                 <p>{answer.Ans}</p>
                 <IconContext.Provider  value={{className:"like"}}>
                         <AiFillLike />
                       </IconContext.Provider>
                 </div>
    </div>)}
         </div>
    </section>
}
export default AnswerList;