import React, {useEffect, useState} from 'react';
import Comment from "../UI/Comment/Comment";
import {IComment} from "../../types/types";

interface ReviewListProps{
    list: IComment[]
}

const ReviewList: React.FC<ReviewListProps> = (props) => {
    let [list, setList] = useState(props.list);
    useEffect(()=>{
        setList(props.list);
    },[props])
    return (
        <div>
            {list.map((el,index)=>(
                <Comment list={el} key={index}/>
            ))}
        </div>

    );
};

export default ReviewList;