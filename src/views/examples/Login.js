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
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
  Alert
} from "reactstrap";

import { useAuth } from "../../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(8).max(32).required()
});

function Login(props) {
    const { login } = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const history = useHistory()
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
      resolver: yupResolver(schema),
    });

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
          <Card className="bg-secondary shadow border-0">
            <CardHeader className="bg-transparent">
              <div className="text-muted text-center mt-2 mb-3">
                <h2>Se Connecter</h2>
              </div>
            </CardHeader>
            <CardBody className="px-lg-5 py-lg-5">
              <Form onSubmit={handleSubmit(submit)} noValidate>
              {error && <Alert className="text-center pb-2" color="danger">{error}</Alert>}
                <FormGroup className="mb-3">
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-email-83" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input {...register("email")} placeholder="Email" type="email" autoComplete="new-email"/>
                  </InputGroup>
                </FormGroup>
                <p className="text-danger">{errors.email?.message}</p>
                <FormGroup>
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-lock-circle-open" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input {...register("password")} placeholder="Mot de passe" type="password" autoComplete="new-password"/>
                  </InputGroup>
                </FormGroup>
                <p className="text-danger">{errors.password?.message}</p>
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
                <div className="text-center">
                  <Button className="my-4" color="primary" type="submit" >
                    Connectez-vous
                  </Button>
                </div>
              </Form>
            </CardBody>
          </Card>
          <Row className="mt-3">
            <Col xs="6">
              <Link
                className="text-light"
                to="/auth/forgot-password"
              >
                <small>Mot de passe oublié ?</small>
              </Link>
            </Col>
            <Col className="text-right" xs="6">
              <Link
                className="text-light"
                to="/auth/register"
              >
                <small>Créer votre compte</small>
              </Link>
            </Col>
          </Row>
        </Col>
      </>
}

export default Login;
