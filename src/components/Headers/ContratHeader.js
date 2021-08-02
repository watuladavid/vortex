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

// reactstrap components
import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";

const categorieClient = [
  "Particuliers ordinaires",
  "Entreprises non financières",
  "Adm. publiques conventionnées",
  "Adm. publiques non conventionnées",
  "Entreprises non financières publiques",
  "Particuliers Agents SNE",
  "Banques et Assurances",
  "Prises en charges",
  "Ambassades et Organismes internationaux"
]

export default function ContratHeader({abonnement, factures}){
  const clientInfo = abonnement[0];
  let totalFacturation = 0;
  let nombreReglement = 0;
  let totalReglement = 0;

  console.log("je suis client", clientInfo)

  factures.forEach(facture => {
    totalFacturation += facture.montantfacture

    if(facture.etatfacture == "S"){
      nombreReglement = nombreReglement + 1
      console.log(nombreReglement)
      totalReglement += facture.montantfacture
    }else{
      totalReglement += facture.soldefactures
    }
  });

  return (
    <>
      <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
        <Container fluid>
          <div className="header-body">
            {/* Card stats */}
            <Row>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase mb-0"
                        >
                          N° Client {clientInfo.numclient}
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                          {clientInfo.nomclient}
                        </span>
                      </div>
                    </Row>
                    <p className="mt-1 mb-0">
                      Categorie: {categorieClient[clientInfo.categorie - 1]}
                    </p>
                    <p className="mt-1 mb-0">
                      Ville: BRAZZAVILLE
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0" color="info">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-white mb-0"
                        >
                          FACTURATION
                        </CardTitle>
                        <span className="h4 font-weight-bold mb-0">
                          Nombres Factures : {factures.length}
                        </span><br></br>
                        <span className="h4 font-weight-bold mb-0">
                          Total Facturation : {totalFacturation} Fcfa
                        </span>
                      </div>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0" color="danger">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-white mb-0"
                        >
                          IMPAYEES
                        </CardTitle>
                        <span className="h4 font-weight-bold mb-0">
                          Nombres Factures : {factures.length - nombreReglement}
                        </span><br></br>
                        <span className="h4 font-weight-bold mb-0">
                          Montant Dette : {totalFacturation - totalReglement} Fcfa
                        </span>
                      </div>
                    </Row>
                    {/*<div className="mt-3 mb-0 text-white text-sm">
                      <p className="text-nowrap">iuyyuyiu</p>
                    </div>*/}
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0" color="success">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase mb-0 text-white"
                        >
                          REGLEMENTS
                        </CardTitle>
                        <span className="h4 font-weight-bold mb-0">
                          Nombres Factures : {nombreReglement}
                        </span><br></br>
                        <span className="h4 font-weight-bold mb-0">
                          Total Règlement : {totalReglement} Fcfa
                        </span>
                      </div>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </>
  );
}

