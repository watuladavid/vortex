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

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
  InputGroup,
  Label,
  Alert
} from "reactstrap";
// core components
import UserHeader from "components/Headers/UserHeader.js";

import { useAuth } from "../../contexts/AuthContext";
import { useHistory } from "react-router-dom"
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Envelope, LockOff } from 'akar-icons';
import usePasswordToggle from "hooks/usePasswordToggle";
import useConfirmPasswordToggle from "hooks/useConfirmPasswordToggle";

const schema = yup.object().shape({
  email: yup.string("Format invalide").email("Le format de l'addresse email n'est pas valide"),
  password: yup.string("Format invalide").min(8, "le mot de passe doit avoir au moins 8 charactère").max(32, "Mot de passe trop long"),
  confirmPassword: yup.string().test('mot de passe identique', 'Le mot de passe doit etre identique', function(value){
    return this.parent.password === value
  })
});

function Profile () {
  const { currentUser, updateEmail, updatePassword , verifyEmail } = useAuth();
  const history = useHistory();
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });
  const [PasswordInputType, ToggleIcon] = usePasswordToggle();
  const [ConfirmPasswordInputType, ConfirmToggleIcon] = useConfirmPasswordToggle();

  async function submit(data) {      
    const promises = []

    if (data.email !== currentUser.email) {
      promises.push(updateEmail(data.email))
    }
    if (data.password) {
      promises.push(updatePassword(data.password))
    }

    Promise.all(promises)
      .then(() => {
        setMessage("Modifié avec succès")
      })
      .catch(error => {
        setError("La mise à jour a échoué")
      })
      //.finally(() => {
      //  setLoading(false)
      //})
  }


    return (
      <>
        {/*<UserHeader />*/}
        {/* Page content */}
        <Container fluid>
          <Row className="justify-content-center">
            {/*<Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
              <Card className="card-profile shadow">
                <Row className="justify-content-center">
                  <Col className="order-lg-2" lg="3">
                    <div className="card-profile-image">
                      <a href="#pablo" onClick={e => e.preventDefault()}>
                        <img
                          alt="..."
                          className="rounded-circle"
                          src={require("assets/img/theme/team-4-800x800.jpg")}
                        />
                      </a>
                    </div>
                  </Col>
                </Row>
                <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                  <div className="d-flex justify-content-between">
                    <Button
                      className="mr-4"
                      color="info"
                      href="#pablo"
                      onClick={e => e.preventDefault()}
                      size="sm"
                    >
                      Connect
                    </Button>
                    <Button
                      className="float-right"
                      color="default"
                      href="#pablo"
                      onClick={e => e.preventDefault()}
                      size="sm"
                    >
                      Message
                    </Button>
                  </div>
                </CardHeader>
                <CardBody className="pt-0 pt-md-4">
                  <Row>
                    <div className="col">
                      <div className="card-profile-stats d-flex justify-content-center mt-md-5">
                        <div>
                          <span className="heading">22</span>
                          <span className="description">Friends</span>
                        </div>
                        <div>
                          <span className="heading">10</span>
                          <span className="description">Photos</span>
                        </div>
                        <div>
                          <span className="heading">89</span>
                          <span className="description">Comments</span>
                        </div>
                      </div>
                    </div>
                  </Row>
                  <div className="text-center">
                    <h3>
                      Jessica Jones
                      <span className="font-weight-light">, 27</span>
                    </h3>
                    <div className="h5 font-weight-300">
                      <i className="ni location_pin mr-2" />
                      Bucharest, Romania
                    </div>
                    <div className="h5 mt-4">
                      <i className="ni business_briefcase-24 mr-2" />
                      Solution Manager - Creative Tim Officer
                    </div>
                    <div>
                      <i className="ni education_hat mr-2" />
                      University of Computer Science
                    </div>
                    <hr className="my-4" />
                    <p>
                      Ryan — the name taken by Melbourne-raised, Brooklyn-based
                      Nick Murphy — writes, performs and records all of his own
                      music.
                    </p>
                    <a href="#pablo" onClick={e => e.preventDefault()}>
                      Show more
                    </a>
                  </div>
                </CardBody>
              </Card>
            </Col>*/}
            <Col className="mt-5 mb-5 mb-xl-5 order-xl-1" xl="6">
              <Card className="card-white">
                <Form onSubmit={handleSubmit(submit)} noValidate>
                  <CardHeader className="bg-transparent border-0">
                    <Row className="align-items-center">
                      <Col xs="8">
                        <h3 className="mb-0" style={{fontWeight: "300", color: "#000030"}}>Mon Compte</h3>
                      </Col>
                      <Col className="text-right" xs="4">
                        <Button
                          className="theme-button"
                          style={{fontWeight: 300}}
                          type="submit"
                          size="sm"
                        >
                          Mettre à jour
                        </Button>
                      </Col>
                    </Row>
                    {(error && <Alert className="text-center mt-2 pb-2" color="danger">{error}</Alert>) || (message && <Alert className="text-center mt-2 pb-2" color="success">{message}</Alert>)}
                  </CardHeader>
                  <CardBody>
                  
                    <h6 className="heading-small mb-4" style={{fontWeight: "300", color: "#000030"}}>
                      Information de l'utilisateur
                    </h6>
                    <div className="pl-lg-4">
                      <Row>
                        <Col>
                          <FormGroup>
                            <Label className="input-label">Adresse E-mail</Label>
                            <div className="input-icon-container">
                              <Envelope color="#000030" />
                              <InputGroup className=" mx-2">
                                <Input invalid={errors.email} defaultValue={currentUser.email} placeholder="Saisissez votre adresse E-mail" {...register("email")} type="email" name="email" autoComplete="new-email"/>
                              </InputGroup>
                            </div>
                            {errors.email ? (<p className="validation-error-message">{errors.email.message}</p>) : <p className="input-tip">Ex : johndoe@gmail.com</p>}
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <FormGroup>
                          <Label className="input-label">Nouveau mot de passe*</Label>
                          <div className="input-icon-container">
                            <LockOff color="#000030" />
                            <InputGroup className=" mx-2">
                              <Input invalid={errors.password} placeholder="Laissez vide pour garder votre mot de passe actuelle" {...register("password")} type={PasswordInputType} name="password" autoComplete="new-password" />
                              <span className="password-toggle-icon">{ToggleIcon}</span>
                            </InputGroup>
                          </div>
                          {errors.password ? <p className="validation-error-message">{errors.password?.message}</p> : <p className="input-tip">Votre mot de passe doit contenir  au moins 8 caractères </p>}
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <FormGroup>
                            <Label className="input-label">Confirmez Nouveau Mot de passe</Label>
                            <div className="input-icon-container">
                              <LockOff color="#000030" />
                              <InputGroup className=" mx-2">
                                <Input invalid={errors.confirmPassword} placeholder="Laissez vide pour garder votre mot de passe actuelle" {...register("confirmPassword")} type={ConfirmPasswordInputType} name="confirmPassword" autoComplete="confirm-password"/>
                                <span className="password-toggle-icon">{ConfirmToggleIcon}</span>
                              </InputGroup>
                            </div>
                            {errors.confirmPassword ? <p className="validation-error-message">{errors.confirmPassword?.message}</p> : <p className="input-tip">Resaisissez vote mot de passe</p>}
                          </FormGroup>
                        </Col>
                      </Row>
                    </div>
                    {/*<hr className="my-4" />
                     Address 
                    <h6 className="heading-small text-muted mb-4">
                      Contact information
                    </h6>
                    <div className="pl-lg-4">
                      <Row>
                        <Col md="12">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-address"
                            >
                              Address
                            </label>
                            <Input
                              className="form-control-alternative"
                              defaultValue="Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09"
                              id="input-address"
                              placeholder="Home Address"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="4">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-city"
                            >
                              City
                            </label>
                            <Input
                              className="form-control-alternative"
                              defaultValue="New York"
                              id="input-city"
                              placeholder="City"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="4">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-country"
                            >
                              Country
                            </label>
                            <Input
                              className="form-control-alternative"
                              defaultValue="United States"
                              id="input-country"
                              placeholder="Country"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="4">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-country"
                            >
                              Postal code
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-postal-code"
                              placeholder="Postal code"
                              type="number"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </div>
                    <hr className="my-4" />*/}
                    {/* Description 
                    <h6 className="heading-small text-muted mb-4">About me</h6>
                    <div className="pl-lg-4">
                      <FormGroup>
                        <label>About Me</label>
                        <Input
                          className="form-control-alternative"
                          placeholder="A few words about you ..."
                          rows="4"
                          defaultValue="A beautiful Dashboard for Bootstrap 4. It is Free and
                          Open Source."
                          type="textarea"
                        />
                      </FormGroup>
                    </div>*/}
                  
                </CardBody>
                </Form>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
}

export default Profile;
