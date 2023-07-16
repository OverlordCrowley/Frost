import React, {useContext, useState} from 'react';
import {ModalContext} from "../../store/ModalContext";
import './Modal.sass';
import {modalType} from "../../types/types";
import Input from "../UI/Input/Input";
import {login} from "../../http/userAPI";
import {HISTORY_ROUTE} from "../../utils/consts";
import {useNavigate} from "react-router-dom";

const RegistrationModal = () => {
    const modalContext = useContext(ModalContext);
    const navigate = useNavigate();
    const [mail, setMail] = useState<string>('');
    const [pass, setPass] = useState<string>('');

    const EmailSet = (val: string) => {
        setMail(val);
    }
    const PassSet = (val: string) => {
        setPass(val);
    }

    const SignIn = (mail: string , pass: string) => {
        login(mail, pass).then((res : any)=>{
            modalContext?.setUser(res)
            modalContext?.setIsAuth(true)
            console.log('------------------------1')
            modalContext?.updateValue(modalType.none);
            console.log('------------------------2')
            console.log(modalContext?.value)
            navigate(HISTORY_ROUTE)
            }
        )
            .catch(e =>{

            })
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
                <Input type={'password'} style={{marginBottom: 15}} placeholder={'Пароль'} name={'password'} func={PassSet}/>
                <button className={'forgot'}  onClick={()=>{modalContext?.updateValue(modalType.forgotPass);}}>Забыли пароль?</button>
                <button className={"button-blue item-box-item__btn btn-blue-effect button-blue-edited "} onClick={()=>{SignIn(mail, pass);}} style={{marginTop: 41}}>Войти</button>
                <button className={'login'}  onClick={()=>{modalContext?.updateValue(modalType.reg);}}>Создать новую учётную запись</button>

            </div>
        </div>
    );
};


export default RegistrationModal;
