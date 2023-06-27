export interface IComment{
    name: string;
    text: string;
}

export interface IFit {
    id: number;
    text: string;
    filling: Fill;
    active: boolean;
    items: IFitLevel2[];
}

export interface IFitLevel2 {
    secondId: number;
    text: string;
    filling: Fill;
    active: boolean;
    items?: IFitLevel3[];
}

export interface IFitLevel3 {
    thirdId: number;
    text: string;
    filling: Fill.empty;
}

export interface Item{
    name: string;
    id: number;
    price: number;
    link: string;
    image: string;
}

export interface IItems{
    items: Item[]
}

export interface IPages{
    totalPages: number;
    currentPage: number;
}

export interface ISelect{
    id: number;
    name: string;
}

export interface ICategories{
    items: ISelect[] | [];
    name: string;
    standard: string;
}

export interface IModels{
    items: ISelect[] | [];
    name: string;
    standard: string;
}

export interface IBrands{
    items: ISelect[] | [];
    name: string;
    standard: string;
}

export interface IGeneration{
    items: ISelect[] | [];
    name: string;
    standard: string;
}

export enum Fill{
    full = 'full',
    empty = 'empty'
}

export interface IProduct{
    code: string;
    description: string;
    name: string;
    manufacturer: string;
    price: string;
}

export interface IModalContext {
    value: string;
    updateValue: (newValue: modalType) => void;
}

export enum modalType {
    reg = 'register',
    login = 'login',
    addToCart = 'addToCart',
    forgotPass = 'forgotPass',
    none = 'none'
}
