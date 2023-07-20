import React, {useEffect, useState} from 'react';
import './CartStepTwo.sass';
import {Link} from "react-router-dom";
import jwt_decode from "jwt-decode";
import {fetchCartItems} from "../../http/basketAPI";
import Input from "../../Components/UI/Input/Input";
import InputMask from "react-input-mask";
import {getUserInfo} from "../../http/userAPI";
import {BASKET_ROUTE_STEP_THREE} from "../../utils/consts";
import {addOrUpdateOrder} from "../../http/orderAPI";
import jwtDecode from "jwt-decode";

const CartStepTwo = () => {
    let [selectItem, setSelectItem] = useState(
        {
            items: [{id: 1, name: 'Оплата при получении'}, {id: 2, name: 'Оплата Картой'}],
            name: 'Способ оплаты',
            standard: "Оплата картой"
        }
    );
    let [items, setItems] = useState<any[]>([]);
    let [total, setTotal] = useState(0);

    const[firstName, setFirstName] = useState<string>('');
    const[secondName, setSecondName] = useState<string>('');
    const[lastName, setLastName] = useState<string>('');
    const[email, setEmail] = useState<string>('');
    const[tel, setTel] = useState<string>('');
    const[country, setCountry] = useState<string>('');
    const[region, setRegion] = useState<string>('');
    const [userInfo, setUserInfo] = useState({})



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


    useEffect(()=>{
        let all = 0;
        let arrs: any[] = [];

        let token: any = null;
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            token = jwt_decode(storedToken);
        }

        if(token){
            fetchCartItems({'id':token.id}).then((res: any)=>{
                res.basketDevices.map((el: any)=>{
                    let obj = el;
                    el = el.count * obj.device.price
                    arrs.push(obj);
                    all+= el.count * obj.device.price;
                })
                setItems(arrs);
                setTotal(all);
            })
                .catch(error=>{
                    console.log(error)
                })

        }

    },[])

    useEffect(()=>{
        let token: any = null;
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            token = jwt_decode(storedToken);
        }

        if(token){
            getUserInfo({'id':token.id}).then((res: any)=>{
                setUserInfo(res)
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
                if(res.user.telephone !== null){
                    setTel(res.user.telephone);
                }
            })
                .catch(error=>{
                    console.log(error)
                })

        }

    },[])

    useEffect(()=>{
        let all = 0;
        items.map((el: any)=>{
            all+= el.count * el.device.price;
        })
        setTotal(all);
    },[items])


    const addOrUpdate = () => {
        let token = localStorage.getItem('token');
        if(token){
            let decoded: any = jwtDecode(token);
                addOrUpdateOrder({
                    'userId': decoded.id,
                    'paymentMethod': undefined,
                    'first_name': firstName,
                    'second_name': secondName,
                    'last_name': lastName,
                    'email': email,
                    'tel': tel,
                    'country': undefined,
                    'region': undefined,
                    'city': undefined,
                    'street': undefined,
                    'home': undefined,
                    'number': undefined,
                    'position': false
                }).then(
                )

        }

    }

    return (
        <section className="preparation">
            <div className="container preparation-container-2">
                <div className="top-container top-container-2">
                    <h6 className="preparation-title">Оформление заказа</h6>
                    <div className="stage-box">
                        <div className="stage stage-1 stage-1-ml">
                            <div className="sq ">Корзина</div>
                            <div className="rec rec-standart"></div>
                        </div>
                        <div className="stage stage-2 l-15">
                            <div className="sq sq-active sq-active-2">Контактные данные</div>
                            <div className="rec rec-a rec-2 rec-2-a"></div>
                        </div>
                        <div className="stage stage-3 stage-3-15">
                            <div className="sq sq-9 sq-9-z">Доставка</div>
                            <div className="rec rec-standart rec-3 rec-2-9 rec-2-9-s"></div>
                        </div>
                        <div className="stage stage-4 stage-4-5">
                            <div className="sq sq-end">Завершение</div>
                        </div>
                    </div>
                </div>


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
                            <Link onClick={addOrUpdate} to={BASKET_ROUTE_STEP_THREE} style={{marginTop: "56px", height: "40px", padding: 0, textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center"}} className="checkout-btn btn-blue-effect">Оформить заказ</Link>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default CartStepTwo;