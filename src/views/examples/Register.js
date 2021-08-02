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
import { useForm } from "react-hook-form";
import * as yup from "yup";
import "yup-phone";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Label,
  InputGroup,
  Row,
  Col,
  Alert
} from "reactstrap";

import { Envelope, MobileDevice, Person, Location, LockOff } from 'akar-icons';

import { useAuth } from "../../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import { yupResolver } from "@hookform/resolvers/yup";
import usePasswordToggle from "hooks/usePasswordToggle";
import useConfirmPasswordToggle from "hooks/useConfirmPasswordToggle";

import { useMutation } from '@apollo/client';

import { ADD_USER } from "queries";

const schema = yup.object().shape({
  email: yup.string("Format invalide").email("Le format de l'addresse email n'est pas valide").required("Une email addresse valide est requise"),
  ville: yup.string("Format invalide").required("La ville associée a votre numéro client est requise"),
  tel: yup.string().phone("GB", false, "Le numéro de téléphone n'est pas valide veuillez saisir un numéro de téléphone au format international").required("Le numéro de téléphone est requis"),
  numClient: yup.string("Format invalide").required("Votre numéro client est requis"),
  password: yup.string("Format invalide").min(8, "le mot de passe doit avoir au moins 8 charactère").max(32, "Mot de passe trop long").required("Mot de passe requis"),
  confirmPassword: yup.string().test('mot de passe identique', 'Le mot de passe doit etre identique', function(value){
    return this.parent.password === value
  }).required("La confirmation du mot de passe est requise")
});

export default function Register() {
    const { signup, login, currentUser, verifyEmail } = useAuth()
    const [verifyMsg, setVerifyMsg] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const history = useHistory()
    const { register, handleSubmit, formState: { errors }} = useForm({
      resolver: yupResolver(schema),
    });
    const [PasswordInputType, ToggleIcon] = usePasswordToggle();
    const [ConfirmPasswordInputType, ConfirmToggleIcon] = useConfirmPasswordToggle();

    async function submit(data) {
        try {
            setError("")
            setLoading(true)

            await signup(data.email, data.password, data.ville, data.numClient, data.tel)
            const userToVerify = await login(data.email, data.password)
            
            console.log(userToVerify)

            // Send verification link to client
            try {
              await userToVerify.user.sendEmailVerification()
              setVerifyMsg("Félicitation, veuillez consulter votre mail et confirmer votre compte pour acceder à votre espace client")
            } catch(e) {
              setError(e.message)
            }

            {/*if(currentUser) {
              await addUser({ 
                variables: {
                  id: uid.user.uid,
                  email: data.email,
                  centre: data.ville,
                  numClient: data.numClient,
                  tel: data.tel
                } 
              })
            }

            if(currentUser){
              history.push("/admin/index")
            } else {
              throw error("Veuillez réessayer de vous connecter s'il vous plait")
            }*/}
            
            
        } catch(e) {
            console.log(e.message)
            setError(e.message)
            setLoading(false)
        }

        setLoading(false)
    }

    return (
      <>
        <Col lg="10" md="8">
          <Card className="card-white">
            <CardHeader className="bg-transparent">
              <div className="text-center my-2">
                <h2 className="card-header-text-auth">S'inscrire</h2>
              </div>
            </CardHeader>
            <CardBody className="px-lg-5 py-lg-5">
              <Form onSubmit={handleSubmit(submit)} noValidate>
                <Row form>
                  <Col md={6}>
                    <FormGroup>
                      <Label className="input-label">Adresse E-mail</Label>
                      <div className="input-icon-container">
                        <Envelope color="#000030" />
                        <InputGroup className=" mx-2">
                          <Input invalid={errors.email} placeholder="Saisissez votre adresse E-mail" {...register("email")} type="email" name="email" autoComplete="new-email" required/>
                        </InputGroup>
                      </div>
                      {errors.email ? (<p className="validation-error-message">{errors.email.message}</p>) : <p className="input-tip">Ex : johndoe@gmail.com</p>}
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label className="input-label">N° Téléphone*</Label>
                      <div className="input-icon-container">
                        <MobileDevice color="#000030" />
                        <InputGroup className=" mx-2">
                          <Input invalid={errors.tel} placeholder="Saisissez votre N° de téléphone " {...register("tel")} type="text" name="tel" autoComplete="new-tel" required/>
                        </InputGroup>
                      </div>
                      {errors.tel ? <p className="validation-error-message">{errors.tel.message}</p> : <p className="input-tip">Ex :+242 06 600 00 20</p>}
                    </FormGroup>
                  </Col>
                </Row>
                <Row form>
                  <Col md={6}>
                    <FormGroup>
                      <Label className="input-label">N° Client E²C*</Label>
                      <div className="input-icon-container">
                        <Person color="#000030" />
                        <InputGroup className=" mx-2">
                          <Input invalid={errors.numClient} placeholder="Saisissez votre N° client E²C" {...register("numClient")} type="text" name="numClient" autoComplete="new-numClient" required/>
                        </InputGroup>
                      </div>
                      {errors.numClient ? <p className="validation-error-message">{errors.numClient?.message}</p> : <p className="input-tip">Ex : 0000000P</p>}
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label className="input-label">Ville*</Label>
                      <div className="input-icon-container">
                        <Location color="#000030" />
                        <InputGroup className=" mx-2">
                          <Input invalid={errors.ville} placeholder="ville" {...register("ville")} type="select" name="ville" autoComplete="new-ville" required>
                            <option value="" key="0">Choisissez votre ville</option>
                            <option value="2" key="1">BRAZZAVILLE</option>
                            <option value="1" key="2">POINTE-NOIRE</option>
                            <option value="3" key="3">DOLISIE</option>
                            <option value="4" key="4">OYO</option>
                          </Input>
                        </InputGroup>
                      </div>
                      <p className="validation-error-message">{errors.ville?.message}</p>
                    </FormGroup>
                  </Col>
                </Row>
                <Row form className="mb-3">
                  <Col md={6}>
                    <FormGroup>
                      <Label className="input-label">Mot de passe*</Label>
                      <div className="input-icon-container">
                        <LockOff color="#000030" />
                        <InputGroup className=" mx-2">
                          <Input invalid={errors.password} placeholder="Saisissez votre Mot de Passe" {...register("password")} type={PasswordInputType} name="password" autoComplete="new-password" required/>
                          <span className="password-toggle-icon">{ToggleIcon}</span>
                        </InputGroup>
                      </div>
                      {errors.password ? <p className="validation-error-message">{errors.password?.message}</p> : <p className="input-tip">Votre mot de passe doit contenir  au moins 8 caractères </p>}
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup> 
                      <Label className="input-label">Confirmation Mot de passe*</Label>
                      <div className="input-icon-container">
                        <LockOff color="#000030" />
                        <InputGroup className=" mx-2">
                          <Input invalid={errors.confirmPassword} placeholder="Confirmez votre Mot de Passe" {...register("confirmPassword")} type={ConfirmPasswordInputType} name="confirmPassword" autoComplete="confirm-password" required/>
                          <span className="password-toggle-icon">{ConfirmToggleIcon}</span>
                        </InputGroup>
                      </div>
                      {errors.confirmPassword ? <p className="validation-error-message">{errors.confirmPassword?.message}</p> : <p className="input-tip">Resaisissez vote mot de passe</p>}
                    </FormGroup>
                  </Col>
                </Row>
                {(error && <Alert className="text-center pb-2" color="danger">{error}</Alert>) || (verifyMsg && <Alert className="text-center pb-2" color="success">{verifyMsg}</Alert>)}
                <Row>
                  <Col md={4} className="text-center" style={{display: "flex", alignItems: "center", flexDirection: "column"}}>
                    <span className="redirect-msg">Vous avez déjà un compte?</span>
                    <Link
                      className="text-light"
                      to="/auth/login"
                    >
                      <small className="auth-form-link">Connectez-vous ici</small>
                    </Link>
                  </Col>
                  <Col className="text-center" md={4} style={{display: "flex",alignItems: "center",justifyContent: "center"}}>
                    <div className="text-center">
                      <Button className="theme-button" type="submit" disabled={loading} style={{width: "172px"}}>
                        Soumettre
                      </Button>
                    </div>
                  </Col>
                  <Col className="required-notice" md={4}>
                    <span>Les champs contenant un (*) sont obligatoires</span>
                  </Col>
                </Row>
                {/*<div className="text-muted font-italic">
                  <small>
                    password strength:{" "}
                    <span className="text-success font-weight-700">strong</span>
                  </small>
                </div>
                <Row className="my-4">
                  <Col xs="12">
                    <div className="custom-control custom-control-alternative custom-checkbox">
                      <input
                        className="custom-control-input"
                        id="customCheckRegister"
                        type="checkbox"
                      />
                      <label
                        className="custom-control-label"
                        htmlFor="customCheckRegister"
                      >
                        <span className="text-muted">
                          I agree with the{" "}
                          <a href="#pablo" onClick={e => e.preventDefault()}>
                            Privacy Policy
                          </a>
                        </span>
                      </label>
                    </div>
                  </Col>
                </Row>*/}
              </Form>
            </CardBody>
          </Card>
        </Col>
      </>
    );
}
