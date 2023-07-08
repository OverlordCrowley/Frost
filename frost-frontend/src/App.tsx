import React, {useContext} from 'react';
import {Route, Routes, useNavigate} from "react-router-dom";
import MainPage from "./Components/Pages/MainPage";
import Layout from "./Components/Pages/Layout";
import Product from "./pages/Product/Product";
import Cart from "./pages/Cart/Cart";
import {ModalContext} from './store/ModalContext';
import Modal from "./Components/Modal/Modal";
import {modalType} from "./types/types";
import {authRoutes, publicRoutes} from "./routes";
import {
    BASKET_ROUTE,
    CONTACT_ROUTE,
    DELIVERY_ROUTE,
    DEVICE_ROUTE,
    HISTORY_ROUTE,
    PROFILE_ROUTE,
    SHOP_ROUTE
} from "./utils/consts";
import History from "./pages/History/History";
import Contact from "./pages/Contact/Contact";
import Delivery from "./pages/Delivery/Delivery";
const {Redirect} = require('react-router-dom');
const {Switch} = require('react-router-dom');

const App: React.FC = () => {

    const modalContext = useContext(ModalContext);
    const navigate = useNavigate();

  return (
          <div className="App">

              {/*<Modal opened={true}>*/}
              {/*    <p>ZZZ</p>*/}
              {/*</Modal>*/}

              {modalContext?.value !== modalType.none && modalContext?.value !== undefined ? (<Modal/>): ''}
              <Routes>
                  <Route path={SHOP_ROUTE} element={<Layout/>}>
                      <Route index element={<MainPage/>}/>
                      <Route path={DEVICE_ROUTE} element={<Product/>} />
                      {modalContext?.isAuth ? <Route path={HISTORY_ROUTE} element={<History/>}/> : '' }
                      {modalContext?.isAuth ? (<Route path={BASKET_ROUTE} element={<Cart/>}/>) : '' }
                      {modalContext?.isAuth ? <Route path={CONTACT_ROUTE} element={<Contact/>}/> : '' }
                      {modalContext?.isAuth ? <Route path={DELIVERY_ROUTE} element={<Delivery/>}/> : '' }
                  </Route>
              </Routes>


                  {/*{modalContext?.isAuth && authRoutes.map(({ path, Component }) => (*/}
                  {/*    <Route key={path} path={path} element={Component}/>*/}
                  {/*))}*/}

                  {/*<Route path="/" element={<Layout/>}>*/}
                  {/*    {publicRoutes.map(({ path, Component }) => (*/}
                  {/*        <Route key={path} path={path} element={<Component />} />*/}
                  {/*    ))}*/}
                  {/*    <Redirect to={SHOP_ROUTE}/>*/}
                  {/*</Route>*/}

          </div>
  );
}

export default App;
