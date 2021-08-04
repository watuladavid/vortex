/*!

=========================================================
* Argon Dashboard React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

import React from "react";

import Index from "views/Index.js";
import Profile from "views/examples/Profile.js";
import Paiements from "views/examples/Paiements.js";
//import Maps from "views/examples/Maps.js";
import Register from "views/examples/Register.js";
import Login from "views/examples/Login.js";
import ForgotPassword from "views/examples/ForgotPassword.js"
//import Tables from "views/examples/Tables.js";
//import Icons from "views/examples/Icons.js";
import { Gear, Cart, Tag } from 'akar-icons';

var routes = [
  {
    path: "/index",
    name: "Mes facturations",
    icon: <Tag className="mr-2" size={20} color="#F5E034" />,
    component: Index,
    layout: "/admin"
  },
  {
    path: "/paiements",
    name: "Paiements Espace Client",
    icon: <Cart className="mr-2" size={20} color="#F5E034" />,
    component: Paiements,
    layout: "/admin"
  },
  {
    path: "/user-profile",
    name: "Parametre",
    icon: <Gear className="mr-2" size={20} color="#F5E034" />,
    component: Profile,
    layout: "/admin"
  },
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: Login,
    layout: "/auth"
  },
  {
    path: "/register",
    name: "Register",
    icon: "ni ni-circle-08 text-pink",
    component: Register,
    layout: "/auth"
  },
  {
    path: "/forgot-password",
    name: "Forgot Password",
    icon: "ni ni-circle-08 text-pink",
    component: ForgotPassword,
    layout: "/auth"
  },

];
export default routes;

/*{
  path: "/icons",
  name: "Icons",
  icon: "ni ni-planet text-blue",
  component: Icons,
  layout: "/admin"
},
{
  path: "/maps",
  name: "Maps",
  icon: "ni ni-pin-3 text-orange",
  component: Maps,
  layout: "/admin"
}, 
{
    path: "/tables",
    name: "Tables",
    icon: "ni ni-bullet-list-67 text-red",
    component: Tables,
    layout: "/admin"
  },

*/
