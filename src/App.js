import { Routes, Route } from "react-router-dom"

import Home from "./routes/home/home.component";
import Navigation from "./routes/navigation/navigation.component"
import Authentication from "./routes/authentication/authentication.component";
import Shop from "./routes/shop/shop.component";
import Checkout from "./routes/checkout/checkout.component";

import { useEffect } from "react";
import { checkUserSession } from "./store/user/user.action";
import { useDispatch } from "react-redux";

const App = () => {
  // dispatch comes from react-redux, and returns the dispatch for the root reducer
  const dispatch = useDispatch();

  // helps us manage the current user
  useEffect(() => {
    dispatch(checkUserSession());
  }, []);

  // useEffect(() => {
  //   const unsubscribe = onAuthStateChangedListener((user) => {
  //     if (user) {
  //       createUserDocFromAuth(user);
  //     }
  //     dispatch(setCurrentUser(user));
  //   });

  //   return unsubscribe;
  // }, []);

  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="shop/*" element={<Shop />} />
        <Route path="auth" element={<Authentication />} />
        <Route path="checkout" element={<Checkout />} />
      </Route>
    </Routes>
  );
}

export default App;
