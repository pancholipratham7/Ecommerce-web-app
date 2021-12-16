import classes from "./App.module.css";
import Header from "./components/Header.js";
import HomePage from "./pages/HomePage";
import React from "react";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import CartPage from "./pages/CartPage";
import { Route, Switch } from "react-router-dom";
import LoginPage from "./pages/loginPage";
import RegisterPage from "./pages/registerPage";
import ProfilePage from "./pages/ProfilePage";
import ShippingPage from "./pages/shippingPage";
import PaymentPage from "./pages/paymentPage";
import PlaceOrder from "./pages/PlaceOrder";
import OrderPage from "./pages/OrderPage";
import UsersList from "./pages/usersList";
import UserEditPage from "./pages/UserEditPage";
import ProductsListPage from "./pages/ProductsListPage";
import ProductEditPage from "./pages/ProductEditPage";
import AllOrdersList from "./pages/allOrdersListPage";
function App() {
  return (
    <div className={classes.pageContainer}>
      <Header />
      <main className={classes.mainContainer}>
        <Switch>
          <Route path="/admin/ordersList">
            <AllOrdersList />
          </Route>
          <Route path="/admin/product/:id/edit">
            <ProductEditPage />
          </Route>
          <Route path="/admin/productsList">
            <ProductsListPage />
          </Route>
          <Route path="/admin/user/:id/edit">
            <UserEditPage />
          </Route>
          <Route path="/admin/usersList">
            <UsersList />
          </Route>
          <Route path="/shipping">
            <ShippingPage />
          </Route>
          <Route path="/payment">
            <PaymentPage />
          </Route>
          <Route path="/placeOrder">
            <PlaceOrder />
          </Route>
          <Route path="/order/:id">
            <OrderPage />
          </Route>
          <Route path="/product/:id">
            <ProductDetailsPage />
          </Route>
          {/* Here we added ? on id param which means this is optional so this route will match for /cart as well as for /cart/3 */}
          <Route path="/cart/:id?">
            <CartPage />
          </Route>
          <Route path="/login">
            <LoginPage />
          </Route>
          <Route path="/register">
            <RegisterPage />
          </Route>
          <Route path="/profile">
            <ProfilePage />
          </Route>
          <Route path="/">
            <HomePage />
          </Route>
        </Switch>
      </main>
    </div>
  );
}

export default App;
