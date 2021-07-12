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
import Index from "views/Index.js";
import Profile from "views/examples/Profile.js";
//import Maps from "views/examples/Maps.js";
import Register from "views/examples/Register.js";
import Login from "views/examples/Login.js";
import ForgotPassword from "views/examples/ForgotPassword.js"
//import Tables from "views/examples/Tables.js";
//import Icons from "views/examples/Icons.js";
import Contrats from "views/examples/Contrats.js"
import AddContrat from "views/examples/AddContrat.js"

var routes = [
  {
    path: "/contrats",
    name: "Contrats",
    icon: "ni ni-tv-2 text-primary",
    component: Contrats,
    layout: "/admin"
  },
  {
    path: "/contrat/add",
    name: "Ajouter un contrat",
    icon: "ni ni-tv-2 text-primary",
    component: AddContrat,
    layout: "/admin"
  },
  {
    path: "/index",
    name: "Tableau de bord",
    icon: "ni ni-tv-2 text-primary",
    component: Index,
    layout: "/admin"
  },
  {
    path: "/user-profile",
    name: "User Profile",
    icon: "ni ni-single-02 text-yellow",
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
