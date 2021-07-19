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
  })
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
        <Col lg="6" md="8">
          <Card className="bg-secondary shadow border-0">
            <CardHeader className="bg-transparent">
              <div className="text-muted text-center mt-2 mb-4">
                <h2>S'inscrire</h2>
              </div>
            </CardHeader>
            <CardBody className="px-lg-5 py-lg-5">
              {(error && <Alert className="text-center pb-2" color="danger">{error}</Alert>) || (verifyMsg && <Alert className="text-center pb-2" color="success">{verifyMsg}</Alert>)}
              <Form onSubmit={handleSubmit(submit)} noValidate>
                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-email-83" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Veuillez saisir une addresse email que vous utilisez" {...register("email")} type="email" name="email" autoComplete="new-email" required/>
                  </InputGroup>
                </FormGroup>
                <p className="text-danger">{errors.email?.message}</p>
                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-mobile-button" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Veuillez saisir votre numéro de téléphone au format international" {...register("tel")} type="text" name="tel" autoComplete="new-tel" required/>
                  </InputGroup>
                </FormGroup>
                <p className="text-danger">{errors.tel?.message}</p>
                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-badge" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Veuillez saisir votre numéro client" {...register("numClient")} type="text" name="numClient" autoComplete="new-numClient" required/>
                  </InputGroup>
                </FormGroup>
                <p className="text-danger">{errors.numClient?.message}</p>
                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-pin-3" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="ville" {...register("ville")} type="select" name="ville" autoComplete="new-ville" required>
                      <option value="" key="0">Veuillez sélectionner la ville associée à votre numéro client</option>
                      <option value="2" key="1">BRAZZAVILLE</option>
                      <option value="1" key="2">POINTE-NOIRE</option>
                      <option value="3" key="3">DOLISIE</option>
                      <option value="4" key="4">OYO</option>
                    </Input>
                  </InputGroup>
                </FormGroup>
                <p className="text-danger">{errors.ville?.message}</p>
                <FormGroup>
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-lock-circle-open" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Saisissez un mot de passe pour l'espace client" {...register("password")} type="password" name="password" autoComplete="new-password" required/>
                  </InputGroup>
                </FormGroup>
                <p className="text-danger">{errors.password?.message}</p>
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
                <p className="text-danger">{errors.confirmPassword?.message}</p>
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
