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
function App() {
  return (
    <div className={classes.pageContainer}>
      <Header />
      <main className={classes.mainContainer}>
        <Switch>
          <Route path="/shipping">
            <h1>Shipping Page</h1>
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
