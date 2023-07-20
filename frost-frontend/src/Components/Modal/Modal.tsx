import React, {useContext, useEffect, useState} from 'react';
import {ModalContext} from "../../store/ModalContext";
import './Modal.sass';
import {modalType} from "../../types/types";
import Input from "../UI/Input/Input";
import BlueButton from "../UI/BlueButton/BlueButton";
import RegistrationModal from "./registrationModal";
import LoginModal from "./loginModal";
import ForgotModal from "./forgotModal";
import AddToCarModal from "./addToCarModal";

const Modal: React.FC = () => {
    const modalContext = useContext(ModalContext);

    useEffect(() => {
        if (modalContext?.value !== modalType.none) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [modalContext?.value]);

    return (
        <>
            {modalContext?.value === modalType.reg ? (
                (<RegistrationModal/>)
            ) : ''}

            {modalContext?.value === modalType.login ? (
                <LoginModal/>
            ) : ''}

            {modalContext?.value === modalType.forgotPass ? (
                <ForgotModal/>
            ) : ''}


        </>
    );
};

export default Modal;
