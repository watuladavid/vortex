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
import { storage } from "../firebase.js";
// node.js library that concatenates classes (strings)
import classnames from "classnames";
// javascipt plugin for creating charts
//import Chart from "chart.js";
// react plugin used to create charts
//import { Line, Bar } from "react-chartjs-2";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Col
} from "reactstrap";

import { useQuery } from '@apollo/client';
import { GET_FACTURES } from "queries";


// core components
/*import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2
} from "variables/charts.js";*/

import Header from "components/Headers/Header.js";
import { EyeOpen } from 'akar-icons';

const typeFacture = {
  "0": "Régularisation",
  "1": "BT normale",
  "2": "BT normale",
  "4": "Echéance",
  "5": "Facture ASC",
  "6": "Echéance",
  "7": "Moyenne Tension",
  "8": "Domiciliation impayée",
  "9": "Complémentaire",
  "11": "Pénalité",
  "12": "Frais de Gestion de Coupure",
  "13": "Frais de Gestion de Coupure",
  "14": "Frais de Coupures",
  "21": "BT normale",
  "22": "BT normale",
  "32": "Devis Branchement",
  "34": "Augmentation Puissance Souscrite",
  "41": "Pénalité fraude",
  "42": "Bris compteur mono",
  "43": "Bris compteur Triphasé",
  "55": "FRAIS ETUDES",
  "60": "FACTURE TRMV",
  "61": "FRAIS ETUDES DEVIS MT",
  "62": "DEVIS BRANCHEMENT",
  "63": "FRAIS BRANCHEMENT PROVISOIRE",
  "64": "FACTURATION HORS SYSTEME",
  "65": "FRAIS DEPANNAGE",
  "66": "FRAIS PENALITE",
  "67": "VENTE MATERIEL",
  "68": "FRAIS DIVERS",
  "69": "REGULARISATION ASC MT",
  "70": "MT-THT Normale",
  "71": "MT-THT Réfection",
  "72": "MT-THT Régularisation",
  "73": "MT-THT Pénalités Fraude",
  "74": "MT HT RESILIATION",
  "75": "MT HT FRAIS DE GESTION DE COUPURES",
  "76": "MT HT frais de Gestion de Coupures",
  "77": "MT HT RATTRAPAGE",
  "78": "MT HT ASC",
  "79": "MT HT AVANT TERME",
  "91": "Réfection",
  "92": "Régularisation",
  "93": "Résiliation"
}

function Index() {
    const numClient = JSON.parse(window.localStorage.getItem('authUser')).uid
    const factures = useQuery(GET_FACTURES, {variables: {"numclient": {"_eq": numClient}}})
    const [navPills, setNavPills] = useState(1)
    const [clientFilter, setClientFilter] = useState('')
    const [factureFilter, setFactureFilter] = useState('')
    const [abonnement, setAbonnement] = useState()
    const [paymentFilter, setPaymentFilter] = useState()
    const [abonnementFilter, setAbonnementFilter] = useState()
    let facturation = {facture: 0, total: 0};
    let impayees = {facture: 0, total: 0};
    let reglements = {facture: 0, total: 0};

    console.log("render")

    if(factures.loading) return null;
    if(factures.error) return `Error! ${factures.error}`;

    function getAbonnement(filter){
      setAbonnementFilter(filter)
    }

    let factureSelection = factures.data.test_factures.filter(facture => facture.numbranchement == abonnementFilter)

    facturation.facture = factureSelection.length

    console.log(factureSelection);

    async function getFactureUrl(filepath) {
      const ref = storage.ref(filepath)
      try {
        const url = await ref.getDownloadUrl()
        return url
      } catch(e) {
        return "La facture n'a pas été trouvé dans le système"
      }
    }

    factureSelection.forEach(facture => {
      facturation.total += facture.montantfacture
      impayees.total += facture.soldefactures

      if(facture.etatfacture == "S"){
        reglements.facture += 1
        reglements.total += parseInt(facture.montantfacture)
      } 
    });

    //impayees.facture = facturation.facture - reglements.facture;
    //impayees.total = facturation.total - reglements.total;

    console.log("Facturation",facturation)
    console.log("Reglement",reglements)
    console.log("Impayéees", impayees)

    console.log("depuis facture ", abonnementFilter)

    if(factureFilter === "payé") factureSelection = factureSelection.filter(facture => facture.etatfacture == "S")
    console.log(factureSelection)

    if(factureFilter ==="impayé") factureSelection = factureSelection.filter(facture => facture.etatfacture != "S")
    console.log(factureSelection)

    {/*const [chartExample1Data, setChartExample1Data] = useState()
      
    
    if (window.Chart) {
      parseOptions(Chart, chartOptions());
    }*/}
    console.log(factureFilter)

    const toggleNavs = (e, activeNav, index, filter) => {
      console.log(factureFilter)
      e.preventDefault()
      setNavPills(index)
      setFactureFilter(filter)
      console.log(factureFilter)
    }

    return (
      <>
        <Header sendAbonnement={getAbonnement} facturation={facturation} impayees={impayees} reglements={reglements} />
        {/* Page content */}
        <Container fluid>
          <Row>
          <Col className="mb-5 mb-xl-5" xl="12">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <Row className="align-items-center text-center">
                    <div className="col">
                      <h3 style={{ fontWeight: "500", color: "#000030"}}>Facture(s)</h3>
                    </div>
                  </Row>
                  <Row className="align-items-left">
                  <Nav
                    className="nav-fill flex-column flex-sm-row"
                    id="tabs-text"
                    pills
                    role="tablist"
                  >
                    <NavItem>
                      <NavLink
                        style={{color: "#000030"}}
                        aria-selected={navPills === 1}
                        className={classnames("mb-sm-3 mb-md-0", {
                          active: navPills === 1
                        })}
                        onClick={e => toggleNavs(e, "navPills", 1, "tout")}
                        href="#"
                        role="tab"
                      >
                        Tout
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        style={{color: "#000030"}}
                        aria-selected={navPills === 2}
                        className={classnames("mb-sm-3 mb-md-0", {
                          active: navPills === 2
                        })}
                        onClick={e => toggleNavs(e, "navPills", 2, "payé")}
                        href="#payés"
                        role="tab"
                      >
                        Payés
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        style={{color: "#000030"}}
                        aria-selected={navPills === 3}
                        className={classnames("mb-sm-3 mb-md-0", {
                          active: navPills === 3
                        })}
                        onClick={e => toggleNavs(e, "navPills", 3, "impayé")}
                        href="#impayés"
                        role="tab"
                      >
                        Impayés
                      </NavLink>
                    </NavItem>
                  </Nav>
                  </Row>
                </CardHeader>
                <Table className="align-items-center table-flush pb-2" responsive>
                  <thead style={{background: "#2B4999", color: "white"}}>
                    <tr>
                      <th className="table-header-theme text-center" style={{fontSize: "12px", fontWeight: "200"}} scope="col">Période</th>
                      <th className="table-header-theme text-center" style={{fontSize: "12px", fontWeight: "200"}} scope="col">Type de Facture</th>
                      <th className="table-header-theme text-center" style={{fontSize: "12px", fontWeight: "200"}} scope="col" align="right">Montant</th>
                      <th className="table-header-theme text-center" style={{fontSize: "12px", fontWeight: "200"}} scope="col" align="right">Solde</th>
                      <th className="table-header-theme text-center" style={{fontSize: "12px", fontWeight: "200"}} scope="col">Voir</th>
                    </tr>
                  </thead>
                  <tbody style={{fontStyle:"normal",fontWeight: "normal",fontSize: "8px",lineHeight: "43px",color: "#000030"}}>
                    {factureSelection.map((d, index) => {
                        return (<tr key={index} style={{borderBottom: "1px solid #E5E5E5"}}>
                                  <td className="text-center">{/*d.periode*/}Mai-Juin 2021</td>
                                  <td className="text-center">{typeFacture[d.typefacture]}</td>
                                  <td className="text-center">{d.montantfacture} XAF</td>
                                  <td className="text-center">{d.soldefactures} XAF</td>
                                  <td className="text-center d-flex justify-content-center"><a href={"https://firebasestorage.googleapis.com/v0/b/cliente2c-72f60.appspot.com/o/factures%2F02" + numClient + "0" + d.numbranchement + d.numfacture + ".pdf?alt=media"} target="_blank" className="text-center"><EyeOpen color="#6CAAE3" /></a></td>
                                </tr>)
                    })}
                  </tbody>
                </Table>
              </Card>
            </Col>
            {/*<Col xl="4">
              <Card className="shadow">
                <CardHeader className="bg-transparent">
                  <Row className="align-items-center">
                    <div className="col">
                      <h6 className="text-uppercase text-muted ls-1 mb-1">
                        Performance
                      </h6>
                      <h2 className="mb-0">Consommation</h2>
                    </div>
                  </Row>
                </CardHeader>
                <CardBody>
                  <div className="chart">
                    <Bar
                      data={chartExample2.data}
                      options={chartExample2.options}
                    />
                  </div>
                </CardBody>
              </Card>
            </Col>*/}
          </Row>
        </Container>
      </>
    );
}

export default Index;
