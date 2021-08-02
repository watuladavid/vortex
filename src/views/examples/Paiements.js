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
import classnames from "classnames";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
  Col,
  NavItem,
  NavLink,
  Nav,
  TabContent,
  TabPane,
  Badge,
  ListGroupItem,
  ListGroup,
  Table
} from "reactstrap";
// core components
import UserHeader from "components/Headers/UserHeader.js";

import { useAuth } from "../../contexts/AuthContext";
import { useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom"
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { CREATE_CONTRAT } from '../../queries';


function AddContrat () {
  const { currentUser } = useAuth();
  const [tabs, setTabs] = useState(1);

  function toggleNavs(e, state, index) {
    e.preventDefault();
    setTabs(index);
  }

    return (
      <>
        <UserHeader />
        {/* Page content */}
        <Container className="mt--7" fluid>
          <Row className="justify-content-center">
            <Col className="order-xl-1" xl="6">
          <div className="nav-wrapper">
            <Nav
              className="nav-fill flex-column flex-md-row"
              id="tabs-icons-text"
              pills
              role="tablist"
            >
              <NavItem>
                <NavLink
                  aria-selected={tabs === 1}
                  className={classnames("mb-sm-3 mb-md-0", {
                    active: tabs === 1
                  })}
                  onClick={e => toggleNavs(e, "tabs", 1)}
                  href="airtelmoney"
                  role="tab"
                >
                  Airtel Money
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  aria-selected={tabs === 2}
                  className={classnames("mb-sm-3 mb-md-0", {
                    active: tabs === 2
                  })}
                  onClick={e => toggleNavs(e, "tabs", 2)}
                  href="#mobilemoney"
                  role="tab"
                >
                  Mobile Money
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  aria-selected={tabs === 3}
                  className={classnames("mb-sm-3 mb-md-0", {
                    active: tabs === 3
                  })}
                  onClick={e => toggleNavs(e, "tabs", 3)}
                  href="#bgfi"
                  role="tab"
                >
                  BGFI
                </NavLink>
              </NavItem>
            </Nav>
          </div>
          <Card className="shadow">
            <CardBody>
              <TabContent activeTab={"tabs" + tabs}>
                <TabPane tabId="tabs1">
                  <ListGroup>
                    <ListGroupItem className="d-flex align-items-center">
                      <Badge color="primary" pill>
                        Etape 1
                      </Badge>
                      {" "}Composer *128#
                    </ListGroupItem>
                    <ListGroupItem className="d-flex align-items-center">
                      <Badge color="primary" pill>
                        Etape 2
                      </Badge>
                      {" "}Choisir Option 3 - Payer Facture
                    </ListGroupItem>
                    <ListGroupItem className="d-flex align-items-center">
                      <Badge color="primary" pill>
                        Etape 3
                      </Badge>
                      {" "}Choisir Option 1 - Factures ( Services publics)
                    </ListGroupItem>
                    <ListGroupItem className="d-flex align-items-center">
                      <Badge color="primary" pill>
                        Etape 4
                      </Badge>
                      {" "}Choisir Option 1 - SNE
                    </ListGroupItem>
                    <ListGroupItem className="d-flex align-items-center">
                      <Badge color="primary" pill>
                        Etape 5
                      </Badge>
                      {" "}Choisir Option 1 - Mon compte mémorisé (vous pouvez enregistrez votre reference de paiement pour ne plus avoir à la saisir les prochaines fois )
                    </ListGroupItem>
                    <ListGroupItem className="d-flex align-items-center">
                      <Badge color="primary" pill>
                        Etape 5
                      </Badge>
                      {" "}Choisir Option 2 - Avec une autre reference de paiement (Entrez les 18 chiffres en dessous de la référence de paiement facture par téléphone, se trouvant à gauche sur votre facture )
                    </ListGroupItem>
                    <ListGroupItem className="d-flex align-items-center">
                      <Badge color="primary" pill>
                        Etape 6
                      </Badge>
                      {" "}Entrer le montant de la facture SNE à payer
                    </ListGroupItem>
                    <ListGroupItem className="d-flex align-items-center">
                      <Badge color="primary" pill>
                        Etape 7
                      </Badge>
                      {" "}Confirmer votre transaction
                    </ListGroupItem>
                    <ListGroupItem className="d-flex align-items-center">
                      <Badge color="primary" pill>
                        Etape 9
                      </Badge>
                      {" "}Entrer votre mot de passe
                    </ListGroupItem>
                  </ListGroup>
                  <h3 className="pt-2">Tarifs</h3>
                  <Table>
                    <thead className="thead-light">
                      <tr>
                        <th scope="col">Intervalles en FCFA</th>
                        <th scope="col">Coût de la transaction FCFA</th>
                      </tr>
                    </thead>
                    <tbody>
                      <td>Minimum 1000 FCFA à 2.000.000 FCFA</td>
                      <td>300</td>
                    </tbody>
                  </Table>
                </TabPane>
                <TabPane tabId="tabs2">
                <ListGroup>
                    <ListGroupItem className="d-flex align-items-center">
                      <Badge color="primary" pill>
                        Etape 1
                      </Badge>
                      {" "}Composez *104#Ok
                    </ListGroupItem>
                    <ListGroupItem className="d-flex align-items-center">
                      <Badge color="primary" pill>
                        Etape 2
                      </Badge>
                      {" "}Choisissez 4 Payer Factures
                    </ListGroupItem>
                    <ListGroupItem className="d-flex align-items-center">
                      <Badge color="primary" pill>
                        Etape 3
                      </Badge>
                      {" "}Saisissez 1 Payer factures
                    </ListGroupItem>
                    <ListGroupItem className="d-flex align-items-center">
                      <Badge color="primary" pill>
                        Etape 4
                      </Badge>
                      {" "}Choisissez 1 EEC BRAZZAVILLE ou 2 EEC POINTE NOIRE
                    </ListGroupItem>
                    <ListGroupItem className="d-flex align-items-center">
                      <Badge color="primary" pill>
                        Etape 5
                      </Badge>
                      {" "}Saisissez la référence du paiement
                    </ListGroupItem>
                    <ListGroupItem className="d-flex align-items-center">
                      <Badge color="primary" pill>
                        Etape 6
                      </Badge>
                      {" "}Tapez le montant
                    </ListGroupItem>
                    <ListGroupItem className="d-flex align-items-center">
                      <Badge color="primary" pill>
                        Etape 7
                      </Badge>
                      {" "}Choisissez 1 pour confirmer
                    </ListGroupItem>
                    <ListGroupItem className="d-flex align-items-center">
                      <Badge color="primary" pill>
                        Etape 8
                      </Badge>
                      {" "}Composez *105#Ok
                    </ListGroupItem>
                    <ListGroupItem className="d-flex align-items-center">
                      <Badge color="primary" pill>
                        Etape 9
                      </Badge>
                      {" "}Tapez 1 pour confirmer et Insérez votre Code PIN
                    </ListGroupItem>
                  </ListGroup>
                  <h3 className="pt-2">Tarifs</h3>
                  <Table>
                    <thead className="thead-light">
                      <tr>
                        <th scope="col">Tranches (FCFA)</th>
                        <th scope="col">Frais d'envoi (FCFA)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>1-20.000</td>
                        <td>300</td>
                      </tr>
                      <tr>
                        <td>20.001-750.000</td>
                        <td>500</td>
                      </tr>
                    </tbody>
                  </Table>
                </TabPane>
                <TabPane tabId="tabs3">
                  <p className="description">
                    Raw denim you probably haven't heard of them jean shorts
                    Austin. Nesciunt tofu stumptown aliqua, retro synth master
                    cleanse. Mustache cliche tempor, williamsburg carles vegan
                    helvetica. Reprehenderit butcher retro keffiyeh dreamcatcher
                    synth.
                  </p>
                </TabPane>
              </TabContent>
            </CardBody>
          </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
}

export default AddContrat;
