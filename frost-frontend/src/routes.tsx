
import {
    BASKET_ROUTE, BASKET_ROUTE_STEP_FOUR, BASKET_ROUTE_STEP_THREE, BASKET_ROUTE_STEP_TWO,
    CONTACT_ROUTE,
    DELIVERY_ROUTE,
    DEVICE_ROUTE,
    HISTORY_ROUTE, PASSWORD_ROUTE,
    SHOP_ROUTE
} from "./utils/consts";
import Main from "./pages/Main/Main";
import Cart from "./pages/Cart/Cart";
import Product from "./pages/Product/Product";
import React from "react";
import Contact from "./Components/Contact/Contact";
import Delivery from "./Components/Delivery/Delivery";
import History from "./Components/History/HistoryBlock";
import CartStepTwo from "./pages/CartStepTwo/CartStepTwo";
import CartStepThree from "./pages/CartStepThree/CartStepThree";
import CartStepFour from "./pages/CartStepFour/CartStepFour";

interface IPublicRoutes {
    path: string;
    Component: React.ComponentType;
}

export const authRoutes = [
    {
        path: HISTORY_ROUTE,
        Component: History
    },
    {
        path: CONTACT_ROUTE,
        Component: Contact
    },
    {
        path: DELIVERY_ROUTE,
        Component: Delivery
    },
    {
        path: BASKET_ROUTE,
        Component: Cart
    },
    {
        path: BASKET_ROUTE_STEP_TWO,
        Component: CartStepTwo
    },
    {
        path: BASKET_ROUTE_STEP_THREE,
        Component: CartStepThree
    },
    {
        path: BASKET_ROUTE_STEP_FOUR,
        Component: CartStepFour
    },
]

export const publicRoutes: IPublicRoutes[] = [
    {
        path: SHOP_ROUTE,
        Component: Main
    },
    {
        path: DEVICE_ROUTE + '/:id',
        Component: Product
    },
    {
        path: PASSWORD_ROUTE,
        Component: Product
    },
]
