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
/*eslint-disable*/
import React from "react";

// reactstrap components
import { Container, Row, Col, Nav, NavItem, NavLink } from "reactstrap";

class Footer extends React.Component {
  render() {
    return (
      <footer className="py-3 footer-e2c">
        <Row className="align-items-center">
          <Col xl="12">
            <div className="text-center">
              <a
                href="https://e2c.cg"
                target="_blank"
              >
                2021 Copyright E²C SA
              </a>
            </div>
          </Col>

          {/*<Col xl="6">
            <Nav className="nav-footer justify-content-center justify-content-xl-end">
              <NavItem>
                <NavLink
                  href="https://www.creative-tim.com?ref=adr-admin-footer"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Creative Tim
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink
                  href="https://www.creative-tim.com/presentation?ref=adr-admin-footer"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  About Us
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink
                  href="http://blog.creative-tim.com?ref=adr-admin-footer"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Blog
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink
                  href="https://github.com/creativetimofficial/argon-dashboard/blob/master/LICENSE.md?ref=adr-admin-footer"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  MIT License
                </NavLink>
              </NavItem>
            </Nav>
    </Col>*/}
        </Row>
      </footer>
    );
  }
}

export default Footer;
