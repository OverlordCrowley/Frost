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
                <h6 className={'ModalTitle'}>Вход в учётную запись</h6>
                <Input type={'email'} placeholder={'Адрес электронной почты'} name={'email'} func={EmailSet}/>
                <Input type={'password'} style={{marginBottom: 15}} placeholder={'Пароль'} name={'password'} func={EmailSet}/>
                <button className={'forgot'}  onClick={()=>{modalContext?.updateValue(modalType.forgotPass);}}>Забыли пароль?</button>
                <BlueButton name={'Войти'} style={{marginTop: 139}} smallFont={true}/>
                <button className={'login'}  onClick={()=>{modalContext?.updateValue(modalType.reg);}}>Создать новую учётную запись</button>

            </div>
        </div>
    );
};


export default RegistrationModal;
