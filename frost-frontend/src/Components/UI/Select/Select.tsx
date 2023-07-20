import React, {useEffect, useState} from 'react';
import './Select.sass';
import {ISelect} from "../../../types/types";

interface SelectProps{
    isModel: boolean;
    def: string;
    fullField?: boolean;
    arr: ISelect[];
    click?: (val: number | string) => void;
}

const Select: React.FC<SelectProps> = (props) => {
    const [arr, setArr] = useState<ISelect[]>([]);
    const [active, setActive] = useState<boolean>(false);
    const [select, setSelected] = useState<string | number>('');
    const [def, setDef] = useState<string | number>('');

    useEffect(() => {
        setArr(props.arr);
        setSelected(props.def);
        setDef(props.def);
        if(props.isModel && props.arr !== undefined && props.arr[0]){
            setDef(props.def);
        }


    }, [props.arr])

    return (
        <div onMouseLeave={()=>setActive(false)}   className={"sort-item__field " + (props.fullField ? 'sort-item__field-w' : '')} onClick={(e) => {
            e.stopPropagation();
            setActive(true)
        }}>
            <p>{select !== undefined ? select : def}</p>
            {props.arr && props.arr.length !== 0 ? (
                <div className={'block-h ' + (active ? 'block-v' : '')}>
                    <p onClick={(e) => {
                        e.stopPropagation();
                        setSelected(def);
                        setActive(false);
                        if(props.click){
                            props.click(def);
                        }
                    }}>{def}</p>
                    {
                        active && arr.length > 0 && props.arr.length !== 0? (
                            (arr.map(el => (
                                <p key={el.id} onClick={(e) => {
                                    e.stopPropagation();
                                    setSelected(el.name);
                                    setActive(false);
                                    if(props.click && props.arr.length > 0){
                                        props.click(el.id);
                                    }
                                }}>{el.name}</p>
                            )))
                        ) : ''}
                </div>
            ):''}
        </div>

    );
};

export default Select;