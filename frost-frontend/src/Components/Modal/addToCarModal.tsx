import React, {useContext, useEffect, useState} from 'react';
import {ModalContext} from "../../store/ModalContext";
import './Modal.sass';
import {modalType} from "../../types/types";
import Input from "../UI/Input/Input";
import BlueButton from "../UI/BlueButton/BlueButton";

interface RegistrationModalProps{
    id: number | undefined,
    name: string
}

const RegistrationModal = (props: RegistrationModalProps) => {
    const modalContext = useContext(ModalContext);
    const [id ,setId] = useState<number | undefined>(props.id)
    const [name ,setName] = useState<string>(props.name)
    const [count ,setCount] = useState<number>(1)
    const [mail, setMail] = useState<string>('');
    useEffect(()=>{
        if(modalContext?.value !== modalType.none){
            document.body.style.overflow = 'hidden';
        }
        else{
            document.body.style.overflow = 'auto';
        }
    },[])

    const countSet = (val: string) =>{
        if(Number(val) > 1){
            setCount(Number(val));
        }
    }

    return (
        <div className='ModalSection' onClick={()=>{
            document.body.style.overflow = 'auto';
            modalContext?.updateValue(modalType.none);
        }}>
            <div className='ModalContainer' onClick={(e: React.MouseEvent<HTMLDivElement>)=>{
                e.stopPropagation();
            }}>
                <h6 className={'ModalTitle'}>Товар добавлен в корзину</h6>
                <p className={'addText'}>{name}</p>
                <div className={'addTextBox'}>
                    <p className={' AddTextGray'}>Укажите количество: </p>
                    <div style={{display: "flex", height: 40, marginLeft: 59}}>
                        <button className={'addBtn'} onClick={
                            ()=>{
                                if(count > 1){
                                    setCount(prevState => prevState-1);
                                }
                            }
                        }>-</button>
                        <Input type={'text'} style={{height: 38, paddingRight: 15, paddingLeft: 15, width: "auto", maxWidth: 60, textAlign: "center"}} value={count} placeholder={'1'} name={'count'} func={countSet}/>
                        <button className={'addBtn'} onClick={
                            ()=>{
                                setCount(prevState => prevState+1);
                            }
                        }>+</button>
                    </div>
                </div>
                <BlueButton name={'Оформить заказ'} style={{marginTop: 18}} smallFont={true}/>
                <button className={'login'}  onClick={()=>{
                    modalContext?.updateValue(modalType.none);
                }}>Продолжить выбор товаров</button>
            </div>
        </div>
    );
};

export default RegistrationModal;
