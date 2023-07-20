import React, {useContext, useEffect, useState} from 'react';
import {ModalContext} from "../../store/ModalContext";
import './Modal.sass';
import {modalType} from "../../types/types";
import Input from "../UI/Input/Input";
import {useNavigate} from "react-router-dom";
import {registration} from "../../http/userAPI";
import {HISTORY_ROUTE} from "../../utils/consts";

const RegistrationModal = () => {
    const modalContext = useContext(ModalContext);
    const [mail, setMail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [repeatPassword, setRepeatPassword] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [secondName, setSecondName] = useState<string>('');
    const [isActive, setIsActive] = useState<boolean>(false);
    const navigate = useNavigate()

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
    const SendRequest = () => {
        registration(mail, password, name, secondName).then((res : any)=>{
            modalContext?.setUser(res)
            modalContext?.setIsAuth(true)
            modalContext?.updateValue(modalType.none);
            navigate(HISTORY_ROUTE)
            }
        )
            .catch(error=>{
                alert(error.response.data.message)
            })
    }

    useEffect(()=>{
        if(repeatPassword === password && repeatPassword.length >= 10 && name.length >= 2 && secondName.length >= 2 && mail.length >= 12){
            setIsActive(true)
        }
        else{
            setIsActive(false)
        }

    }, [repeatPassword, password, mail, secondName, name])


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
                <Input type={'password'} placeholder={'Пароль'} name={'password'} minLength={10} maxLength={25} func={PasswordSet}/>
                <Input type={'password'} placeholder={'Повторите пароль'} name={'repeatPassword'} minLength={10} maxLength={25} func={RepeatPasswordSet}/>
                <button className={"button-blue item-box-item__btn btn-blue-effect button-blue-edited " +  (isActive ? '' : 'button-blue-hidden')}
                        onClick={()=>{
                            if(isActive){
                                modalContext?.updateValue(modalType.none)
                                SendRequest();
                            }

                }} style={{marginTop: 41}}>Зарегистрироваться</button>
                <button className={'login'}  onClick={()=>{modalContext?.updateValue(modalType.login);}}>Войти в существующую учётную запись</button>
            </div>
        </div>
    );
};

export default RegistrationModal;
