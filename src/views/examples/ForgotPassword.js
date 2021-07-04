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
import { Link } from "react-router-dom"
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object().shape({
  email: yup.string().email().required()
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
          setMessage("Vérifiez votre mail pour retrouver votre mot de passe")
          setLoading(false)
        } catch {
          setError("Failed to send reset password")
          setLoading(false)
        }
    }

      return <>
        <Col lg="5" md="7">
          <Card className="bg-secondary shadow border-0">
            <CardHeader className="bg-transparent">
              <div className="text-muted text-center mt-2 mb-3">
                <h2>Mot de passe oublié ?</h2>
              </div>
            </CardHeader>
            <CardBody className="px-lg-5 py-lg-5">
              {error && <p>{error}</p>}
              {message && <p>{message}</p>}
              <Form onSubmit={handleSubmit(submit)} noValidate>
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
                <p>{errors.email?.message}</p>
                <div className="text-center">
                  <Button className="my-4" color="primary" type="submit" disabled={loading}>
                    Validez
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

export default ForgotPassword;
