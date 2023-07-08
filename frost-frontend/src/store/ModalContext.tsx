import React, {createContext, useContext, useState} from "react";
import {IModalContext, modalType} from '../types/types';
import {fetchCartItems} from "../http/userAPI";

export const ModalContext = createContext<IModalContext | undefined>(undefined);

interface ModalContextProviderProps{
    children: React.ReactNode
}

const ModalContextProvider: React.FC<ModalContextProviderProps> = ({ children }) => {
    const [value, setValue] = useState<modalType>(modalType.none);
    const [user, setUser] = useState<any>();
    const [isAuth, setIsAuth] = useState<boolean>(false);

    const updateValue = (newValue: modalType) => {
        setValue(newValue);
    };




    const modalContextValue: IModalContext = {
        value,
        updateValue,
        user,
        setUser,
        isAuth,
        setIsAuth
    };




    return (
        <ModalContext.Provider value={modalContextValue}>
            {children}
        </ModalContext.Provider>
    );
};

export default ModalContextProvider;
