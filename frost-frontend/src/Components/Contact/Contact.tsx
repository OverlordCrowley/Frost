import React, {useEffect, useState} from 'react';
import Select from "../UI/Select/Select";
import {ISelect} from "../../types/types";
import './Contact.sass'
import Input from "../UI/Input/Input";
import InputMask from 'react-input-mask';
import {Link} from "react-router-dom";
import {PASSWORD_ROUTE} from "../../utils/consts";



const Contact: React.FC = () => {

    const[firstName, setFirstName] = useState<string>('')
    const[secondName, setSecondName] = useState<string>('')
    const[lastName, setLastName] = useState<string>('')
    const[email, setEmail] = useState<string>('')
    const[tel, setTel] = useState<string>('')
    useEffect(()=>{

    },[])



    const FirstNameSetter = (val: string) => {
        setFirstName(val)
    }
    const SecondNameSetter = (val: string) => {
        setSecondName(val)
    }
    const LastNameSetter = (val: string) => {
        setLastName(val)
    }
    const EmailSetter = (val: string) => {
        setEmail(val)
    }
    const TelSetter = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTel(e.target.value)
    }



    return (
       <div className='contact-section-container'>
           <div className="profile-small">
               <p className="contact-text">Контактные данные</p>
               <div className='contact-container'>
                   <div className='contact-block-left'>
                       <Input label={'Фамилия'} className={'contact-block-left__input'} placeholder={''} name={'SecondName'} func={FirstNameSetter} type={'text'}></Input>
                       <Input label={'Имя'} className={'contact-block-left__input'} placeholder={''} name={'SecondName'} func={SecondNameSetter} type={'text'}></Input>
                       <Input label={'Отчество'} className={'contact-block-left__input'} placeholder={''} name={'LastName'} func={LastNameSetter} type={'text'}></Input>
                   </div>
                   <div className='contact-block-right'>
                       <Input label={'E-mail'} className={'contact-block-left__input'} placeholder={''} name={'SecondName'} func={EmailSetter} type={'text'}></Input>
                       <label>Телефон</label>
                       <InputMask className={'input tel-input'} mask="+7 (999) 999-99-99" value={tel} onChange={TelSetter}>
                       </InputMask>
                        <Link to={PASSWORD_ROUTE} className={'contact-link'}>Изменить пароль</Link>
                   </div>
               </div>
           </div>
           <button className="checkout-btn btn-blue-effect checkout-btn-edit">Сохранить изменения</button>
       </div>
    );
};

export default Contact;