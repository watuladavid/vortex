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
import React, { useState, useEffect } from "react";
import { storage } from "../../firebase.js";

// reactstrap components
import { DropdownToggle, DropdownMenu, DropdownItem, UncontrolledDropdown, Button, Card, CardHeader, CardBody, CardFooter, CardTitle, Container, Row, Col } from "reactstrap";
import { PersonAdd } from 'akar-icons';
import { useQuery } from '@apollo/client';
import { GET_CLIENTS } from "queries.js";
import { useAuth } from "contexts/AuthContext";

import { Progress } from "reactstrap";

const categoryClient = {
  "1": "Particuliers ordinaires",
  "2": "Entreprises non financières",
  "3": "Adm. publiques conventionnées",
  "4" : "Adm. publiques non conventionnées",
  "5":"Entreprises non financières publiques",
  "6":"Particuliers Agents SNE",
  "7":"Banques et Assurances",
  "8":"Prises en charges",
  "9":"Ambassades et Organismes internationaux"
}

const natureConsommation = {
  "1": "Compteur",
  "2": "Conso Estimée",
  "3": "Conso Estimée",
  "4": "Compteur",
  "7": "Compteur"
}

export default function Header({sendAbonnement, facturation, impayees, reglements}){
  const numClient = JSON.parse(window.localStorage.getItem('authUser')).uid;
  const { currentUser } = useAuth()
  const clients = useQuery(GET_CLIENTS, {variables: {"numclient": {"_eq": numClient}}})
  console.log(clients.data.test_clients)
  const [abonnementFilter, setAbonnementFilter] = useState(clients.data.test_clients[0].numbranchement)
  const [imgProgress,setImgProgress] = useState()
  const [loadingImg, setLoadingImg] = useState(false)

  function uploadProfilePic(e) {
    if(e.target.files[0]){
      const profilePic = e.target.files[0]
      const storageRef = storage.ref();
      const uploadTask = storageRef.child('profile_img/' + numClient).put(profilePic);

      uploadTask.on('state_changed',
        (snapshot) =>{
          setImgProgress(Math.round((snapshot.bytesTransferred/snapshot.totalBytes))*100)
          setLoadingImg(true)
        },(error) =>{
          throw error
        },() =>{
          // uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) =>{
    
          uploadTask.snapshot.ref.getDownloadURL().then((url) =>{
            currentUser.updateProfile({
              photoURL: url
            }).then(function() {
              console.log("photo mis à jour")
            }, function(error) {
              // An error happened.
              console.log(error)
            });
          })
        //document.getElementById("file").value = null
        setLoadingImg(false)
       }
     ) 
    }
  }

  console.log(facturation)

  sendAbonnement(abonnementFilter)

  function selectAbonnement(e, filter) {
    e.preventDefault()
    sendAbonnement(filter)
    setAbonnementFilter(filter)
  }

  const abonnementSelection = clients.data.test_clients.filter(abonnement => abonnement.numbranchement == abonnementFilter)
  console.log(abonnementSelection)

  console.log("depuis header ", abonnementFilter)

    return (
      <>
        <div className="pb-4 pt-4 pt-md-4">
          <Container fluid>
            <div className="header-body">
              {/*<Row className="pb-3">
                <Col>
                  <UncontrolledDropdown>
                    <DropdownToggle caret color="secondary">
                      Abonnement
                    </DropdownToggle>
                    <DropdownMenu>
                      {
                        clients.data.test_clients.map(client => 
                          {
                            return (
                              <DropdownItem onClick={e => {selectAbonnement(e, client.numbranchement)}}>
                                <DropdownItem divider />
                                {String(client.numbranchement)}
                              </DropdownItem>
                            )
                          }
                        )
                      }
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </Col>
              </Row>*/}
              {/* Card stats */}
              <Row>
                <Col lg="6" xl="6">
                  <Card className="card-white mb-4 mb-xl-0">
                    <CardHeader className="bg-transparent py-0">
                      <div className="text-center my-2">
                        <h2 className="card-header-text-auth">Informations Abonnement</h2>
                      </div>
                    </CardHeader>
                    <CardBody style={{background: "rgba(203, 203, 203, 0.53)"}} className="py-0">
                      <div className="info-abonnement-title">
                        N° Branchement :
                        <span className="text-sm info-abonnement-detail">
                          {abonnementSelection[0].numbranchement}
                        </span>
                      </div>
                      <div className="info-abonnement-title">
                        Catégorie :
                        <span className="text-sm info-abonnement-detail">
                          {categoryClient[abonnementSelection[0].categorie]}
                        </span>
                      </div>
                      <div className="info-abonnement-title">
                        Adresse :
                        <span className="text-sm info-abonnement-detail">
                          {abonnementSelection[0].adressebranchement}
                        </span>
                      </div>
                      <div className="info-abonnement-title">
                        Ville :
                        <span className="text-sm info-abonnement-detail">
                          Brazzaville
                        </span>
                      </div>
                      <div className="info-abonnement-title">
                        Ancien Index :
                        <span className="text-sm info-abonnement-detail">
                          {abonnementSelection[0].ancienindex}
                        </span>
                      </div>
                      <div className="info-abonnement-title">
                        Nouvel Index :
                        <span className="text-sm info-abonnement-detail">
                        {abonnementSelection[0].nouvelindex}
                        </span>
                      </div>
                      <div className="info-abonnement-title">
                        Nature Consommation :
                        <span className="text-sm info-abonnement-detail">
                        {natureConsommation[abonnementSelection[0].natureconso]}
                        </span>
                      </div>
                      <div className="info-abonnement-title">
                        Consommation :
                        <span className="text-sm info-abonnement-detail">
                        {abonnementSelection[0].consommation}
                        </span>
                      </div>
                    </CardBody>
                    <CardFooter style={{display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", borderBottomLeftRadius: "42px", borderBottomRightRadius: "42px", paddingTop: "0"}}>
                      <Col className="text-left" style={{display: "flex", flexDirection: "column", paddingTop: "10px"}}>
                        <span style={{fontWeight: "bold",fontSize: "24px",lineHeight: "43px",color: "#000030"}}>Montant de la dette</span>
                        <span style={{fontWeight: "bold",fontSize: "32px",lineHeight: "43px",color: "#DE0E0E"}}>{impayees.total} XAF</span>
                      </Col>
                      <Col className="text-right" style={{display: "flex",alignItems: "center",justifyContent: "center", paddingTop: "10px"}}>
                        <div className="text-center">
                          <a href={`https://wortispay.com/e2c?client=${abonnementSelection[0].nomclient}&id=${abonnementSelection[0].numbranchement}&amount=${impayees.total}`} target="_blank">
                            <Button className="theme-button" style={{width: "217px", height: "66px", fontSize: "24px", fontWeight: "500"}}>
                              Paiement
                            </Button>
                          </a>
                        </div>
                      </Col>
                    </CardFooter>
                  </Card>
                </Col>
                <Col lg="6" xl="6">
                  <Card className="card-client mb-4 mb-xl-0">
                    <CardBody>
                      <Row style={{display: "flex", flexWrap: "wrap"}}>
                        <Col style={{display: "flex", flexDirection: "column", textAlign: "center", alignItems: "center"}}>
                          {(currentUser.photoURL && !loadingImg) ? <img src={currentUser.photoURL} width="120" height="120" style={{borderRadius: "60px"}} className="m-auto" /> : <PersonAdd width="120" height="120" color="#000030" strokeWidth="1" className="m-auto"/>}
                          <div style={{textAlign: "center", color: "#000030", textDecoration: "underline", cursor: "pointer"}}>
                            <input type="file" id="prof_img_uploader" onChange={uploadProfilePic} hidden/>
                            {!loadingImg && (<label for="prof_img_uploader" style={{textDecoration: "underline", cursor: "pointer"}}>Ajouter une photo</label>)}
                            {loadingImg && (<div className="progress-wrapper">
                              <div className="progress-info">
                                <div className="progress-label">
                                  <span style={{fontWeight: "300", color: "#000030"}}>Mis à jour</span>
                                </div>
                                <div className="progress-percentage">
                                  <span style={{fontWeight: "300"}}>{imgProgress}%</span>
                                </div>
                              </div>
                              <Progress max="100" value={imgProgress} color="success" />
                            </div>)}
                          </div>
                        </Col>
                        <Col style={{display: "flex", flexDirection: "column"}}>
                          <div style={{fontStyle: "normal",fontWeight: "500",fontSize: "32px",color: "#FFFFFF"}}>
                            {abonnementSelection[0].nomclient}
                          </div>
                          <div style={{fontStyle: "normal",fontWeight: "500",fontSize: "24px",color: "#000030"}}>
                            Client N° {abonnementSelection[0].numclient}
                          </div>
                          <div style={{fontStyle: "normal",fontWeight: "400",fontSize: "18px",color: "#000030"}}>
                            Mes Branchements
                          </div>
                          <div style={{marginBottom: "20px"}}>
                            <UncontrolledDropdown>
                              <DropdownToggle caret color="secondary" style={{borderRadius: "50px", marginRight: "0", color: "#000030", fontWeight: '400px'}}>
                                {abonnementSelection[0].adressebranchement}
                              </DropdownToggle>
                              <DropdownMenu right>
                                {
                                  clients.data.test_clients.map(client => 
                                    {
                                      return (
                                        <DropdownItem onClick={e => {selectAbonnement(e, client.numbranchement)}}>
                                          <DropdownItem />
                                          {client.adressebranchement}
                                        </DropdownItem>
                                      )
                                    }
                                  )
                                }
                              </DropdownMenu>
                            </UncontrolledDropdown>
                          </div>
                        </Col>
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

