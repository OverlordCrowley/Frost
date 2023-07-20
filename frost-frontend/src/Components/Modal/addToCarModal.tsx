import React, {useContext, useEffect, useState} from 'react';
import {ModalContext} from "../../store/ModalContext";
import './Modal.sass';
import {modalType} from "../../types/types";
import Input from "../UI/Input/Input";
import BlueButton from "../UI/BlueButton/BlueButton";
import {login} from "../../http/userAPI";
import {addCartItem} from "../../http/basketAPI";
import {BASKET_ROUTE} from "../../utils/consts";
import {useNavigate} from "react-router-dom";
import jwt_decode from "jwt-decode";

interface RegistrationModalProps{
    id: number | undefined,
    name: string
}

const RegistrationModal = (props: RegistrationModalProps) => {
    const modalContext = useContext(ModalContext);
    const [id ,setId] = useState<number | undefined>(props.id)
    const [name ,setName] = useState<string>(props.name)
    const [count ,setCount] = useState<number>(1)
    const [userId, setUserId] = useState<number>(0);
    const navigate = useNavigate();
    let [token, setToken] = useState<any>('');

    useEffect(()=>{
        setToken(localStorage.getItem('token'))

        if(modalContext?.value !== modalType.none){
            document.body.style.overflow = 'hidden';
        }
        else{
            document.body.style.overflow = 'auto';
        }
    },[])

    useEffect(()=>{
        if(token){
            let jwt: {'id': number} = jwt_decode(token);
            if (jwt && jwt.id) {
                let user: number = jwt.id;
                setUserId(user)
            }
        }
    }, [token])

    const countSet = (val: string) =>{
        if(Number(val) > 1){
            setCount(Number(val));
        }
    }


    const NavigateToCart = () => {
        navigate(BASKET_ROUTE)
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
                        <Input type={'text'} maxLength={2} style={{height: 38, paddingRight: 15, paddingLeft: 15, width: "auto", maxWidth: 60, textAlign: "center"}} value={count} placeholder={'1'} name={'count'} func={countSet}/>
                        <button className={'addBtn'} onClick={
                            ()=>{
                                setCount(prevState => prevState+1);
                            }
                        }>+</button>
                    </div>
                </div>
                <BlueButton onClick={()=>{
                    addCartItem({'userId': userId, 'deviceId': id, 'count': count}).then(res=>{
                        NavigateToCart()
                    })
                        .catch(err=>{
                            alert(err.response.data.message)
                        })

                }} name={'Оформить заказ'} style={{marginTop: 18}} smallFont={true}/>
                <button className={'login'}  onClick={()=>{
                    modalContext?.updateValue(modalType.none);
                }}>Продолжить выбор товаров</button>
            </div>
        </div>
    );
};

export default RegistrationModal;
