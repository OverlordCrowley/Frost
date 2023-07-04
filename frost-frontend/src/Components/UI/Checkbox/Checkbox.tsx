import React, {useEffect, useState} from 'react';
import './Checkbox.sass';
import {Simulate} from "react-dom/test-utils";
import click = Simulate.click;
const gal = require('../../../images/gal.svg').default;
interface CheckboxProps{
    name: string,
    onClickHandler?: (val: boolean) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({name, onClickHandler}) => {
    let [nameValue, setNameValue] = useState<string>(name);
    let [active, setActive] = useState<boolean>(false);
    useEffect(()=>{
        setNameValue(name);
    },[name])

    const onCLick = (e: React.MouseEvent<HTMLDivElement>) =>{
        e.stopPropagation();
        if(active){
            setActive(false)
            onClickHandler?.(false)
        }
        else{
            setActive(true);
            onClickHandler?.(true)
        }
    }

    return (
        <div className="sort-item-checkbox" onClick={e =>onCLick(e)}>
            {active ? <div className='box-a'>
                <img alt='Done' src={gal}/>
            </div>
                : <div className='box'></div>}
            <label className="have" htmlFor="have">{name}</label>
        </div>
    );
};

export default Checkbox;