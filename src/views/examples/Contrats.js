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
  Button,
  Card,
  CardHeader,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Pagination,
  PaginationItem,
  PaginationLink,
  Table,
  Container,
  Row,
} from "reactstrap";
// core components
import ContratHeader from "components/Headers/ContratHeader.js";

import { useQuery } from '@apollo/client';
import { GET_CLIENTS } from "../../queries.js";
import { GET_FACTURES } from "../../queries";

function Contrats() {
    const numClient = JSON.parse(window.localStorage.getItem('authUser')).uid;
    const client = useQuery(GET_CLIENTS, {variables: {"numclient": {"_eq": numClient}}})
    const factures = useQuery(GET_FACTURES, {variables: {"numclient": {"_eq": numClient}}})

    if(client.loading) return null;
    if (client.error) return `Error! ${client.error}`;
    console.log(client.data.test_clients)

    if(factures.loading) return null;
    if(factures.error) return `Error! ${factures.error}`;
    console.log(factures.data.test_factures)


    return (
      <>
        <ContratHeader abonnement={client.data.test_clients} factures={factures.data.test_factures} />
        {/* Page content */}
        <Container className="mt--7" fluid>
          {/* Table */}
          <Row>
            <div className="col">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <h3 className="mb-0">Abonnements</h3>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">N° Police</th>
                      <th scope="col">N° Branchement</th>
                      <th scope="col">Nom Client</th>
                      <th scope="col">Adresse Branchement</th>
                      <th scope="col">Ancien Index</th>
                      <th scope="col">Nouvel Index</th>
                      <th scope="col">Consommation</th>
                      <th scope="col">Consommation Totale</th>
                    </tr>
                  </thead>
                  <tbody>
                    {client.data.test_clients.map((d, index) => {
                      return (<tr key={index}>
                                <td>{d.numpolice}</td>
                                <td>{d.numbranchement}</td>
                                <td>{d.nomclient}</td>
                                <td>{d.adressebranchement}</td>
                                <td>{d.ancienindex}</td>
                                <td>{d.nouvelindex}</td>
                                <td>{d.consommation}</td>
                                <td>{d.consommationtotale}</td>
                            </tr>)
                    })}
                  </tbody>
                </Table>
                <CardFooter className="py-4">
                  <nav aria-label="...">
                    <Pagination
                      className="pagination justify-content-end mb-0"
                      listClassName="justify-content-end mb-0"
                    >
                      <PaginationItem className="disabled">
                        <PaginationLink
                          href="#pablo"
                          onClick={e => e.preventDefault()}
                          tabIndex="-1"
                        >
                          <i className="fas fa-angle-left" />
                          <span className="sr-only">Previous</span>
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem className="active">
                        <PaginationLink
                          href="#pablo"
                          onClick={e => e.preventDefault()}
                        >
                          1
                        </PaginationLink>
                      </PaginationItem>
                    </Pagination>
                  </nav>
                </CardFooter>
              </Card>
            </div>
          </Row>
        </Container>
      </>
    );
}

export default Contrats;