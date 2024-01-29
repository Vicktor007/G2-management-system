import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getLoginStatus } from "./redux/features/auth/authService";
import { SET_LOGIN } from "./redux/features/auth/authSlice";
import axios from "axios";
import Login from "./pages/auth/Login";
import Home from "./pages/Home/Home";
import Register from "./pages/auth/Register";
import Sidebar from "./components/sidebar/Sidebar";
import Layout from "./components/layout/Layout";
import Profile from "./pages/profile/Profile";
import About from "./pages/about/About";
import Contact from "./pages/contact/Contact";
import EditProfile from "./pages/profile/EditProfile";
import Dashboard from "./pages/dashboard/Dashboard";
import AddCustomer from "./pages/addCustomer/AddCustomer";
import CustomerDetail from "./components/customer/customerDetail/customerDetail";
import EditCustomer from "./pages/editCustomer/EditCustomer";

axios.defaults.withCredentials = true;

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        async function loginStatus() {
            const status = await getLoginStatus();
            dispatch(SET_LOGIN(status));
        }
        loginStatus();
    },[dispatch])

    return (
        <BrowserRouter>
        
           <ToastContainer/>
           <Routes>
           <Route
          path="/"
          element={
            
              
             <Sidebar>
                 <Home />
             </Sidebar>
              
           
          }
        />

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />



            <Route
          path="/dashboard"
          element={
            <Sidebar>
              <Layout>
                <Dashboard />
              </Layout>
            </Sidebar>
          }
        />


<Route
          path="/add-customer"
          element={
            <Sidebar>
              <Layout>
                <AddCustomer />
              </Layout>
            </Sidebar>
          }
        />

<Route
          path="/customer-detail/:id"
          element={
            <Sidebar>
              <Layout>
                <CustomerDetail />
              </Layout>
            </Sidebar>
          }
        />

<Route
          path="/edit-customer/:id"
          element={
            <Sidebar>
              <Layout>
                <EditCustomer />
              </Layout>
            </Sidebar>
          }
        />

            <Route
          path="/profile"
          element={
            <Sidebar>
              <Layout>
                <Profile />
              </Layout>
            </Sidebar>
          }
        />

<Route
          path="/edit-profile"
          element={
            <Sidebar>
              <Layout>
                <EditProfile />
              </Layout>
            </Sidebar>
          }
        />

<Route
          path="/about"
          element={
            <Sidebar>
              <Layout>
                <About />
              </Layout>
            </Sidebar>
          }
        />

        <Route
          path="/contact-us"
          element={
            <Sidebar>
              <Layout>
                <Contact />
              </Layout>
            </Sidebar>
          }
        />
           </Routes>

        </BrowserRouter>
    );
}

export default App;