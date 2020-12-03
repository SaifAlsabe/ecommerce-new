import React from 'react';
import './App.css';
import Header from './components/header/Header';
import Footer from './components/footer/Footer'
import HomeScreen from './screens/home/HomeScreen';
import ProductScreen from './screens/product/ProductScreen';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import CartScreen from './screens/cart/CartScreen';
import SigninScreen from './screens/signin/SigninScreen';
import SignupScreen from './screens/signup/SignupScreen';
import { PrivateRoute } from './components/auth/PrivateRoute';
import ShippingScreen from './screens/shipping/ShippingScreen';
import ErrorScreen from './screens/error/ErrorScreen';
import ProfileScreen from './screens/profile/ProfileScreen';
import PaymentScreen from './screens/payment/PaymentScreen';
import SummaryScreen from './screens/summary/SummaryScreen';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="App">

        <Header />
 
        <Switch>
          <Route path={["/", "/shop/:category?"]} exact={true} component={HomeScreen} ></Route>
          <Route path="/product" component={ProductScreen} ></Route>
          <Route path="/cart" exact={true} component={CartScreen} ></Route>
          <Route path="/signin" exact={true} component={SigninScreen} ></Route>
          <Route path="/signup" exact={true} component={SignupScreen} ></Route>
          <PrivateRoute path="/profile" exact={true} component={ProfileScreen}></PrivateRoute>
          <PrivateRoute path="/shipping" exact={true} component={ShippingScreen}></PrivateRoute>
          <PrivateRoute path="/payment" exact={true} component={PaymentScreen}></PrivateRoute>
          <PrivateRoute path="/summary" exact={true} component={SummaryScreen}></PrivateRoute>
          <Route path="*" component={ErrorScreen} />
        </Switch>

        <Footer />

      </div>
    </BrowserRouter>
  );
}

export default App;
