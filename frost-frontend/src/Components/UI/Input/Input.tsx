import React, {useState} from 'react';
import './Input.sass';

interface InputProps{
    placeholder: string;
    name: string;
    func: (val: string ) => void;
    type: string;
    style?: React.CSSProperties;
    value?: string | number | undefined;
}

const Input: React.FC<InputProps> = (props) => {
    const [data, setData] = useState<string | number>('');
    return (
        <input value={props.value ? props.value : data}
               style={props.style}
               type={props.type}
               className={'input'}
               placeholder={props.placeholder}
               name={props.name} onChange={(e)=>{
                    props.func(e.target.value)
                    setData(e.target.value)
        }
        }/>
    );
};

export default Input;