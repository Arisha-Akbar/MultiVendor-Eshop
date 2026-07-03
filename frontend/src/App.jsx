import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import {
  LoginPage,
  SignupPage,
  ActivationPage,
  HomePage,
  ProductPage,
  BestSellingPage,
  EventsPage,
  FAQPage,
  ProfilePage,
  ProductDetailsPage,
} from "./routes/Routes.js";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";
import { loadUser } from "./redux/actions/user.js";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { server } from "./server";
import axios from "axios";
const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUser());
  }, []);
  useEffect(() => {
    axios
      .get(`${server}/user/get-user`, { withCredentials: true })
      .then((res) => {
        toast.success(res.data.element);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sign-up" element={<SignupPage />} />
        <Route
          path="/activation/:activation_token"
          element={<ActivationPage />}
        />
        <Route path="/products" element={<ProductPage />} />
        
          <Route path='/product/:id' element={<ProductDetailsPage />} />
        <Route path="/best-selling" element={<BestSellingPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/profile" element={<ProfilePage />} />

        <Route path="/faq" element={<FAQPage />} />
      </Routes>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </BrowserRouter>
  );
};

export default App;
