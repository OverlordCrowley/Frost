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
    BASKET_ROUTE_STEP_FOUR,
    BASKET_ROUTE_STEP_TWO,
    BASKET_ROUTE_STEP_THREE,
    CONTACT_ROUTE,
    DELIVERY_ROUTE,
    DEVICE_ROUTE,
    HISTORY_ROUTE,
    PROFILE_ROUTE, PASSWORD_ROUTE,
} from "./utils/consts";
import NotFound from "./pages/NotFound/NotFound";
import Profile from "./pages/Profile/Profile";
import Contact from "./Components/Contact/Contact";
import Delivery from "./Components/Delivery/Delivery";
import HistoryBlock from "./Components/History/HistoryBlock";
import CartStepTwo from "./pages/CartStepTwo/CartStepTwo";
import CartStepThree from "./pages/CartStepThree/CartStepThree";
import CartStepFour from "./pages/CartStepFour/CartStepFour";
import Forgot from "./pages/Forgot/Forgot";

const App: React.FC = () => {

    const modalContext = useContext(ModalContext);
    // const navigate = useNavigate();

  return (
          <div className="App">

              {/*<Modal opened={true}>*/}
              {/*    <p>ZZZ</p>*/}
              {/*</Modal>*/}

              {/*{modalContext?.value !== modalType.none && modalContext?.value !== undefined ? (<Modal/>): ''}*/}
              <Modal/>

              <Routes>
                  <Route path="/" element={<Layout />}>
                      <Route index element={<MainPage />} />
                      <Route path={DEVICE_ROUTE} element={<Product />} />
                      <Route path={BASKET_ROUTE} element={<Cart />} />
                      <Route path={BASKET_ROUTE_STEP_TWO} element={<CartStepTwo />} />
                      <Route path={BASKET_ROUTE_STEP_THREE} element={<CartStepThree />} />
                      <Route path={BASKET_ROUTE_STEP_FOUR} element={<CartStepFour />} />
                      <Route path={PASSWORD_ROUTE} element={<Forgot/>} />
                      <Route path={PROFILE_ROUTE} element={<Profile />}>
                          <Route path={HISTORY_ROUTE} element={<HistoryBlock />} />
                          <Route path={CONTACT_ROUTE} element={<Contact />} />
                          <Route path={DELIVERY_ROUTE} element={<Delivery />} />
                      </Route>
                      <Route path="*" element={<NotFound />} />
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
