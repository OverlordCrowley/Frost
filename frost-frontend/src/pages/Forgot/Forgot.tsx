import React, {useEffect, useState} from 'react';
import './Forgot.sass';
import {Link, useNavigate, useParams} from "react-router-dom";
import Select from "../../Components/UI/Select/Select";
import jwt_decode from "jwt-decode";
import {deleteItem, fetchCartItems, updateItem} from "../../http/basketAPI";
import {BASKET_ROUTE_STEP_TWO, SHOP_ROUTE} from "../../utils/consts";
import {passwordChange, updateUserInfo} from "../../http/userAPI";
import {addOrUpdateOrder} from "../../http/orderAPI";
import Input from "../../Components/UI/Input/Input";
const Forgot = () => {

    let[newPass, setNewPass] = useState<string>('')
    let[repeatPass, setRepeatPass] = useState<string>('')
    let[oldPass, setOldPass] = useState<string>('')
    let[active, setIsActive] = useState<boolean>(false)
    const params = useParams();
    const navigate = useNavigate()

    const newPassSetter = (val: string) => {
        setNewPass(val)
    }
    const repeatPassSetter = (val: string) => {
        setRepeatPass(val)
    }
    const oldPassSetter = (val: string) => {
        setOldPass(val)
    }

    useEffect(()=>{
        if(newPass === repeatPass && newPass !== oldPass){
            setIsActive(true)
        }
        else{
            setIsActive(false)
        }
    }, [newPass, repeatPass, oldPass])

    const UpdateData = () => {
        passwordChange({oldPass, newPass, "token": params.token}).then(res=>{
            alert('Пароль успешно был изменен')
        })
            .catch(error=>{
                alert('Токен более не действителен')
            })
        navigate(SHOP_ROUTE)

    }

    return (
        <section className="preparation">
            <div className="container preparation-container">
                <div className="profile-small profile-small-w" style={{width: 371, margin: "0 auto", paddingBottom: 29}}>
                    <p className="contact-text" style={{marginBottom: 10}}>Изменение пароля</p>
                    <div className='contact-container'>

                        <div className='contact-block-right'>
                            <Input type='password' value={oldPass} label={'Старый пароль'} className={'contact-block-left__input'} placeholder={''} name={'Street'} func={oldPassSetter}></Input>
                            <Input type='password' value={newPass} label={'Новый пароль'} className={'contact-block-left__input'} placeholder={''} name={'Home'} func={newPassSetter}></Input>
                            <Input type='password' value={repeatPass} label={'Повторите пароль'} className={'contact-block-left__input'} placeholder={''} name={'Numb'} func={repeatPassSetter}></Input>

                        </div>
                    </div>
                    <button onClick={()=>{
                        if(active){
                            UpdateData()
                        }
                        else{
                            alert("Пароль должны совпадать")
                        }
                    }} style={{margin: "0 auto", marginTop: 10}} className="checkout-btn btn-blue-effect btn-blue-effect-btn">Изменить</button>
                </div>







            </div>
        </section>
    );
};

export default Forgot;