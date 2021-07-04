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
  Col
} from "reactstrap";

import { useAuth } from "../../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(8).max(32).required(),
  confirmPassword: yup.string().min(8).max(32).required()
});

export default function Register() {
    const { signup, verifyEmail } = useAuth()
    const [error, setError] = useState("")
    const [message, setMessage] = useState("")
    const [loading, setLoading] = useState(false)
    const history = useHistory()
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
      resolver: yupResolver(schema),
    });

    async function submit(data) {

        if (data.password !== data.confirmPassword) {
            return setError("Passwords do not match")
        }

        try {
            setError("")
            setLoading(true)
            await signup(data.email, data.password)
            await verifyEmail()
            setMessage("Un mail avec un lien vous a été envoyé pour verifier votre compte")
        } catch(error) {
            console.log(error)
            setError("Failed to create an account")
            setLoading(false)
        }

        
    }

    return (
      <>
        <Col lg="6" md="8">
          <Card className="bg-secondary shadow border-0">
            <CardHeader className="bg-transparent">
              <div className="text-muted text-center mt-2 mb-4">
                <h2>S'inscrire</h2>
              </div>
            </CardHeader>
            <CardBody className="px-lg-5 py-lg-5">
                {error && <div>{error}</div>}
                {message && <div>{message}</div>}
              <Form onSubmit={handleSubmit(submit)} noValidate>
                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-email-83" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Email" {...register("email")} type="email" name="email" autoComplete="new-email" required/>
                  </InputGroup>
                </FormGroup>
                <p>{errors.email?.message}</p>
                <FormGroup>
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-lock-circle-open" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Mot de passe" {...register("password")} type="password" name="password" autoComplete="new-password" required/>
                  </InputGroup>
                </FormGroup>
                <p>{errors.password?.message}</p>
                <FormGroup>
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-lock-circle-open" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Confirmez mot de passe" {...register("confirmPassword")} type="password" name="confirmPassword" autoComplete="confirm-password" required/>
                  </InputGroup>
                </FormGroup>
                <p>{errors.confirmPassword?.message}</p>
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
                <div className="text-center">
                  <Button className="mt-4" color="primary" type="submit" disabled={loading}>
                    S'enregistrer
                  </Button>
                </div>
              </Form>
            </CardBody>
          </Card>
          <Row className="mt-3">
            <Col xs="6">
              <Link
                className="text-light"
                to="/auth/login"
              >
                <small>Se connecter</small>
              </Link>
            </Col>
          </Row>
        </Col>
      </>
    );
}
