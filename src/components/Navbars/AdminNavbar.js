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
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
// reactstrap components
import {
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Form,
  FormGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  InputGroup,
  Navbar,
  Nav,
  Container,
  Media,
  Button,
  Badge
} from "reactstrap";

import { useAuth } from "../../contexts/AuthContext"
//import Logo from "../../assets/img/brand/logo.png"

function AdminNavbar (props) {
  const [error, setError] = useState("")
  const { logout } = useAuth()
  const { history } = useHistory()

  async function handleLogout() {
    setError("")

    try {
      await logout()
      history.push("/auth/login")
    } catch(error) {
      setError(error)
    }
  }

    return (
      <>
        <Navbar className="navbar-top navbar-dark" expand="md" id="navbar-main">
          <Container fluid>
            <Link
              className="d-none d-lg-inline-block"
              to="/admin/index"
              style={{fontSize: "18px", color: "#000030"}}
            >
              {props.brandText}
            </Link>
            {/*<Form className="navbar-search navbar-search-dark form-inline mr-3 d-none d-md-flex ml-lg-auto">
              <FormGroup className="mb-0">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="fas fa-search" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input placeholder="Search" type="text" />
                </InputGroup>
              </FormGroup>
            </Form>*/}
            {/*<Nav className="align-items-center d-none d-md-flex" navbar>
              <Button onClick={handleLogout} className="btn-white">
                <span>Nouvelle Facture</span>
                <Badge className="badge-md badge-circle badge-nvl-facture">1</Badge>
              </Button>
              <Button onClick={handleLogout} className="btn-white">
                <span>Factures impayées</span>
                <Badge className="badge-md badge-circle badge-facture-impayee">1</Badge>
          </Button>}
              <Button onClick={handleLogout} className="logout-button">Déconnexion</Button>
            </Nav>
            {error && <p>{error}</p>*/}
          </Container>
        </Navbar>
      </>
    );
}

export default AdminNavbar;
