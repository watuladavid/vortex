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

import { useAuth } from "../../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import { yupResolver } from "@hookform/resolvers/yup";
import { Envelope, LockOff } from 'akar-icons';
import usePasswordToggle from "hooks/usePasswordToggle";

const schema = yup.object().shape({
  email: yup.string("Format invalide").email("Le format de l'addresse email n'est pas valide").required("Une email addresse valide est requise"),
  password: yup.string("Format invalide").min(8, "le mot de passe doit avoir au moins 8 charactère").max(32, "Mot de passe trop long").required("Mot de passe requis")
});

function Login(props) {
    const { login } = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const history = useHistory()
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
      resolver: yupResolver(schema),
    });
    const [PasswordInputType, ToggleIcon] = usePasswordToggle();

    async function submit(data) {
        
        try {
          setError("")
          setLoading(true)
          const isUserVerified = await login(data.email, data.password)

          if(isUserVerified.user.emailVerified){
            history.push("/admin/index")
          } else {
            setError("Votre addresse email n'est pas vérifié")
          }
          
        } catch(error) {
          if(error.message === "user-not-found"){
            setError("Il n'existe aucun enregistrement utilisateur correspondant à l'identifiant fourni.")
          }else{
            setError(error.message)
          }
          setLoading(false)
        }
    }

      return <>
        <Col lg="5" md="7">
          <Card className="card-white">
            <CardHeader className="bg-transparent">
              <div className="text-center m-2">
                <h2 className="card-header-text-auth">Se Connecter</h2>
              </div>
            </CardHeader>
            <CardBody className="px-lg-5 py-lg-5">
              <Form onSubmit={handleSubmit(submit)} noValidate>
              <Row form>
                <Col md={12}>
                  <FormGroup>
                    <Label className="input-label">Identifiant</Label>
                    <div className="input-icon-container">
                      <Envelope color="#000030" />
                      <InputGroup className=" mx-2">
                        <Input invalid={errors.email} placeholder="Saisissez votre adresse E-mail" {...register("email")} type="email" name="email" autoComplete="new-email" required/>
                      </InputGroup>
                    </div>
                    {errors.email ? (<p className="validation-error-message">{errors.email.message}</p>) : <p className="input-tip">Ex : johndoe@gmail.com</p>}
                  </FormGroup>
                </Col>
              </Row>
              <Row form>
                  <Col md={12}>
                    <FormGroup>
                      <Label className="input-label">Mot de passe*</Label>
                      <div className="input-icon-container">
                        <LockOff color="#000030" />
                        <InputGroup className=" mx-2">
                          <Input invalid={errors.password} placeholder="Veuillez saisir votre mot de passe" {...register("password")} type={PasswordInputType} name="password" autoComplete="new-password" required/>
                          <span className="password-toggle-icon">{ToggleIcon}</span>
                        </InputGroup>
                      </div>
                      {errors.password ? <p className="validation-error-message">{errors.password?.message}</p> : <p className="input-tip">Votre mot de passe doit contenir  au moins 8 caractères </p>}
                    </FormGroup>
                  </Col>
                </Row>  
                <Row className="pb-2">
                  <Col className="text-right">
                    <Link
                        className="text-light text-right"
                        to="/auth/forgot-password"
                    >
                      <small className="auth-form-link">Mot de passe oublié?</small>
                    </Link>
                  </Col>
                </Row>
                <Row>
                  {error && <Alert className="text-center pb-2" color="danger">{error}</Alert>}
                </Row>
                <Row style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                  <Col className="text-left" style={{display: "flex", alignItems: "center", flexDirection: "column"}}>
                    <span className="redirect-msg">Vous êtes nouveau?</span>
                    <Link
                      className="text-light"
                      to="/auth/register"
                    >
                      <small className="auth-form-link">Créer votre compte ici</small>
                    </Link>
                  </Col>
                  <Col className="text-right" style={{display: "flex",alignItems: "center",justifyContent: "center"}}>
                    <div className="text-center">
                      <Button className="theme-button" type="submit" disabled={loading} style={{width: "172px"}}>
                        Soumettre
                      </Button>
                    </div>
                  </Col>
                </Row>
                {/*<div className="custom-control custom-control-alternative custom-checkbox">
                  <input
                    className="custom-control-input"
                    id=" customCheckLogin"
                    type="checkbox"
                  />
                  <label
                    className="custom-control-label"
                    htmlFor=" customCheckLogin"
                  >
                    <span className="text-muted">Remember me</span>
                  </label>
                </div>*/}
              </Form>
            </CardBody>
          </Card>
        </Col>
      </>
}

export default Login;
