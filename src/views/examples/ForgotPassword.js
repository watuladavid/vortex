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
import { Link } from "react-router-dom"
import { yupResolver } from "@hookform/resolvers/yup";
import { Envelope } from 'akar-icons';

const schema = yup.object().shape({
  email: yup.string("Format invalide").email("Le format de l'addresse email n'est pas valide").required("Une email addresse valide est requise"),
});

function ForgotPassword(props) {
    const { resetPassword } = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState("")
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
      resolver: yupResolver(schema),
    });

    async function submit(data) {
        
        try {
          setMessage("")
          setError("")
          setLoading(true)
          await resetPassword(data.email)
          setMessage("Pour retrouver votre mot de passe un mail a été envoyé à " + data.email)
          setLoading(false)
        } catch {
          setError("Veuillez réessayer s'il vous plait")
          setLoading(false)
        }
    }

      return <>
        <Col lg="5" md="7">
          <Card className="card-white">
            <CardHeader className="bg-transparent">
              <div className="text-muted text-center mt-2 mb-3">
                <h2 className="card-header-text-auth">Mot de passe oublié ?</h2>
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
                <Row>
                {(error && <Alert className="text-center pb-2" color="danger">{error}</Alert>) || (message && <Alert className="text-center pb-2" color="success">{message}</Alert>)}
                </Row>
                <Row style={{ display: "flex", flexDirection: "row", justifyContent: "center"}}>
                      <Button className="theme-button" type="submit" disabled={loading} style={{width: "172px"}}>
                        Soumettre
                      </Button>
                </Row>
                <Row className="mt-3">
                  <Col xs="6">
                    <Link
                      className="text-light"
                      to="/auth/login"
                    >
                      <small className="auth-form-link">Se connecter</small>
                    </Link>
                  </Col>
                  <Col className="text-right" xs="6">
                    <Link
                      className="text-light"
                      to="/auth/register"
                    >
                      <small className="auth-form-link">Créer votre compte</small>
                    </Link>
                  </Col>
                </Row>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </>
}

export default ForgotPassword;
