
import {
    BASKET_ROUTE,
    CONTACT_ROUTE,
    DELIVERY_ROUTE,
    DEVICE_ROUTE,
    HISTORY_ROUTE,
    SHOP_ROUTE
} from "./utils/consts";
import Main from "./pages/Main/Main";
import Cart from "./pages/Cart/Cart";
import Product from "./pages/Product/Product";
import History from "./pages/History/History";
import Contact from "./pages/Contact/Contact";
import Delivery from "./pages/Delivery/Delivery";
import React from "react";

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
]
