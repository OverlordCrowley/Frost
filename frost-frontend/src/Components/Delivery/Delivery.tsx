import React, {useEffect, useState} from 'react';
import Select from "../UI/Select/Select";
import Input from "../UI/Input/Input";
import  "./Delivery.sass";
import jwt_decode from "jwt-decode";
import {getUserInfo, updateUserInfo} from "../../http/userAPI";
import {fetchCountry, fetchRegions} from "../../http/geolocationAPI";

const Delivery = () => {

    const[country, setCountry] = useState<any>(

    {
        items:[
                {
                    id: 1,
                    name: "Республика Казахстан"
                },
                {
                    id: 2,
                        name: "Акмолинская область"
                },
            ],
        name: 'Страна',
        def: 'Республика Казахстан',
    }
    )
    const[region, setRegion] = useState<any>({
        items: [
            {
                id: 1,
                name: "Акмолинская область"
            },
            {
                id: 2,
                name: "Алматинская область"
            },
        ],
        name: 'Регион / Область',
        def: 'Акмолинская область',
        }
    )
    const[city, setCity] = useState<string>('')
    const[street, setStreet] = useState<string>('')
    const[home, setHome] = useState<string>('')
    const[numb, setNumb] = useState<string>('')
    const[reg, setReg] = useState<string>('')
    const[count, setCount] = useState<string>('')
    const[selectedRegion, setSelectedRegion] = useState<number | string>('1')
    const[selectedCountry, setSelectedCountry] = useState<number | string>('1')

    useEffect(()=>{
        fetchCountry().then(res=>{
            let obj = {
                name: 'Страна',
                def: 'Казахстан',
                items: res.country,
            }
            setCountry(obj)
        })
        fetchRegions(1).then(res=>{
            let obj = {
                name: 'Регион / Область',
                def: 'Выберите область',
                items: res.region,
            }
            setRegion(obj)
        }).catch((e)=>{

        })
        let token: any = null;
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            token = jwt_decode(storedToken);
        }
        if(token) {
            getUserInfo({'id': token.id}).then((res: any) => {
                if (res.user.home !== null) {
                    setHome(res.user.home);
                }
                if (res.user.street !== null) {
                    setStreet(res.user.street);
                }
                if (res.user.city !== null) {
                    setCity(res.user.city);
                }
                if (res.user.number_home !== null) {
                    setNumb(res.user.number_home);
                }
            })
                .catch(error => {
                    console.log(error)
                })
        }
    },[])



    const CountrySetter = (val: string | number) => {
        setSelectedCountry(val)
    }
    const RegionSetter = (val: string | number) => {
        setSelectedRegion(val)
    }
    const CitySetter = (val: string) => {
        setCity(val)
    }
    const StreetSetter = (val: string) => {
        setStreet(val)
    }
    const HomeSetter = (val: string) => {
        setHome(val)
    }
    const NumbSetter = (val: string) => {
        setNumb(val)
    }

    const UpdateData = () => {
        let token: any = null;
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            token = jwt_decode(storedToken);
        }
        if(token){
            updateUserInfo({
                "userId" : token.id,
                "first_name" : undefined,
                "second_name" : undefined,
                "last_name" : undefined,
                "email" : undefined,
                "tel" : undefined,
                "country" : selectedCountry,
                "region" : selectedRegion,
                "city" : city,
                "street" : street,
                "home" : home,
                "number" : numb
            }).then(
                res=>{
                    alert('Данные успешно изменены')
                }
            )
                .catch(e=>{
                    console.log(e)
                })
        }
    }


    return (
        <div className='contact-section-container'>
            <div className="profile-small ">
                <p className="contact-text">Адрес доставки</p>
                <div className='contact-container'>
                    <div className='contact-block-left contact-block-left-flex'>
                        <div className="contact-block-group" style={{marginLeft: 0}}>
                            <span className="sort-item__title contact-block-left__label">{country.name}</span>
                            <Select fullField={true} isModel={false} def={country.def} arr={country.items} click={CountrySetter}/>
                        </div>
                        <div className="contact-block-group" style={{marginLeft: 0}}>
                            <span className="sort-item__title contact-block-left__label">{region.name}</span>
                            <Select fullField={true} isModel={false} def={region.def} arr={region.items} click={RegionSetter}/>
                        </div>

                        <Input value={city} label={'Город или поселок'} className={'contact-block-left__input'} placeholder={''} name={'Country'} func={CitySetter} type={'text'}></Input>
                    </div>
                    <div className='contact-block-right'>
                        <Input value={street} label={'Улица'} className={'contact-block-left__input'} placeholder={''} name={'Street'} func={StreetSetter} type={'text'}></Input>
                        <Input value={home} label={'Дом'} className={'contact-block-left__input'} placeholder={''} name={'Home'} func={HomeSetter} type={'text'}></Input>
                        <Input value={numb} label={'Квартира'} className={'contact-block-left__input'} placeholder={''} name={'Numb'} func={NumbSetter} type={'text'}></Input>

                    </div>
                </div>
            </div>
            <button onClick={UpdateData} className="checkout-btn btn-blue-effect checkout-btn-edit">Сохранить изменения</button>
        </div>
    );
};

export default Delivery;