import React, {useContext, useEffect, useState} from 'react';
import Select from "../UI/Select/Select";
import {ISelect, modalType} from "../../types/types";
import './Contact.sass'
import Input from "../UI/Input/Input";
import InputMask from 'react-input-mask';
import {Link} from "react-router-dom";
import {PASSWORD_ROUTE} from "../../utils/consts";
import jwt_decode from "jwt-decode";
import {getUserInfo, updateUserInfo} from "../../http/userAPI";
import {ModalContext} from "../../store/ModalContext";



const Contact: React.FC = () => {
    const modalContext = useContext(ModalContext);
    const[firstName, setFirstName] = useState<string>('')
    const[secondName, setSecondName] = useState<string>('')
    const[lastName, setLastName] = useState<string>('')
    const[email, setEmail] = useState<string>('')
    const[tel, setTel] = useState<string>('')
    const[country, setCountry] = useState<string>('')
    const[region, setRegion] = useState<string>('')

    useEffect(()=>{
        let token: any = null;
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            token = jwt_decode(storedToken);
        }

        if(token){
            getUserInfo({'id':token.id}).then((res: any)=>{
                if(res.user.first_name !== null){
                    setFirstName(res.user.first_name);
                }
                if(res.user.second_name !== null){
                    setSecondName(res.user.second_name);
                }
                if(res.user.last_name !== null){
                    setLastName(res.user.last_name);
                }
                if(res.user.email!== null){
                    setEmail(res.user.email);
                }
                if(res.user.telephone!== null){
                    setTel(res.user.telephone);
                }
            })
                .catch(error=>{
                    console.log(error)
                })

        }
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
    const updateData = () => {
        let token: any = null;
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            token = jwt_decode(storedToken);
        }
        if(token){
            updateUserInfo({
                "userId" : token.id,
                "first_name" : firstName,
                "second_name" : secondName,
                "last_name" : lastName,
                "email" : email,
                "tel" : tel,
                "country" : undefined,
                "region" : undefined,
                "city" : undefined,
                "street" : undefined,
                "home" : undefined,
                "number" : undefined
            }).then(
                res=>{
                    alert('Данные успешно изменены')
                }
            )
        }

    }

    const setModal = () =>{
        modalContext?.updateValue(modalType.forgotPass);
    }

    return (
       <div className='contact-section-container'>
           <div className="profile-small">
               <p className="contact-text">Контактные данные</p>
               <div className='contact-container'>
                   <div className='contact-block-left'>
                       <Input value={firstName} label={'Фамилия'} className={'contact-block-left__input'} placeholder={''} name={'SecondName'} func={FirstNameSetter} type={'text'}></Input>
                       <Input value={secondName} label={'Имя'} className={'contact-block-left__input'} placeholder={''} name={'SecondName'} func={SecondNameSetter} type={'text'}></Input>
                       <Input value={lastName} label={'Отчество'} className={'contact-block-left__input'} placeholder={''} name={'LastName'} func={LastNameSetter} type={'text'}></Input>
                   </div>
                   <div className='contact-block-right'>
                       <Input value={email} label={'E-mail'} className={'contact-block-left__input'} placeholder={''} name={'SecondName'} func={EmailSetter} type={'text'}></Input>
                       <label>Телефон</label>
                       <InputMask className={'input tel-input'} mask="+7 (999) 999-99-99" value={tel} onChange={TelSetter}>
                       </InputMask>
                        <button onClick={setModal} className={'contact-link contact-link-button'}>Изменить пароль</button>
                   </div>
               </div>
           </div>
           <button onClick={updateData} className="checkout-btn btn-blue-effect checkout-btn-edit">Сохранить изменения</button>
       </div>
    );
};

export default Contact;