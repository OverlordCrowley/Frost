import React, {useEffect, useState} from 'react';
import './Checkbox.sass';
const gal = require('../../../images/gal.svg').default;
interface CheckboxProps{
    name: string
}

const Checkbox: React.FC<CheckboxProps> = ({name}) => {
    let [nameValue, setNameValue] = useState<string>(name);
    let [active, setActive] = useState<boolean>(false);
    useEffect(()=>{
        setNameValue(name);
    },[name])

    const onCLick = (e: React.MouseEvent<HTMLDivElement>) =>{
        e.stopPropagation();
        if(active){
            setActive(false)
        }
        else{
            setActive(true);
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