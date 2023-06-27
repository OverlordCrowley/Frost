import React, {useContext} from 'react';
import {Route, Routes} from "react-router-dom";
import MainPage from "./Components/Pages/MainPage";
import Layout from "./Components/Pages/Layout";
import Product from "./pages/Product/Product";
import Cart from "./pages/Cart/Cart";
import {ModalContext} from './store/ModalContext';
import Modal from "./Components/Modal/Modal";
import {modalType} from "./types/types";


const App: React.FC = () => {

    const modalContext = useContext(ModalContext);

  return (
          <div className="App">

              {/*<Modal opened={true}>*/}
              {/*    <p>ZZZ</p>*/}
              {/*</Modal>*/}

              {modalContext?.value !== modalType.none && modalContext?.value !== undefined ? (<Modal/>): ''}
              <Routes>
                  <Route path="/" element={<Layout/>}>
                      <Route index element={<MainPage/>}/>
                      <Route path='/item/:id' element={<Product/>} />
                      <Route path='/cart' element={<Cart/>}/>
                  </Route>
              </Routes>
          </div>
  );
}

export default App;
