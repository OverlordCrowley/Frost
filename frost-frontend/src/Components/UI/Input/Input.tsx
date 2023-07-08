import React, {useEffect, useState} from 'react';
import './Input.sass';

interface InputProps{
    placeholder: string;
    name: string;
    func: (val: string ) => void;
    type: string;
    style?: React.CSSProperties;
    value?: string | number | undefined;
    maxLength? : number;
    minLength? : number;
}

const Input: React.FC<InputProps> = (props) => {
    const [data, setData] = useState<string | number>('');
    const [max, setMax] = useState<number>();
    const [min, setMin] = useState<number>();

    useEffect(()=>{
        setMax(props.maxLength)
        setMin(props.minLength)
    }, [props.maxLength, props.minLength])
    return (
        <input value={props.value ? props.value : data}
               style={props.style}
               type={props.type}
               className={'input'}
               placeholder={props.placeholder}
               maxLength={max ? max : 25}
               minLength={min ? max : 5}
               name={props.name} onChange={(e)=>{
                    props.func(e.target.value)
                    setData(e.target.value)
        }
        }/>
    );
};

export default Input;