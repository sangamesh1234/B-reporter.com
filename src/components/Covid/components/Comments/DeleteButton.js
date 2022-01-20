
import React from 'react';
// import './DeleteButton.css';
import '../../css/Comments/DeleteButton.css';
import { RiDeleteBin6Line } from "react-icons/ri";
import { IconContext } from 'react-icons';
const DeleteComment=(Comment,State)=>{
  const {comments} = State.state;
  var Result =comments.filter((comment)=>{ return comment.id !== Comment.id; });
  State.setState({comments:Result})

}
  


const DeleteButton=(props)=>{

    return(

     <div className="Delete">
        <button  className="DeleteButton" onClick={()=>DeleteComment(props.Comment, props.CommentState)}>
        <IconContext.Provider value={{ className: 'DeleteIcon' }}>
						<RiDeleteBin6Line />
					</IconContext.Provider> Delete
        </button>
        </div>
    )
}
export default DeleteButton;