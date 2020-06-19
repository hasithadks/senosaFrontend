import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch , Route } from 'react-router-dom';

import Home from "./components/Main_components/Home";
import Login from "./components/User_components/Login";
import Register from "./components/User_components/Register";
import Profile from "./components/User_components/Profile";
import Editprofile from "./components/User_components/Editprofile";
import PasswordChange from "./components/User_components/PasswordChange";
import ForgotPassword from "./components/User_components/ForgotPassword";
import ResetPassword from "./components/User_components/ResetPassword";

// IT18063288
import ProductDetails from "./components/Cart_and_purchasing_Components/ProductDetails";
import shoppingCart from "./components/Cart_and_purchasing_Components/ShoppingCart";
import OrderSummary from "./components/Cart_and_purchasing_Components/OrderSummary";
import DeliveryDetails from "./components/Cart_and_purchasing_Components/DeliveryDetails";
import FavoList from "./components/Cart_and_purchasing_Components/FavouriteList";
import ProductRatings from "./components/Cart_and_purchasing_Components/ProductRatings";
import shoppingCartProcess from "./components/Cart_and_purchasing_Components/ShoppingCartProcess";
import SuccessMessage from "./components/Cart_and_purchasing_Components/SuccessMessage";


import ItemFooter from "./components/ProductAddComponent/footer-item-component";
import ItemNav from "./components/ProductAddComponent/nav-item-component";

import DashboardIndex from "./components/DashboardComponents/index.component";

function App() {
    return (
        <div className="App">
            <Router>
                <ItemNav/>
                <Switch>
                    <Route path="/login"><Login/></Route>
                    <Route path="/register"><Register/></Route>
                    <Route path="/home"><Home/></Route>
                    <Route path="/profile"><Profile/></Route>
                    <Route path="/edit"><Editprofile/></Route>
                    <Route path="/passwordchange"><PasswordChange/></Route>
                    <Route path="/forgotpassword"><ForgotPassword/></Route>
                    <Route path="/resetpassword"><ResetPassword/></Route>
                    {/*<Route path="/productDetails"><ProductDetails/></Route>*/}
                    <Route path="/productDetails" exact component={ProductDetails}/>
                    <Route path="/productDetails/:id" exact component={ProductDetails}/>
                    <Route path="/shoppingcart" exact component={shoppingCart}/>
                    <Route path="/ProductRatings" exact component={ProductRatings}/>
                    <Route path="/deliveryDetails" exact component={DeliveryDetails}/>
                    <Route path="/orderSummery" exact component={OrderSummary}/>
                    <Route path="/FavouriteList" exact component={FavoList}/>
                    <Route path="/admin"><DashboardIndex/></Route>
                    <Route path="/shoppingCartProcess" exact component={shoppingCartProcess}/>
                    <Route path="/SuccessMessage" exact component={SuccessMessage}/>
                </Switch>
                <ItemFooter/>
            </Router>
        </div>
    );
}

export default App;
