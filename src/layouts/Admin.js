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
import { Route, Switch, Redirect } from "react-router-dom";

// reactstrap components
import { Container } from "reactstrap";
// core components
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import AdminFooter from "components/Footers/AdminFooter.js";
import Sidebar from "components/Sidebar/Sidebar.js";

import { useQuery } from '@apollo/client';
import { GET_CLIENTS } from "../queries.js";
import { useAuth } from "../contexts/AuthContext.js"

import Logo from "../assets/img/brand/logo.png"

import routes from "routes.js";

function Admin(props) {
  const { currentUser } = useAuth()
  const numClient = JSON.parse(window.localStorage.getItem('authUser')).uid;
  const userClients = useQuery(GET_CLIENTS, {variables: {"numclient": {"_eq": numClient}}})

  /*componentDidUpdate(e) {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.mainContent.scrollTop = 0;
  }*/
  console.log(userClients)

  const getRoutes = routes => {
    return routes.map((prop, key) => {
      if (prop.layout === "/admin") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };
  
  const getBrandText = path => {
    for (let i = 0; i < routes.length; i++) {
      if (
        props.location.pathname.indexOf(
          routes[i].layout + routes[i].path
        ) !== -1
      ) {
        return routes[i].name;
      }
    }
    return "Brand";
  };

    return (
      <>
        {<Sidebar
          {...props}
          routes={routes}
          logo={{
            innerLink: "/admin/index",
            imgSrc: Logo,
            imgAlt: "..."
          }}
        />}
        <div className="main-content">
          <AdminNavbar
            {...props}
            brandText={getBrandText(props.location.pathname)}
          />
          <Switch>
              {getRoutes(routes)}
              <Redirect from="*" to="/admin/index" />
          </Switch>
          <AdminFooter />
        </div>
      </>
    );
}

export default Admin;
