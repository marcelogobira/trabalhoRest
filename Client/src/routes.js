/*!

=========================================================
* Black Dashboard React v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import UpdateUser from "views/user/UpdateUser.js";
import RegisterUser from "views/user/CreateUser.js";
import ListUsers from "views/user/ListUsers";

var routes = [
  {
    path: "/register",
    name: "Criar Usuário",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-chart-pie-36",
    component: RegisterUser,
    layout: "/user",
    showMenu: true
  },
  {
    path: "/update",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-chart-pie-36",
    component: UpdateUser,
    layout: "/user",
    showMenu: false
  },
  {
    path: "/list",
    name: "Listar Usuários",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-chart-pie-36",
    component: ListUsers,
    layout: "/user",
    showMenu: true
  }];
export default routes;
