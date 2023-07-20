import React, {useEffect, useState} from 'react';
import './BlueButton.sass';
import {Link} from "react-router-dom";

interface BlueButtonProps{
    link?: number | string;
    name: string;
    onClick?: () => void;
    active?: boolean;
    smallFont?: boolean;
    style?: React.CSSProperties;
}


const BlueButton: React.FC<BlueButtonProps> = ({link, name, onClick,smallFont, style, active}) => {
    let [linkValue, setLinkValue] = useState<number | string | undefined>(link);
    let [nameValue, setNameValue] = useState<string>(name);
    let [isActive, setIsActive] = useState<boolean | undefined>(undefined);
    useEffect(()=>{
        setLinkValue(link);
        setNameValue(name);
        setIsActive(active);
    }, [link, name, active])

    return (
       <>
           {link ? (
               <Link
                   to={'/item/' + link}
                   style={style}
                   className={`item-box-item__btn btn-blue-effect ${smallFont ? 'button-blue-s' : ''}`}
               >
                   {name}
               </Link>
           ) : (
               <a
                   onClick={onClick}
                   style={style}
                   className={`item-box-item__btn btn-blue-effect ${smallFont ? 'button-blue-s' : ''}`}
               >
                   {name}
               </a>
           )}

       </>
    );
};

export default BlueButton;