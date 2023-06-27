import React, {useEffect, useState} from 'react';
import './List.sass';
import {Fill, IFit, IFitLevel2} from "../../../types/types";

interface ListProps{
    list: IFit[]
}

const List: React.FC<ListProps> = (props) => {
    let [list, setList] = useState<IFit[]>(props.list);
    useEffect(()=>{
        setList(props.list);
    }, [props.list]);

    function setActiveFirst(index: number){
        let oldList: IFit[] = [...list];
        let newList: IFit[] = [];
        oldList.forEach((el)=>{
            let obj: IFit = el;
            if(obj.id === index && obj.active && obj.filling === Fill.full){
                obj['active'] = false;
                el.items = el.items.map((el1: IFitLevel2) => {
                    return {
                        ...el1,
                        active: false
                    };
                });
            }
            else if(obj.id === index && !obj.active && obj.filling === Fill.full){
                obj['active'] = true;
            }
            newList.push(obj);
        })
        setList(newList);
    }

    function setActiveSecond(childrenId: number, parentIndex: number){
        let oldList: IFit[] = [...list];
        let element: IFit = oldList[parentIndex];
        let thisObj: IFit = oldList[parentIndex];
        let itemsList: IFitLevel2[] = [];
        element.items.map((el)=>{
           let temp: IFitLevel2 = el;

           if(temp.secondId === childrenId && temp.active && temp.filling === Fill.full){
               temp['active'] = false;
           }
            else if(temp.secondId === childrenId && !temp.active && temp.filling === Fill.full){
               temp['active'] = true;
            }
            itemsList.push(temp);

        })
        thisObj.items = itemsList;
        oldList.splice(parentIndex, 1, thisObj);
        setList(oldList);
    }
    return (

        <div>

            {
                list.map((el,index1)=>(
                    <li key={index1} className={"applicable-list applicable-list-main " + " " + (!el.active ? 'plus': 'minus')}
                    onClick={(e)=>{
                    e.stopPropagation();
                    setActiveFirst(el.id);
                    }
                    }
                    >{el.text}

                            <ul className="applicable-list"
                            >
                                {el.filling === 'full' && el.items.length > 0 && el.active ? el.items.map((el2,index2)=>(
                                <li key={index2} className={"applicable-list__item minus-ml " + " " + (!el2.active ? 'plus': 'minus')}
                                    onClick={(e)=>{
                                        e.stopPropagation();
                                        setActiveSecond(el2.secondId, index1);
                                    }
                                    }
                                >{el2.text}
                                    <ul className="applicable-list applicable-list-end">
                                        {el2.filling === 'full' && el2.items && el2.items.length > 0 && el2.active ? el2.items.map(el3=>(
                                           <li className="applicable-list__item end" key={el3.thirdId}>{el3.text}  </li>
                                        )): ''}
                                    </ul>
                                </li>

                        )) : ''}

                            </ul>
                    </li>
                ))
            }


        </div>



    );
};

export default List;