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
import { Link } from "react-router-dom";
// reactstrap components
import {
  UncontrolledCollapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col
} from "reactstrap";

import Logo from "../../assets/img/brand/logo.png"

class AdminNavbar extends React.Component {
  render() {
    return (
      <>
        <Navbar
          className="navbar-top-auth navbar-horizontal navbar-dark"
          expand="md"
        >
          <Container className="nav-bottom">
            <Row className="justify-content-md-center mx-auto">
              <Col lg={{size: "auto"}}>
                <Link to="/" tag={Link} className="mx-auto">
                  <img alt="Energie Electrique du CONGO" src={Logo} width="248" height="112" />
                </Link>
              </Col>
            </Row>
          </Container>
        </Navbar>
      </>
    );
  }
}

export default AdminNavbar;
