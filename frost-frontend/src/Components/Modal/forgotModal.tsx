import React, {useContext, useEffect, useState} from 'react';
import {ModalContext} from "../../store/ModalContext";
import './Modal.sass';
import {modalType} from "../../types/types";
import Input from "../UI/Input/Input";
import BlueButton from "../UI/BlueButton/BlueButton";

const RegistrationModal = () => {
    const modalContext = useContext(ModalContext);

    const [mail, setMail] = useState<string>('');
    const EmailSet = (val: string) =>{
        setMail(val);
    }

    return (
        <div className='ModalSection' onClick={()=>{
            document.body.style.overflow = 'auto';
            modalContext?.updateValue(modalType.none);
        }}>
            <div className='ModalContainer' onClick={(e: React.MouseEvent<HTMLDivElement>)=>{
                e.stopPropagation();
            }}>
                <h6 className={'ModalTitle'}>Восстановление пароля</h6>
                <p className={'forgotText'}>Для получения нового пароля необходимо вписать в поле ниже адрес электронной почты, указанный при регистрации</p>
                <Input type={'email'} placeholder={'Адрес электронной почты'} name={'email'} func={EmailSet}/>
                <BlueButton name={'Отправить подтверждение'} style={{marginTop: 71}} smallFont={true}/>
                <button className={'login'}  onClick={()=>{
                    modalContext?.updateValue(modalType.reg);
                }}>Создать новую учётную запись</button>
        </div>
        </div>
    );
};

export default RegistrationModal;
