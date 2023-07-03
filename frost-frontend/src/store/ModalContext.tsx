import React, {createContext, useContext, useState} from "react";
import {IModalContext, modalType} from '../types/types';

export const ModalContext = createContext<IModalContext | undefined>(undefined);

interface ModalContextProviderProps{
    children: React.ReactNode
}

const ModalContextProvider: React.FC<ModalContextProviderProps> = ({ children }) => {
    const [value, setValue] = useState<modalType>(modalType.none);
    const [user, setUser] = useState<modalType>(modalType.none);
    const [isAuth, setIsAuth] = useState<modalType>(modalType.none);

    const updateValue = (newValue: modalType) => {
        setValue(newValue);
    };

    const modalContextValue: IModalContext = {
        value,
        updateValue
    };




    return (
        <ModalContext.Provider value={modalContextValue}>
            {children}
        </ModalContext.Provider>
    );
};

export default ModalContextProvider;
