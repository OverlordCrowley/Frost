import React, {useEffect, useState} from 'react';
import Select from "../UI/Select/Select";
import {ISelect} from "../../types/types";
import Input from "../UI/Input/Input";
import InputMask from "react-input-mask";

const Delivery = () => {

    const[country, setCountry] = useState<string>('')
    const[region, setRegion] = useState<string>('')
    const[city, setCity] = useState<string>('')
    const[street, setStreet] = useState<string>('')
    const[home, setHome] = useState<string>('')
    const[numb, setNumb] = useState<string>('')
    const[reg, setReg] = useState<string>('')
    const[count, setCount] = useState<string>('')


    useEffect(()=>{

    },[])



    const CountrySetter = (val: string) => {
        setCountry(val)
    }
    const RegionSetter = (val: string) => {
        setRegion(val)
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



    return (
        <div className='contact-section-container'>
            <div className="profile-small">
                <p className="contact-text">Адрес доставки</p>
                <div className='contact-container'>
                    <div className='contact-block-left'>
                        {/*<Select isModel={false} def={} arr={} click={RegionSetter}/>*/}
                        {/*<Select isModel={false} def={} arr={} click={RegionSetter}/>*/}
                        <Input label={'Город или поселок'} className={'contact-block-left__input'} placeholder={''} name={'Country'} func={CountrySetter} type={'text'}></Input>
                    </div>
                    <div className='contact-block-right'>
                        <Input label={'Улица'} className={'contact-block-left__input'} placeholder={''} name={'Street'} func={StreetSetter} type={'text'}></Input>
                        <Input label={'Дом'} className={'contact-block-left__input'} placeholder={''} name={'Home'} func={HomeSetter} type={'text'}></Input>
                        <Input label={'Квартира'} className={'contact-block-left__input'} placeholder={''} name={'Numb'} func={NumbSetter} type={'text'}></Input>

                    </div>
                </div>
            </div>
            <button className="checkout-btn btn-blue-effect checkout-btn-edit">Сохранить изменения</button>
        </div>
    );
};

export default Delivery;