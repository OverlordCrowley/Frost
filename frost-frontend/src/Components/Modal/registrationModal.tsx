import React, {useContext, useEffect, useState} from 'react';
import {ModalContext} from "../../store/ModalContext";
import './Modal.sass';
import {modalType} from "../../types/types";
import Input from "../UI/Input/Input";
import BlueButton from "../UI/BlueButton/BlueButton";

const RegistrationModal = () => {
    const modalContext = useContext(ModalContext);

    const [mail, setMail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [repeatPassword, setRepeatPassword] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [secondName, setSecondName] = useState<string>('');
    const [isActive, setIsActive] = useState<boolean>(false);

    const EmailSet = (val: string) =>{
        setMail(val);
    }
    const NameSet = (val: string) =>{
        setName(val);
    }
    const PasswordSet = (val: string) =>{
        setPassword(val);
    }
    const SecondNameSet = (val: string) =>{
        setSecondName(val);
    }
    const RepeatPasswordSet = (val: string) =>{
        setRepeatPassword(val);
    }

    useEffect(()=>{
        if(repeatPassword === password){
            setIsActive(true)
        }
        else{
            setIsActive(false)
        }

    }, [repeatPassword, password])


    return (
        <div className='ModalSection' onClick={()=>{
            document.body.style.overflow = 'auto';
            modalContext?.updateValue(modalType.none);
        }}>
            <div className='ModalContainer' onClick={(e: React.MouseEvent<HTMLDivElement>)=>{
                e.stopPropagation();
            }}>
                <h6 className={'ModalTitle'}>Создание учётной записи</h6>
                <div className={'ModalTitleTop'}>
                    <Input type={'text'} placeholder={'Имя'} name={'secondName'} func={NameSet} style={{width: 220}}/>
                    <Input type={'text'} placeholder={'Фамилия'} name={'firstName'} func={SecondNameSet} style={{width: 250}}/>
                </div>
                <Input type={'email'} placeholder={'Адрес электронной почты'} name={'email'} func={EmailSet}/>
                <Input type={'password'} placeholder={'Пароль'} name={'password'} func={PasswordSet}/>
                <Input type={'password'} placeholder={'Повторите пароль'} name={'repeatPassword'} func={RepeatPasswordSet}/>

                <BlueButton name={'Зарегистрироваться'} active={isActive} style={{marginTop: 41}} smallFont={true}/>
                <button className={'login'}  onClick={()=>{modalContext?.updateValue(modalType.login);}}>Войти в существующую учётную запись</button>
            </div>
        </div>
    );
};

export default RegistrationModal;
