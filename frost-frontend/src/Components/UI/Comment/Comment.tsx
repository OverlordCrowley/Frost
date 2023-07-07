import React, {useEffect, useState} from 'react';
import './Comment.sass';
import {IComment} from "../../../types/types";


interface CommentProps{
    list: IComment
}

const Comment: React.FC<CommentProps> = (props) => {
    let [comment, setComment] = useState<IComment>(props.list);
    useEffect(()=>{
        setComment(props.list);
    }, [props])

    return (
        <div className="reviews-item">
             <p className="reviews__full-name">{comment.user.first_name + " " + comment.user.second_name}</p>
             <p className="reviews__text">{comment.text}</p>
        </div>
    );
};

export default Comment;