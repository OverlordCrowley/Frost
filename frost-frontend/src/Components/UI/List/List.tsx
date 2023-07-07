import React, {useEffect, useState} from 'react';
import './List.sass';
import {IFit} from "../../../types/types";

interface ListProps{
    list: IFit[]
}

const List: React.FC<ListProps> = (props) => {
    let [list, setList] = useState<any[]>(props.list);
    useEffect(()=>{
        setList(props.list);
    }, [props.list]);

    return (

        <div>

            {
                list.map((el,index1)=>(
                    <p key={index1} className={"applicable-list applicable-list-main " + " " + (!el.active ? 'plus': 'minus')}>
                        {el.name}
                    </p>
                ))
            }
        </div>

    );
};

export default List;