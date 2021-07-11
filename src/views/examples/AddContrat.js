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
  Col
} from "reactstrap";
// core components
import ContratHeader from "components/Headers/ContratHeader.js";

import { useAuth } from "../../contexts/AuthContext";
import { useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom"
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { CREATE_CONTRAT } from '../../queries';

const schema = yup.object().shape({
  email: yup.string().required(),
  numBranchement: yup.number().required(),
  numPolice: yup.string().required(),
});

function AddContrat () {
  const { currentUser } = useAuth();
  const [createContrat] = useMutation(CREATE_CONTRAT);
  const history = useHistory();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const submit = data => {

    console.log("running")
    createContrat({
            variables: {
                numPolice: data.numPolice, 
                numClient: data.numClient,
                numBranchement: data.numBranchement,
                user_id: currentUser.id
            }
        })

    console.log("done")
    console.log("data :" + data)
    history.push("/admin/contrats")
  }

  console.log(currentUser)
    return (
      <>
        <ContratHeader />
        {/* Page content */}
        <Container className="mt--7" fluid>
          <Row className="justify-content-center">
            <Col className="order-xl-1" xl="6">
              <Card className="bg-secondary shadow border-0">
                <Form onSubmit={handleSubmit(submit)} noValidate>
                  <CardHeader className="bg-white border-0">
                    <Row className="align-items-center">
                      <Col xs="8">
                        <h3 className="mb-0">Ajouter un contrat</h3>
                      </Col>
                    </Row>
                  </CardHeader>
                  <CardBody>
                    <div className="pl-lg-4">
                      <Row>
                        <Col>
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-numClient"
                            >
                              N° Client
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-numClient"
                              type="text"
                              placeholder="Saisissez votre numéro client"
                              required
                              {...register("numClient")}
                            />
                            <p>{errors.numClient?.message}</p>
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-numBranchement"
                            >
                              N° Branchement
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-numBranchement"
                              type="text"
                              placeholder="Saisissez votre numéro de Branchement"
                              {...register("numBranchement")}
                            />
                            <p>{errors.numBranchement?.message}</p>
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-numPolice"
                            >
                              N° Police
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-numPolice"
                              type="text"
                              {...register("numPolice")}
                              placeholder="Saisissez votre numéro de police"
                            />
                            <p>{errors.numPolice?.message}</p>
                          </FormGroup>
                        </Col>
                      </Row>
                    </div>
                    <div className="text-center">
                        <Button className="my-4" color="primary" type="submit" >
                            Enregistrer
                        </Button>
                    </div>
                </CardBody>
                </Form>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
}

export default AddContrat;
