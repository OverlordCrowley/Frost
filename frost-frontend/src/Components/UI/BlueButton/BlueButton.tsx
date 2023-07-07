import React, {useEffect, useState} from 'react';
import './BlueButton.sass';
import {Link} from "react-router-dom";

interface BlueButtonProps{
    link?: number;
    name: string;
    onClick?: () => void;
    active?: boolean;
    smallFont?: boolean;
    style?: React.CSSProperties;
}


const BlueButton: React.FC<BlueButtonProps> = ({link, name, onClick,smallFont, style, active}) => {
    let [linkValue, setLinkValue] = useState<number | undefined>(link);
    let [nameValue, setNameValue] = useState<string>(name);
    let [isActive, setIsActive] = useState<boolean | undefined>(false);
    useEffect(()=>{
        setLinkValue(link);
        setNameValue(name);
        setIsActive(active);
    }, [link, name, active])

    console.log(isActive)
    return (
       <>
           {link ? (
               <Link
                   to={'/item/' + link}
                   style={style}
                   className={`item-box-item__btn btn-blue-effect ${smallFont ? 'button-blue-s' : ''} ${isActive ? 'button-blue-visible' : 'button-blue-hidden'}`}
               >
                   {name}
               </Link>
           ) : (
               <a
                   onClick={onClick}
                   style={style}
                   className={`item-box-item__btn btn-blue-effect ${smallFont ? 'button-blue-s' : ''} ${isActive ? 'button-blue-visible' : 'button-blue-hidden'}`}
               >
                   {name}
               </a>
           )}

       </>
    );
};

export default BlueButton;